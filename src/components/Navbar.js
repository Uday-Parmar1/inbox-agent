import React from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">InboxAgent</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 