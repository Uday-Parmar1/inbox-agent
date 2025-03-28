import React from 'react';
import {
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Applications',
    value: '24',
    change: '+4',
    changeType: 'increase',
    icon: ChartBarIcon,
  },
  {
    name: 'Pending Responses',
    value: '12',
    change: '-2',
    changeType: 'decrease',
    icon: ClockIcon,
  },
  {
    name: 'Interviews Scheduled',
    value: '5',
    change: '+2',
    changeType: 'increase',
    icon: CheckCircleIcon,
  },
  {
    name: 'Rejections',
    value: '3',
    change: '+1',
    changeType: 'increase',
    icon: XCircleIcon,
  },
];

const actionItems = [
  {
    id: 1,
    title: 'Follow up with Shopify',
    description: 'No response since March 3rd',
    priority: 'high',
    dueDate: '2024-03-30',
  },
  {
    id: 2,
    title: 'Prepare for McKinsey Interview',
    description: 'Technical interview scheduled in 3 days',
    priority: 'high',
    dueDate: '2024-03-31',
  },
  {
    id: 3,
    title: 'Send Thank You Note',
    description: 'Follow up after Amazon interview',
    priority: 'medium',
    dueDate: '2024-03-29',
  },
];

const WeeklyReport = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Weekly Report</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Action Items */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Action Items</h3>
          <div className="mt-5">
            <ul className="divide-y divide-gray-200">
              {actionItems.map((item) => (
                <li key={item.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReport; 