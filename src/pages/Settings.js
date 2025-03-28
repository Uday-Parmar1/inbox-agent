import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
  BellIcon,
  EnvelopeIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  CogIcon,
  ClockIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import { useUserSettings } from '../contexts/UserSettingsContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { currentUser } = useAuth();
  const { settings, loading, saving, updateSettings, requestDataExport, deleteUserData } = useUserSettings();
  
  // Profile settings
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [github, setGithub] = useState('');
  const [portfolio, setPortfolio] = useState('');

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [followUpReminders, setFollowUpReminders] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [rejectionNotifications, setRejectionNotifications] = useState(true);

  // Job search preferences
  const [timezone, setTimezone] = useState('America/New_York');
  const [jobTitles, setJobTitles] = useState('');
  const [locations, setLocations] = useState('');
  const [salary, setSalary] = useState('');
  const [followUpDays, setFollowUpDays] = useState('14');

  // Privacy settings
  const [dataCollection, setDataCollection] = useState(true);
  const [shareAnonymousData, setShareAnonymousData] = useState(false);

  // Handle file upload (resume)
  const [fileSelected, setFileSelected] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);

  // Load settings when available
  useEffect(() => {
    if (settings) {
      // Profile settings
      setFirstName(settings.profile?.firstName || '');
      setLastName(settings.profile?.lastName || '');
      setEmail(currentUser?.email || '');
      setPhone(settings.profile?.phone || '');
      setResumeUrl(settings.profile?.resumeUrl || '');
      setLinkedIn(settings.profile?.linkedIn || '');
      setGithub(settings.profile?.github || '');
      setPortfolio(settings.profile?.portfolio || '');

      // Notification preferences
      setEmailNotifications(settings.notifications?.emailNotifications ?? true);
      setWeeklyReport(settings.notifications?.weeklyReport ?? true);
      setFollowUpReminders(settings.notifications?.followUpReminders ?? true);
      setInterviewReminders(settings.notifications?.interviewReminders ?? true);
      setRejectionNotifications(settings.notifications?.rejectionNotifications ?? true);

      // Job search preferences
      setTimezone(settings.jobSearch?.timezone || 'America/New_York');
      setJobTitles(settings.jobSearch?.jobTitles || '');
      setLocations(settings.jobSearch?.locations || '');
      setSalary(settings.jobSearch?.salary || '');
      setFollowUpDays(settings.jobSearch?.followUpDays?.toString() || '14');

      // Privacy settings
      setDataCollection(settings.privacy?.dataCollection ?? true);
      setShareAnonymousData(settings.privacy?.shareAnonymousData ?? false);
    }
  }, [settings, currentUser]);

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileSelected(true);
      setResumeUrl(file.name);
      
      // In a real app, you would upload the file to storage here
      // For this demo, we'll simulate an upload
      toast.success('Resume selected. It will be uploaded when you save settings.');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (fileSelected) {
      setFileUploading(true);
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFileUploading(false);
      setFileSelected(false);
      toast.success('Resume uploaded successfully');
    }

    // Save all settings sections
    const success = await Promise.all([
      // Save profile settings
      updateSettings('profile', {
        firstName,
        lastName,
        phone,
        resumeUrl,
        linkedIn,
        github,
        portfolio
      }),
      
      // Save notification settings
      updateSettings('notifications', {
        emailNotifications,
        weeklyReport,
        followUpReminders,
        interviewReminders,
        rejectionNotifications
      }),
      
      // Save job search settings
      updateSettings('jobSearch', {
        timezone,
        followUpDays: parseInt(followUpDays, 10),
        jobTitles,
        locations,
        salary
      }),
      
      // Save privacy settings
      updateSettings('privacy', {
        dataCollection,
        shareAnonymousData
      })
    ]);
    
    if (success.every(Boolean)) {
      toast.success('All settings saved successfully');
    }
  };

  // Handle data export request
  const handleDataExport = async () => {
    await requestDataExport();
  };

  // Handle data deletion
  const handleDeleteData = async () => {
    await deleteUserData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen -mt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 mb-8"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving || fileUploading}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            saving || fileUploading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {saving || fileUploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {fileUploading ? 'Uploading...' : 'Saving...'}
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      {/* Profile Settings */}
      <Card 
        title="Profile" 
        icon={<UserCircleIcon className="h-5 w-5 text-indigo-500" />}
        delay={0.1}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-500">Email is managed through your account authentication</p>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
              Upload Resume
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={handleFileChange}
              />
              <label
                htmlFor="resume"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
              >
                Choose File
              </label>
              <span className="ml-2 text-sm text-gray-500">
                {resumeUrl ? resumeUrl : 'No file chosen'}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
              LinkedIn Profile
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://
              </span>
              <input
                type="text"
                id="linkedin"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="linkedin.com/in/yourname"
              />
            </div>
          </div>

          <div>
            <label htmlFor="github" className="block text-sm font-medium text-gray-700">
              GitHub Profile
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://
              </span>
              <input
                type="text"
                id="github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="github.com/username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
              Portfolio Website
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://
              </span>
              <input
                type="text"
                id="portfolio"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="yourportfolio.com"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Job Search Preferences */}
      <Card 
        title="Job Search Preferences" 
        icon={<BuildingOfficeIcon className="h-5 w-5 text-blue-500" />}
        delay={0.2}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
              Timezone
            </label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Central European Time (CET)</option>
              <option value="Asia/Tokyo">Japan (JST)</option>
              <option value="Australia/Sydney">Sydney (AEST)</option>
            </select>
          </div>

          <div>
            <label htmlFor="followUpDays" className="block text-sm font-medium text-gray-700">
              Follow-up Reminder (days)
            </label>
            <input
              type="number"
              id="followUpDays"
              min="1"
              max="30"
              value={followUpDays}
              onChange={(e) => setFollowUpDays(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-sm text-gray-500">
              Receive a reminder to follow up after this many days without a response
            </p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="jobTitles" className="block text-sm font-medium text-gray-700">
              Preferred Job Titles
            </label>
            <textarea
              id="jobTitles"
              rows={2}
              value={jobTitles}
              onChange={(e) => setJobTitles(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter comma-separated job titles"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter preferred job titles separated by commas
            </p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="locations" className="block text-sm font-medium text-gray-700">
              Preferred Locations
            </label>
            <textarea
              id="locations"
              rows={2}
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter comma-separated locations"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter preferred locations separated by commas (include "Remote" if applicable)
            </p>
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Minimum Salary (USD)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="salary"
                min="0"
                step="1000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">USD</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card 
        title="Notification Preferences" 
        icon={<BellIcon className="h-5 w-5 text-amber-500" />}
        delay={0.3}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-500">
                Receive notifications about new job-related emails
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onChange={setEmailNotifications}
              className={`${
                emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Enable email notifications</span>
              <span
                className={`${
                  emailNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Weekly Report</h4>
              <p className="text-sm text-gray-500">
                Get a weekly summary of your job search progress
              </p>
            </div>
            <Switch
              checked={weeklyReport}
              onChange={setWeeklyReport}
              className={`${
                weeklyReport ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Enable weekly report</span>
              <span
                className={`${
                  weeklyReport ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Follow-up Reminders</h4>
              <p className="text-sm text-gray-500">
                Get reminders when it's time to follow up with companies
              </p>
            </div>
            <Switch
              checked={followUpReminders}
              onChange={setFollowUpReminders}
              className={`${
                followUpReminders ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Enable follow-up reminders</span>
              <span
                className={`${
                  followUpReminders ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Interview Reminders</h4>
              <p className="text-sm text-gray-500">
                Get reminders before scheduled interviews
              </p>
            </div>
            <Switch
              checked={interviewReminders}
              onChange={setInterviewReminders}
              className={`${
                interviewReminders ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Enable interview reminders</span>
              <span
                className={`${
                  interviewReminders ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Rejection Notifications</h4>
              <p className="text-sm text-gray-500">
                Get notified when a rejection email is detected
              </p>
            </div>
            <Switch
              checked={rejectionNotifications}
              onChange={setRejectionNotifications}
              className={`${
                rejectionNotifications ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Enable rejection notifications</span>
              <span
                className={`${
                  rejectionNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card 
        title="Privacy & Data" 
        icon={<ShieldCheckIcon className="h-5 w-5 text-green-500" />}
        delay={0.4}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Data Collection</h4>
              <p className="text-sm text-gray-500">
                Allow collection of application data to improve your experience
              </p>
            </div>
            <Switch
              checked={dataCollection}
              onChange={setDataCollection}
              className={`${
                dataCollection ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Enable data collection</span>
              <span
                className={`${
                  dataCollection ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Anonymous Data Sharing</h4>
              <p className="text-sm text-gray-500">
                Share anonymous data to help improve job search insights for everyone
              </p>
            </div>
            <Switch
              checked={shareAnonymousData}
              onChange={setShareAnonymousData}
              className={`${
                shareAnonymousData ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Enable anonymous data sharing</span>
              <span
                className={`${
                  shareAnonymousData ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          <div className="pt-2">
            <button 
              type="button"
              onClick={handleDataExport}
              className="text-sm text-red-600 hover:text-red-500 font-medium focus:outline-none"
            >
              Request Data Export
            </button>
          </div>

          <div>
            <button 
              type="button"
              onClick={handleDeleteData}
              className="text-sm text-red-600 hover:text-red-500 font-medium focus:outline-none"
            >
              Delete All My Data
            </button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving || fileUploading}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            saving || fileUploading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {saving || fileUploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {fileUploading ? 'Uploading...' : 'Saving...'}
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Settings; 