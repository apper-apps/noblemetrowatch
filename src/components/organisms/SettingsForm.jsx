import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Switch from "@/components/atoms/Switch";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { settingsService } from "@/services/api/settingsService";

const SettingsForm = ({ settings, onUpdate }) => {
  const [formData, setFormData] = useState(settings || {});
  const [loading, setLoading] = useState(false);
  const [testingAlert, setTestingAlert] = useState("");

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNotificationChange = (channel, enabled) => {
    setFormData(prev => ({
      ...prev,
      notificationChannels: {
        ...prev.notificationChannels,
        [channel]: enabled
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedSettings = await settingsService.update(formData);
      onUpdate(updatedSettings);
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const handleTestAlert = async (channel) => {
    setTestingAlert(channel);
    
    try {
      await settingsService.sendTestAlert(channel);
      toast.success(`Test ${channel.toUpperCase()} alert sent successfully`);
    } catch (error) {
      toast.error(`Failed to send test ${channel.toUpperCase()} alert`);
    } finally {
      setTestingAlert("");
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Are you sure you want to reset all settings to defaults?")) {
      return;
    }
    
    setLoading(true);
    try {
      const defaultSettings = await settingsService.resetToDefaults();
      setFormData(defaultSettings);
      onUpdate(defaultSettings);
      toast.success("Settings reset to defaults");
    } catch (error) {
      toast.error("Failed to reset settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Alert Configuration */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Bell" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                Alert Configuration
              </h3>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                Configure when and how alerts are triggered
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Alert Threshold (%)"
              type="number"
              min="0"
              max="100"
              value={formData.alertThreshold || 75}
              onChange={(e) => handleInputChange("alertThreshold", parseInt(e.target.value))}
              placeholder="75"
            />

            <FormField
              label="Auto Resolve Timeout (minutes)"
              type="number"
              min="5"
              max="120"
              value={formData.autoResolveTimeout || 30}
              onChange={(e) => handleInputChange("autoResolveTimeout", parseInt(e.target.value))}
              placeholder="30"
            />

            <FormField
              label="Max Concurrent Alerts"
              type="number"
              min="1"
              max="50"
              value={formData.maxConcurrentAlerts || 10}
              onChange={(e) => handleInputChange("maxConcurrentAlerts", parseInt(e.target.value))}
              placeholder="10"
            />

            <FormField
              label="Motion Sensitivity (%)"
              type="number"
              min="0"
              max="100"
              value={formData.motionSensitivity || 65}
              onChange={(e) => handleInputChange("motionSensitivity", parseInt(e.target.value))}
              placeholder="65"
            />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-surface-900 dark:text-surface-100">
                  Face Blur
                </h4>
                <p className="text-sm text-surface-500 dark:text-surface-400">
                  Automatically blur faces in camera feeds for privacy
                </p>
              </div>
              <Switch
                checked={formData.faceBlurEnabled || false}
                onChange={(checked) => handleInputChange("faceBlurEnabled", checked)}
              />
            </div>
          </div>
        </Card>

        {/* Notification Channels */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="MessageSquare" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                Notification Channels
              </h3>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                Configure how you want to receive alerts
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { key: "sms", label: "SMS Notifications", icon: "MessageSquare" },
              { key: "email", label: "Email Notifications", icon: "Mail" },
              { key: "whatsapp", label: "WhatsApp Notifications", icon: "MessageCircle" }
            ].map((channel) => (
              <div key={channel.key} className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ApperIcon name={channel.icon} className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                  <span className="font-medium text-surface-900 dark:text-surface-100">
                    {channel.label}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleTestAlert(channel.key)}
                    loading={testingAlert === channel.key}
                    disabled={!formData.notificationChannels?.[channel.key]}
                  >
                    Test
                  </Button>
                  <Switch
                    checked={formData.notificationChannels?.[channel.key] || false}
                    onChange={(checked) => handleNotificationChange(channel.key, checked)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Preferences */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Settings" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                System Preferences
              </h3>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                Configure camera and recording settings
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Recording Quality">
              <select
                value={formData.recordingQuality || "high"}
                onChange={(e) => handleInputChange("recordingQuality", e.target.value)}
                className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="low">Low (480p)</option>
                <option value="medium">Medium (720p)</option>
                <option value="high">High (1080p)</option>
                <option value="ultra">Ultra (4K)</option>
              </select>
            </FormField>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            loading={loading}
          >
            Reset to Defaults
          </Button>

          <div className="flex space-x-3">
            <Button
              type="submit"
              loading={loading}
              icon="Save"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default SettingsForm;