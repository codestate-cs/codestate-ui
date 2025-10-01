import { create } from 'zustand';

export interface OSInfo {
  platform: string;
  isLinux: boolean;
  isMacOS: boolean;
  isWindows: boolean;
  supportsTerminalTabs: boolean;
}

interface ConfigStore {
  // Current project state
  currentProjectRoot: string | null;
  
  // OS Info state
  osInfo: OSInfo | null;
  osInfoLoading: boolean;
  osInfoError: string | null;
  osInfoLoaded: boolean;
  
  // UI State
  configDialog: {
    isOpen: boolean;
    configData: any | null;
    configDataError: string | null;
  };
  
  // Actions
  setCurrentProjectRoot: (rootPath: string | null) => void;
  
  // OS Info actions
  setOSInfo: (osInfo: OSInfo) => void;
  setOSInfoLoading: (loading: boolean) => void;
  setOSInfoError: (error: string | null) => void;
  setOSInfoLoaded: (loaded: boolean) => void;
  resetOSInfo: () => void;
  
  // Config dialog actions
  setConfigDialog: (state: Partial<ConfigStore['configDialog']>) => void;
  openConfigDialog: () => void;
  closeConfigDialog: () => void;
  setConfigData: (data: any | null) => void;
  setConfigDataError: (error: string | null) => void;
}

export const useConfigStore = create<ConfigStore>((set) => ({
  // Initial state
  currentProjectRoot: null,
  
  // OS Info state
  osInfo: null,
  osInfoLoading: false,
  osInfoError: null,
  osInfoLoaded: false,
  
  // UI State
  configDialog: {
    isOpen: false,
    configData: null,
    configDataError: null,
  },
  
  // Actions
  setCurrentProjectRoot: (rootPath) => {
    console.log('ConfigStore: setCurrentProjectRoot called with:', rootPath);
    set({ currentProjectRoot: rootPath });
  },
  
  // OS Info actions
  setOSInfo: (osInfo) => {
    console.log('ConfigStore: Setting OS info:', osInfo);
    set({ osInfo, osInfoLoaded: true });
  },
  setOSInfoLoading: (loading) => {
    console.log('ConfigStore: Setting OS info loading:', loading);
    set({ osInfoLoading: loading });
  },
  setOSInfoError: (error) => {
    console.log('ConfigStore: Setting OS info error:', error);
    set({ osInfoError: error });
  },
  setOSInfoLoaded: (loaded) => {
    console.log('ConfigStore: Setting OS info loaded:', loaded);
    set({ osInfoLoaded: loaded });
  },
  resetOSInfo: () => set({ 
    osInfo: null, 
    osInfoLoading: false, 
    osInfoError: null, 
    osInfoLoaded: false 
  }),
  
  // Config dialog actions
  setConfigDialog: (state) => set((prev) => ({
    configDialog: { ...prev.configDialog, ...state }
  })),
  
  openConfigDialog: () => set((prev) => ({
    configDialog: { ...prev.configDialog, isOpen: true }
  })),
  
  closeConfigDialog: () => set((prev) => ({
    configDialog: { ...prev.configDialog, isOpen: false, configData: null, configDataError: null }
  })),
  
  setConfigData: (data) => {
    console.log('ConfigStore: setConfigData called with', data);
    set((prev) => ({
      configDialog: { ...prev.configDialog, configData: data, configDataError: null }
    }));
  },
  
  setConfigDataError: (error) => {
    console.log('ConfigStore: setConfigDataError called with', error);
    set((prev) => ({
      configDialog: { ...prev.configDialog, configDataError: error, configData: null }
    }));
  }
}));