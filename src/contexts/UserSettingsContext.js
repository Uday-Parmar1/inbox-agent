import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp,
  collection
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

// Create the context
const UserSettingsContext = createContext();

// Hook to use the user settings context
export function useUserSettings() {
  return useContext(UserSettingsContext);
}

// Default settings - used for new users or when settings fail to load
const defaultSettings = {
  profile: {
    firstName: '',
    lastName: '',
    phone: '',
    resumeUrl: '',
    linkedIn: '',
    github: '',
    portfolio: ''
  },
  jobSearch: {
    timezone: 'America/New_York',
    followUpDays: 14,
    jobTitles: 'Software Engineer, Frontend Developer, Web Developer',
    locations: 'Remote, New York, Boston',
    salary: '90000'
  },
  notifications: {
    emailNotifications: true,
    weeklyReport: true,
    followUpReminders: true,
    interviewReminders: true,
    rejectionNotifications: true
  },
  privacy: {
    dataCollection: true,
    shareAnonymousData: false
  },
  createdAt: null,
  updatedAt: null
};

export function UserSettingsProvider({ children }) {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load user settings from Firestore when user auth changes
  useEffect(() => {
    const loadUserSettings = async () => {
      if (!currentUser) {
        setSettings(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        console.log('Loading settings for user:', currentUser.uid);
        
        // Create references
        const userDocRef = doc(db, 'users', currentUser.uid);
        const settingsDocRef = doc(db, 'users', currentUser.uid, 'settings', 'preferences');
        
        // First check if user document exists
        const userDocSnap = await getDoc(userDocRef);
        
        if (!userDocSnap.exists()) {
          console.log('Creating new user document');
          // Create the user document first if it doesn't exist
          await setDoc(userDocRef, {
            email: currentUser.email,
            displayName: currentUser.displayName || '',
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp()
          });
        }
        
        // Then check if settings exist
        const settingsSnap = await getDoc(settingsDocRef);
        
        if (settingsSnap.exists()) {
          console.log('Settings found:', settingsSnap.data());
          // User has existing settings
          setSettings(settingsSnap.data());
        } else {
          console.log('Creating default settings');
          // New user, create default settings
          const newSettings = {
            ...defaultSettings,
            profile: {
              ...defaultSettings.profile,
              // Use info from auth if available
              firstName: currentUser.displayName ? currentUser.displayName.split(' ')[0] : '',
              lastName: currentUser.displayName ? currentUser.displayName.split(' ').slice(1).join(' ') : '',
            },
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };
          
          // Ensure settings collection exists
          await setDoc(settingsDocRef, newSettings);
          console.log('Default settings created');
          setSettings(newSettings);
        }
      } catch (error) {
        console.error('Error loading user settings:', error);
        // Log more details about the error
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        // Fall back to default settings on error
        setSettings(defaultSettings);
        toast.error(`Failed to load settings: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadUserSettings();
  }, [currentUser]);

  // Save settings to Firestore
  const saveSettings = async (newSettings) => {
    if (!currentUser) {
      toast.error('You must be logged in to save settings');
      return false;
    }

    setSaving(true);
    try {
      console.log('Saving settings:', newSettings);
      
      // Make sure user document exists
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        console.log('Creating user document before saving settings');
        await setDoc(userDocRef, {
          email: currentUser.email,
          displayName: currentUser.displayName || '',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
      }
      
      // Save settings
      const settingsDocRef = doc(db, 'users', currentUser.uid, 'settings', 'preferences');
      
      // Create the settings document if it doesn't exist
      const settingsDocSnap = await getDoc(settingsDocRef);
      const updatedSettings = {
        ...newSettings,
        updatedAt: serverTimestamp()
      };
      
      if (!settingsDocSnap.exists()) {
        console.log('Creating new settings document');
        await setDoc(settingsDocRef, {
          ...updatedSettings,
          createdAt: serverTimestamp()
        });
      } else {
        console.log('Updating existing settings document');
        await updateDoc(settingsDocRef, updatedSettings);
      }
      
      console.log('Settings saved successfully');
      setSettings(updatedSettings);
      toast.success('Settings saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      toast.error(`Failed to save settings: ${error.message}`);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Update specific section of settings
  const updateSettings = async (section, sectionData) => {
    if (!settings) return false;
    
    const newSettings = {
      ...settings,
      [section]: {
        ...settings[section],
        ...sectionData
      }
    };
    
    return saveSettings(newSettings);
  };

  // Reset settings to default values
  const resetSettings = async () => {
    if (!currentUser) return false;
    
    const resetData = {
      ...defaultSettings,
      updatedAt: serverTimestamp()
    };
    
    return saveSettings(resetData);
  };

  // Request data export (implementation would depend on your backend)
  const requestDataExport = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to export data');
      return false;
    }
    
    toast.success('Data export request submitted. You will receive an email shortly.');
    // In a real app, you would trigger a backend process here
    return true;
  };

  // Delete user data
  const deleteUserData = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to delete data');
      return false;
    }
    
    if (window.confirm('Are you sure you want to delete all your data? This cannot be undone.')) {
      try {
        // In a real app, you would implement proper data deletion
        const userDocRef = doc(db, 'users', currentUser.uid);
        const settingsDocRef = doc(db, 'users', currentUser.uid, 'settings', 'preferences');
        
        const resetSettings = {
          ...defaultSettings,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        
        await setDoc(settingsDocRef, resetSettings);
        setSettings(resetSettings);
        
        toast.success('All user data has been reset');
        return true;
      } catch (error) {
        console.error('Error deleting user data:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        toast.error(`Failed to delete user data: ${error.message}`);
        return false;
      }
    }
    return false;
  };

  const value = {
    settings,
    loading,
    saving,
    saveSettings,
    updateSettings,
    resetSettings,
    requestDataExport,
    deleteUserData
  };

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  );
} 