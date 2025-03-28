import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Weekly Report', href: '/weekly-report', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 dark:border-primary-dark bg-white dark:bg-primary-dark">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <EnvelopeIcon className="h-8 w-8 text-indigo-600 dark:text-accent-light" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-primary-light">InboxAgent</span>
          </div>
          <nav className="mt-5 flex-1 space-y-1 bg-white dark:bg-primary-dark px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-accent-dark text-indigo-600 dark:text-accent-light'
                      : 'text-gray-600 dark:text-secondary-light hover:bg-gray-50 dark:hover:bg-accent-dark hover:text-gray-900 dark:hover:text-primary-light'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 flex-shrink-0 ${
                      isActive ? 'text-indigo-600 dark:text-accent-light' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-secondary-light'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 