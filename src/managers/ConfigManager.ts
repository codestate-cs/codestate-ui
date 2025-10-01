import { useConfigStore } from '../store/combinedStore';
import type { OSInfo } from '../store/configStore';

export class ConfigManager {

  // Handle config init response
  handleConfigInitResponse(data: any): void {
    console.log('ConfigManager: Received config init response', data);
    console.log('ConfigManager: data.status', data.status);
    console.log('ConfigManager: data.payload', data.payload);
    const configStore = useConfigStore.getState();
    
    if (data.status === 'success') {
      console.log('ConfigManager: Setting config data', data.payload.config);
      configStore.setConfigData(data.payload.config);
      
      // Handle OS info if present
      if (data.payload.osInfo) {
        console.log('ConfigManager: Setting OS info', data.payload.osInfo);
        const osInfo: OSInfo = {
          platform: data.payload.osInfo.platform || 'unknown',
          isLinux: data.payload.osInfo.isLinux || false,
          isMacOS: data.payload.osInfo.isMacOS || false,
          isWindows: data.payload.osInfo.isWindows || false,
          supportsTerminalTabs: data.payload.osInfo.supportsTerminalTabs || false
        };
        configStore.setOSInfo(osInfo);
        configStore.setOSInfoLoading(false);
      }
    } else if (data.payload && data.payload.error) {
      console.log('ConfigManager: Setting config error', data.payload.error);
      configStore.setConfigDataError(data.payload.error);
      configStore.setOSInfoError(data.payload.error);
      configStore.setOSInfoLoading(false);
    }
  }

  // Handle config update response
  handleConfigUpdateResponse(data: any): void {
    console.log('ConfigManager: Received config update response', data);
    const configStore = useConfigStore.getState();
    if (data.status === 'success') {
      // Close the config dialog
      configStore.closeConfigDialog();
      
      // Update the config data in the store
      configStore.setConfigData(data.payload.config);
    } else if (data.payload && data.payload.error) {
      // Handle error case - keep dialog open to show error
      console.error('Config update failed:', data.payload.error);
    }
  }
}