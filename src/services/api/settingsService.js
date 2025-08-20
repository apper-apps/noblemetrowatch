import settingsData from "@/services/mockData/settings.json";

let settings = { ...settingsData };

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const settingsService = {
  async get() {
    await delay(300);
    return { ...settings };
  },

  async update(updates) {
    await delay(400);
    settings = { ...settings, ...updates };
    return { ...settings };
  },

  async sendTestAlert(channel) {
    await delay(500);
    const channels = {
      sms: "SMS alert test sent successfully",
      email: "Email alert test sent successfully", 
      whatsapp: "WhatsApp alert test sent successfully"
    };
    
    if (!channels[channel]) {
      throw new Error(`Invalid channel: ${channel}`);
    }
    
    return { message: channels[channel], channel, timestamp: new Date().toISOString() };
  },

  async resetToDefaults() {
    await delay(350);
    settings = {
      alertThreshold: 75,
      faceBlurEnabled: true,
      notificationChannels: {
        sms: true,
        email: true,
        whatsapp: false
      },
      darkMode: false,
      autoResolveTimeout: 30,
      maxConcurrentAlerts: 10,
      recordingQuality: "high",
      motionSensitivity: 65
    };
    return { ...settings };
  }
};