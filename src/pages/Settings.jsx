import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';
import { Sun, Moon, Bell, Globe, Save } from 'lucide-react';

const Settings = () => {
  const { theme, toggleTheme, settings, setSettings, addToast } = useContext(AppContext);
  const navigate = useNavigate();

  const handleToggleNotifications = () => {
    setSettings(prev => ({
      ...prev,
      notificationsEnabled: !prev.notificationsEnabled
    }));
    addToast("Notification preferences updated.", "success");
  };

  const handleToggleWeeklyDigest = () => {
    setSettings(prev => ({
      ...prev,
      weeklyDigest: !prev.weeklyDigest
    }));
    addToast("Weekly digest options updated.", "success");
  };

  const handleLanguageChange = (e) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value
    }));
    addToast(`Language updated to ${e.target.value === 'en' ? 'English' : e.target.value === 'es' ? 'Español' : 'Français'}`, "success");
  };

  const handleSave = () => {
    addToast("All settings saved successfully to profile database!", "success");
  };

  return (
    <div className="space-y-8 max-w-2xl">
      
      {/* Theme Toggling Section */}
      <DashboardCard
        title="Visual Theme Options"
        subtitle="Manage light and dark display preferences"
      >
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white text-sm md:text-base">
              Interface Mode
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Toggle between a clean light style or high-contrast dark layout.
            </p>
          </div>
          
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 hover:bg-slate-105 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold font-semibold transition-all select-none"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Switch to Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-blue-500" />
                <span>Switch to Dark</span>
              </>
            )}
          </button>
        </div>
      </DashboardCard>

      {/* Notifications configuration */}
      <DashboardCard
        title="Notification Settings"
        subtitle="Choose how and when you receive career advising reports"
      >
        <div className="space-y-6">
          {/* General alerts toggle */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-850 dark:text-white text-sm">
                General App Notifications
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Receive warnings when analysis completes or new courses are recommended.
              </p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={handleToggleNotifications}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-650" />
            </label>
          </div>

          {/* Weekly digest toggle */}
          <div className="flex items-start justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
            <div>
              <h4 className="font-bold text-slate-850 dark:text-white text-sm">
                Weekly Advising Digest
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Get a weekly progress recap matching your 90-day learning roadmap milestones.
              </p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={settings.weeklyDigest}
                onChange={handleToggleWeeklyDigest}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-650" />
            </label>
          </div>
        </div>
      </DashboardCard>

      {/* Language setup */}
      <DashboardCard
        title="Localization & Language"
        subtitle="Manage translation and locale configurations"
      >
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-bold text-slate-850 dark:text-white text-sm">
              Primary Language
            </h4>
            <p className="text-xs text-slate-505 dark:text-slate-500 mt-0.5">
              Select standard translation for analysis and buttons.
            </p>
          </div>
          
          <select
            value={settings.language}
            onChange={handleLanguageChange}
            className="px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="en">English (US)</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </DashboardCard>

      {/* Bottom Save Trigger */}
      <div className="flex justify-end pt-2">
        <Button
          variant="primary"
          icon={Save}
          onClick={handleSave}
          className="font-bold"
        >
          Save Changes
        </Button>
      </div>

    </div>
  );
};

export default Settings;
