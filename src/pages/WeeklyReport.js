import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EnvelopeIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

import Card from '../components/Card';
import StatCard from '../components/StatCard';

// The stats data for each timeframe
const timeframeStats = {
  weekly: [
    {
      name: 'Total Applications',
      value: '24',
      change: '+4',
      changeType: 'increase',
      icon: ChartBarIcon,
      inverseColors: false,
    },
    {
      name: 'Pending Responses',
      value: '12',
      change: '-2',
      changeType: 'decrease',
      icon: ClockIcon,
      inverseColors: true,
    },
    {
      name: 'Interviews Scheduled',
      value: '5',
      change: '+2',
      changeType: 'increase',
      icon: CheckCircleIcon,
      inverseColors: false,
    },
    {
      name: 'Rejections',
      value: '3',
      change: '+1',
      changeType: 'increase',
      icon: XCircleIcon,
      inverseColors: true,
    },
  ],
  monthly: [
    {
      name: 'Total Applications',
      value: '87',
      change: '+12',
      changeType: 'increase',
      icon: ChartBarIcon,
      inverseColors: false,
    },
    {
      name: 'Pending Responses',
      value: '38',
      change: '-5',
      changeType: 'decrease',
      icon: ClockIcon,
      inverseColors: true,
    },
    {
      name: 'Interviews Scheduled',
      value: '18',
      change: '+7',
      changeType: 'increase',
      icon: CheckCircleIcon,
      inverseColors: false,
    },
    {
      name: 'Rejections',
      value: '14',
      change: '+3',
      changeType: 'increase',
      icon: XCircleIcon,
      inverseColors: true,
    },
  ],
  quarterly: [
    {
      name: 'Total Applications',
      value: '215',
      change: '+35',
      changeType: 'increase',
      icon: ChartBarIcon,
      inverseColors: false,
    },
    {
      name: 'Pending Responses',
      value: '92',
      change: '-14',
      changeType: 'decrease',
      icon: ClockIcon,
      inverseColors: true,
    },
    {
      name: 'Interviews Scheduled',
      value: '42',
      change: '+15',
      changeType: 'increase',
      icon: CheckCircleIcon,
      inverseColors: false,
    },
    {
      name: 'Rejections',
      value: '31',
      change: '+7',
      changeType: 'increase',
      icon: XCircleIcon,
      inverseColors: true,
    },
  ],
};

const initialActionItems = [
  {
    id: 1,
    title: 'Follow up with Shopify',
    description: 'No response since March 3rd (25 days ago)',
    priority: 'high',
    dueDate: '2024-03-30',
    type: 'follow-up',
    company: 'Shopify',
    position: 'Frontend Developer',
    completed: false,
  },
  {
    id: 2,
    title: 'Prepare for McKinsey Interview',
    description: 'Technical interview scheduled in 3 days',
    priority: 'high',
    dueDate: '2024-03-31',
    type: 'interview',
    company: 'McKinsey',
    position: 'Software Engineer',
    completed: false,
  },
  {
    id: 3,
    title: 'Send Thank You Note',
    description: 'Follow up after Amazon interview',
    priority: 'medium',
    dueDate: '2024-03-29',
    type: 'note',
    company: 'Amazon',
    position: 'Full Stack Developer',
    completed: false,
  },
  {
    id: 4,
    title: 'Complete IBM Take-home Assignment',
    description: 'Due in 5 days, requires React implementation',
    priority: 'high',
    dueDate: '2024-04-02',
    type: 'assignment',
    company: 'IBM',
    position: 'Frontend Engineer',
    completed: false,
  },
];

// Application data for each timeframe
const timeframeApplicationData = {
  weekly: {
    labels: ['4 Weeks Ago', '3 Weeks Ago', '2 Weeks Ago', 'Last Week', 'This Week'],
    datasets: [
      {
        label: 'Applications Sent',
        data: [5, 7, 4, 8, 6],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
      {
        label: 'Responses Received',
        data: [2, 3, 1, 5, 4],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
    ],
  },
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications Sent',
        data: [15, 22, 18, 25, 30, 28],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
      {
        label: 'Responses Received',
        data: [8, 12, 6, 14, 16, 12],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
    ],
  },
  quarterly: {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
    datasets: [
      {
        label: 'Applications Sent',
        data: [45, 62, 58, 70, 85, 78],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
      {
        label: 'Responses Received',
        data: [22, 30, 25, 32, 42, 38],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
    ],
  },
};

// Status distribution data for each timeframe
const timeframeStatusData = {
  weekly: {
    labels: ['Applied', 'Waiting', 'Interview', 'Rejected'],
    datasets: [
      {
        data: [12, 7, 5, 3],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(245, 158, 11)',
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  },
  monthly: {
    labels: ['Applied', 'Waiting', 'Interview', 'Rejected'],
    datasets: [
      {
        data: [38, 25, 18, 14],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(245, 158, 11)',
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  },
  quarterly: {
    labels: ['Applied', 'Waiting', 'Interview', 'Rejected'],
    datasets: [
      {
        data: [92, 62, 42, 31],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(245, 158, 11)',
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  },
};

// Response rate trend data for each timeframe
const timeframeResponseRateData = {
  weekly: {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Response Rate (%)',
        data: [15, 22, 28, 32, 35],
        fill: true,
        backgroundColor: 'rgba(147, 197, 253, 0.2)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        tension: 0.4,
      },
    ],
  },
  monthly: {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Response Rate (%)',
        data: [12, 15, 18, 20, 22, 25, 28, 30, 32, 34, 36, 38],
        fill: true,
        backgroundColor: 'rgba(147, 197, 253, 0.2)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        tension: 0.4,
      },
    ],
  },
  quarterly: {
    labels: ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
    datasets: [
      {
        label: 'Response Rate (%)',
        data: [8, 12, 15, 18, 22, 25, 28, 32, 35, 38],
        fill: true,
        backgroundColor: 'rgba(147, 197, 253, 0.2)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        tension: 0.4,
      },
    ],
  },
};

// Timeframe specific observations
const timeframeObservations = {
  weekly: [
    { text: 'Your response rate is improving, up 3% from last week', icon: CheckCircleIcon, color: 'text-green-500' },
    { text: 'Applications with tailored cover letters receive 40% more responses', icon: CheckCircleIcon, color: 'text-green-500' },
    { text: 'Most successful applications were for Frontend Developer positions', icon: BriefcaseIcon, color: 'text-blue-500' },
    { text: 'Follow-up emails sent 7-10 days after applying increase response rate by 15%', icon: EnvelopeIcon, color: 'text-indigo-500' },
  ],
  monthly: [
    { text: 'Response rate has increased by 8% compared to last month', icon: CheckCircleIcon, color: 'text-green-500' },
    { text: 'Technical roles have a 25% higher interview rate than non-technical roles', icon: BriefcaseIcon, color: 'text-blue-500' },
    { text: 'Applications sent early in the week (Mon-Wed) get 30% more responses', icon: CheckCircleIcon, color: 'text-green-500' },
    { text: 'Companies with 50-200 employees respond 20% faster than larger corporations', icon: EnvelopeIcon, color: 'text-indigo-500' },
  ],
  quarterly: [
    { text: 'Your overall success rate has increased by 12% this quarter', icon: CheckCircleIcon, color: 'text-green-500' },
    { text: 'Remote positions receive 35% more applications but have 15% lower response rate', icon: BriefcaseIcon, color: 'text-blue-500' },
    { text: 'Q2 typically shows highest hiring activity based on historical data', icon: ChartBarIcon, color: 'text-purple-500' },
    { text: 'Skills in React, Node.js and Cloud services mentioned in 70% of successful applications', icon: CheckCircleIcon, color: 'text-green-500' },
  ],
};

const WeeklyReport = () => {
  const [timeframe, setTimeframe] = useState('weekly');
  const [actionItems, setActionItems] = useState(initialActionItems);
  const [showCompleted, setShowCompleted] = useState(false);
  
  // Get data based on selected timeframe
  const stats = useMemo(() => timeframeStats[timeframe], [timeframe]);
  const weeklyApplicationData = useMemo(() => timeframeApplicationData[timeframe], [timeframe]);
  const statusDistributionData = useMemo(() => timeframeStatusData[timeframe], [timeframe]);
  const responseRateData = useMemo(() => timeframeResponseRateData[timeframe], [timeframe]);
  const observations = useMemo(() => timeframeObservations[timeframe], [timeframe]);
  
  // Filter action items based on completion status
  const filteredActionItems = useMemo(() => {
    return showCompleted 
      ? actionItems 
      : actionItems.filter(item => !item.completed);
  }, [actionItems, showCompleted]);
  
  // Build title based on timeframe
  const reportTitle = useMemo(() => {
    switch(timeframe) {
      case 'monthly':
        return 'Monthly Report';
      case 'quarterly':
        return 'Quarterly Report';
      default:
        return 'Weekly Report';
    }
  }, [timeframe]);
  
  // Handle marking an action item as done
  const handleMarkAsDone = (id) => {
    setActionItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  const timeframeSelector = (
    <select 
      value={timeframe}
      onChange={(e) => setTimeframe(e.target.value)}
      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
      <option value="quarterly">Quarterly</option>
    </select>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{reportTitle}</h2>
        <div className="flex space-x-2">
          {timeframeSelector}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            inverseColors={stat.inverseColors}
            delay={0.1 * index}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications Chart */}
        <Card 
          title="Application Activity" 
          className="lg:col-span-2"
          delay={0.1}
        >
          <div className="h-64">
            <Bar 
              data={weeklyApplicationData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0,
                    },
                  },
                },
              }} 
            />
          </div>
        </Card>

        {/* Application Status Distribution */}
        <Card 
          title="Application Status"
          delay={0.2}
        >
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={statusDistributionData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
                cutout: '70%',
              }} 
            />
          </div>
        </Card>
      </div>

      {/* Insights Section */}
      <Card 
        title="Insights & Trends"
        delay={0.3}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <h4 className="text-base font-medium text-gray-800 mb-2">Response Rate Trend</h4>
            <div className="h-60">
              <Line 
                data={responseRateData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      title: {
                        display: true,
                        text: 'Response Rate (%)',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div>
            <h4 className="text-base font-medium text-gray-800 mb-2">Key Observations</h4>
            <ul className="space-y-3 text-sm">
              {observations.map((item, index) => (
                <li key={index} className="flex items-start">
                  <item.icon className={`h-5 w-5 ${item.color} mr-2 flex-shrink-0 mt-0.5`} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Action Items */}
      <Card 
        title="Action Items"
        delay={0.4}
        headerActions={
          <div className="flex items-center">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={() => setShowCompleted(!showCompleted)}
                className="rounded text-indigo-600 mr-2 h-4 w-4 focus:ring-indigo-500"
              />
              Show completed
            </label>
          </div>
        }
      >
        {filteredActionItems.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            {showCompleted ? "No action items found" : "No pending action items. Great job!"}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredActionItems.map((item) => (
              <li 
                key={item.id} 
                className={`py-4 ${item.completed ? 'bg-gray-50' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <span
                      className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                        item.completed
                          ? 'bg-green-100'
                          : item.priority === 'high'
                          ? 'bg-red-100'
                          : 'bg-yellow-100'
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <>
                          {item.type === 'follow-up' && <EnvelopeIcon className="h-4 w-4 text-gray-500" />}
                          {item.type === 'interview' && <BriefcaseIcon className="h-4 w-4 text-gray-500" />}
                          {item.type === 'note' && <CheckCircleIcon className="h-4 w-4 text-gray-500" />}
                          {item.type === 'assignment' && <ClockIcon className="h-4 w-4 text-gray-500" />}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className={`text-sm font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {item.title}
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.completed
                            ? 'bg-green-100 text-green-800'
                            : item.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.completed ? 'Completed' : item.priority}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${item.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                    <div className="mt-2 flex space-x-4 text-xs text-gray-500">
                      <span>{item.company}</span>
                      <span>•</span>
                      <span>{item.position}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    <div>Due: {new Date(item.dueDate).toLocaleDateString()}</div>
                    <button 
                      onClick={() => handleMarkAsDone(item.id)}
                      className={`mt-2 text-xs font-medium ${
                        item.completed 
                          ? 'text-gray-600 hover:text-gray-500' 
                          : 'text-indigo-600 hover:text-indigo-500'
                      }`}
                    >
                      {item.completed ? 'Mark as Undone' : 'Mark as Done'}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </motion.div>
  );
};

export default WeeklyReport; 