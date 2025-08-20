import React, { useState, useEffect } from "react";
import SettingsForm from "@/components/organisms/SettingsForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { settingsService } from "@/services/api/settingsService";

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSettings = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await settingsService.get();
      setSettings(data);
    } catch (err) {
      setError(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsUpdate = (updatedSettings) => {
    setSettings(updatedSettings);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadSettings} />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
          System Settings
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          Configure alert thresholds, notification preferences, and system behavior
        </p>
      </div>

      <SettingsForm
        settings={settings}
        onUpdate={handleSettingsUpdate}
      />
    </div>
  );
};

export default Settings;