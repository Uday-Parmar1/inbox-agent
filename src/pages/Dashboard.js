import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const initialApplications = [
  {
    id: 1,
    company: 'Google',
    position: 'Software Engineer',
    status: 'applied',
    date: '2024-03-28',
    lastUpdate: '2024-03-28',
  },
  {
    id: 2,
    company: 'Microsoft',
    position: 'Full Stack Developer',
    status: 'interview',
    date: '2024-03-25',
    lastUpdate: '2024-03-27',
  },
  {
    id: 3,
    company: 'Amazon',
    position: 'Frontend Developer',
    status: 'waiting',
    date: '2024-03-20',
    lastUpdate: '2024-03-23',
  },
  {
    id: 4,
    company: 'Meta',
    position: 'React Developer',
    status: 'rejected',
    date: '2024-03-15',
    lastUpdate: '2024-03-18',
  },
];

const statusConfig = {
  applied: {
    title: 'Applied',
    color: 'bg-blue-100 text-blue-800',
  },
  interview: {
    title: 'Interview',
    color: 'bg-yellow-100 text-yellow-800',
  },
  waiting: {
    title: 'Waiting',
    color: 'bg-green-100 text-green-800',
  },
  rejected: {
    title: 'Rejected',
    color: 'bg-red-100 text-red-800',
  },
};

const Dashboard = () => {
  const [applications] = useState(initialApplications);

  const getApplicationsByStatus = (status) => {
    return applications.filter((app) => app.status === status);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Job Applications</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Application
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(statusConfig).map(([status, config]) => (
          <div key={status} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">{config.title}</h3>
            </div>
            <div className="p-4 space-y-4">
              {getApplicationsByStatus(status).map((application) => (
                <div
                  key={application.id}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{application.company}</h4>
                      <p className="text-sm text-gray-500">{application.position}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                      {config.title}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Applied: {new Date(application.date).toLocaleDateString()}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Last Update: {new Date(application.lastUpdate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 