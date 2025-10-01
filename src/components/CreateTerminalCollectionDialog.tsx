import { useState, useEffect } from 'preact/hooks';
import { Dialog } from './Dialog';
import { Accordion } from './Accordion';
import { useScriptStore, useTerminalCollectionStore, useConfigStore } from '../store/combinedStore';
import type { TerminalCollectionWithScripts, Script } from '../types/session';
import type { DataProvider } from '../providers/DataProvider';
import './CreateTerminalCollectionDialog.css';

interface CreateTerminalCollectionData {
  name: string;
  rootPath: string;
  lifecycle: string[];
  scriptReferences: { id: string; rootPath: string }[];
  closeTerminalAfterExecution: boolean;
  executionMode: 'ide' | 'same-terminal' | 'multi-terminal';
}

interface CreateTerminalCollectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rootPath?: string;
  editTerminalCollection?: TerminalCollectionWithScripts | null;
  provider: DataProvider;
}

export function CreateTerminalCollectionDialog({
  isOpen,
  onClose,
  rootPath,
  editTerminalCollection,
  provider
}: CreateTerminalCollectionDialogProps) {
  const { scripts } = useScriptStore();
  const { setCurrentTerminalCollection, setTempTerminalCollectionData } = useTerminalCollectionStore();
  const { osInfo } = useConfigStore();

  console.log('CreateTerminalCollectionDialog: Current osInfo:', osInfo);

  // Get available execution modes based on OS
  const getAvailableExecutionModes = () => {
    if (!osInfo) {
      return [];
    }
    
    const availableModes = [];
    
    // Always show IDE option
    availableModes.push({
      value: 'ide',
      label: 'IDE',
      description: 'Execute scripts in the integrated terminal within the IDE'
    });
    
    // Show same-terminal based on OS
    if (osInfo.isMacOS) {
      // macOS always supports terminal tabs
      availableModes.push({
        value: 'same-terminal',
        label: 'Same Terminal',
        description: 'Execute scripts in an external Terminal app with tabs for each script'
      });
    } else if (osInfo.isLinux || osInfo.isWindows) {
      // Linux/Windows only if terminal tabs are supported
      if (osInfo.supportsTerminalTabs) {
        availableModes.push({
          value: 'same-terminal',
          label: 'Same Terminal',
          description: 'Execute scripts in an external Terminal app with tabs for each script'
        });
      }
    }
    
    // Always show multi-terminal
    availableModes.push({
      value: 'multi-terminal',
      label: 'Multi Terminal',
      description: 'Execute each script in a separate Terminal app instance'
    });
    
    return availableModes;
  };

  const availableExecutionModes = getAvailableExecutionModes();
  
  const [formData, setFormData] = useState<CreateTerminalCollectionData>({
    name: '',
    rootPath: rootPath || '',
    lifecycle: ['none'],
    scriptReferences: [],
    closeTerminalAfterExecution: false,
    executionMode: 'ide'
  });
  const [error, setError] = useState<string | null>(null);

  // Pre-fill form data if editing
  useEffect(() => {
    if (editTerminalCollection) {
      setFormData({
        name: editTerminalCollection.name,
        rootPath: editTerminalCollection.rootPath,
        lifecycle: editTerminalCollection.lifecycle,
        scriptReferences: editTerminalCollection.scriptReferences.map(script => ({
          id: script.id,
          rootPath: script.rootPath
        })),
        closeTerminalAfterExecution: editTerminalCollection.closeTerminalAfterExecution || false,
        executionMode: editTerminalCollection.executionMode || 'ide'
      });
    } else {
      // Reset form for creation
      setFormData({
        name: '',
        rootPath: rootPath || '',
        lifecycle: ['none'],
        scriptReferences: [],
        closeTerminalAfterExecution: false,
        executionMode: 'ide'
      });
    }
  }, [editTerminalCollection, rootPath]);

  const handleInputChange = (field: keyof CreateTerminalCollectionData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null); // Clear error when user makes changes
  };

  const handleScriptToggle = (script: Script) => {
    const scriptRef = { id: script.id, rootPath: script.rootPath };
    const isSelected = formData.scriptReferences.some(ref => ref.id === script.id);
    
    if (isSelected) {
      setFormData(prev => ({
        ...prev,
        scriptReferences: prev.scriptReferences.filter(ref => ref.id !== script.id)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        scriptReferences: [...prev.scriptReferences, scriptRef]
      }));
    }
    setError(null); // Clear error when user makes changes
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    
    if (!formData.name.trim()) {
      setError('Please enter a name for the terminal collection.');
      return;
    }

    // Check if at least one script is selected
    if (formData.scriptReferences.length === 0) {
      setError('Please select at least one script for the terminal collection.');
      return;
    }

    // Send terminal collection creation or update message
    if (editTerminalCollection) {
      // Update the current terminal collection with the new form data for the response handler
      const updatedTerminalCollection = {
        ...editTerminalCollection,
        name: formData.name,
        rootPath: formData.rootPath,
        lifecycle: formData.lifecycle as ('open' | 'resume' | 'none')[],
        scriptReferences: formData.scriptReferences,
        closeTerminalAfterExecution: formData.closeTerminalAfterExecution,
        executionMode: formData.executionMode
      };
      console.log('CreateTerminalCollectionDialog: Setting current terminal collection to:', updatedTerminalCollection);
      setCurrentTerminalCollection(updatedTerminalCollection);
      
      provider.sendMessage('codestate.terminal-collection.update', { 
        id: editTerminalCollection.id,
        terminalCollectionData: formData 
      });
    } else {
      // Store temp terminal collection data for immediate UI update
      const tempTerminalCollection = {
        id: '', // Will be filled when response comes back
        name: formData.name,
        rootPath: formData.rootPath,
        lifecycle: formData.lifecycle as ('open' | 'resume' | 'none')[],
        scriptReferences: formData.scriptReferences,
        closeTerminalAfterExecution: formData.closeTerminalAfterExecution,
        executionMode: formData.executionMode,
        scripts: [] // Will be populated from scriptReferences
      };
      
      setTempTerminalCollectionData(tempTerminalCollection);
      
      provider.sendMessage('codestate.terminal-collection.create', { terminalCollectionData: formData });
    }
  };

  // Group scripts by root path
  const scriptGroups = scripts.reduce((groups, script) => {
    const rootPath = script.rootPath;
    if (!groups[rootPath]) {
      groups[rootPath] = [];
    }
    groups[rootPath].push(script);
    return groups;
  }, {} as Record<string, Script[]>);

  const groupEntries = Object.entries(scriptGroups);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={editTerminalCollection ? 'Edit Terminal Collection' : 'Create Terminal Collection'}
    >
      <form onSubmit={handleSubmit} className="create-terminal-collection-form">
        <div className="form-content">
          {error && (
            <div className="error-message" style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffe6e6', border: '1px solid #ff9999', borderRadius: '4px' }}>
              {error}
            </div>
          )}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onInput={(e) => handleInputChange('name', (e.target as HTMLInputElement).value)}
            placeholder="Enter terminal collection name"
            required
            className="terminal-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rootPath">Root Path</label>
          <input
            id="rootPath"
            type="text"
            value={formData.rootPath}
            onInput={(e) => handleInputChange('rootPath', (e.target as HTMLInputElement).value)}
            placeholder="Enter root path"
            required
            className="terminal-input"
          />
        </div>

        <div className="form-group">
          <label>Lifecycle Events</label>
          <div className="lifecycle-options">
            {[
              { value: 'open', label: 'Open', description: 'Automatically executes when VSCode opens a workspace with the matching project root' },
              { value: 'none', label: 'None', description: 'Manual execution only - terminal collection will not run automatically and must be explicitly added to a session' }
            ].map(lifecycle => (
              <div key={lifecycle.value} className="lifecycle-option">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.lifecycle.includes(lifecycle.value)}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        handleInputChange('lifecycle', [...formData.lifecycle, lifecycle.value]);
                      } else {
                        handleInputChange('lifecycle', formData.lifecycle.filter(l => l !== lifecycle.value));
                      }
                    }}
                    className="terminal-checkbox"
                  />
                  <span>{lifecycle.label}</span>
                </label>
                <div className="lifecycle-description">
                  {lifecycle.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Execution Mode</label>
          <div className="execution-mode-options">
            {!osInfo ? (
              <p>Loading OS information...</p>
            ) : (
              availableExecutionModes.map(mode => (
                <div key={mode.value} className="execution-mode-option">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="executionMode"
                      value={mode.value}
                      checked={formData.executionMode === mode.value}
                      onChange={(e) => handleInputChange('executionMode', (e.target as HTMLInputElement).value)}
                    />
                    {mode.label}
                  </label>
                  <div className="execution-mode-description">
                    {mode.description}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Script References</label>
          <div className="script-selection">
            {groupEntries.length === 0 ? (
              <p className="no-scripts">No scripts available</p>
            ) : (
              <Accordion
                items={groupEntries.map(([rootPath, groupScripts]) => {
                  const projectName = rootPath.split('/').pop() || rootPath;
                  
                  return {
                    id: `script-group-${rootPath}`,
                    defaultOpen: rootPath === formData.rootPath, // Open if matches current root path
                    title: (
                      <div className="accordion-title-content">
                        <span className="project-name">{projectName}</span>
                        <span className="script-count">({groupScripts.length} script{groupScripts.length !== 1 ? 's' : ''})</span>
                        <span className="accordion-title-path">{rootPath}</span>
                      </div>
                    ),
                    content: (
                      <div className="script-group-content">
                        {groupScripts.map(script => (
                          <label key={script.id} className="checkbox-label script-item">
                            <input
                              type="checkbox"
                              checked={formData.scriptReferences.some(ref => ref.id === script.id)}
                              onChange={() => handleScriptToggle(script)}
                              className="terminal-checkbox"
                            />
                            <span>{script.name}</span>
                          </label>
                        ))}
                      </div>
                    )
                  };
                })}
              />
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.closeTerminalAfterExecution}
              onChange={(e) => handleInputChange('closeTerminalAfterExecution', e.currentTarget.checked)}
              className="terminal-checkbox"
            />
            <span>Close terminal after execution</span>
          </label>
        </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {editTerminalCollection ? 'Update Terminal Collection' : 'Create Terminal Collection'}
          </button>
        </div>
      </form>
    </Dialog>
  );
}