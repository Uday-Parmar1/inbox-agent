import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  BriefcaseIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  EllipsisHorizontalIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { Doughnut } from 'react-chartjs-2';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import { useTheme } from '../contexts/ThemeContext';

// Use safe default icon in case of image loading errors
const CompanyLogo = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  
  const handleError = () => {
    setError(true);
  };
  
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-full ${className}`}>
        <BuildingOfficeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={handleError}
    />
  );
};

const statusConfig = {
  applied: {
    title: 'Applied',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    lightColor: 'bg-blue-50 dark:bg-blue-900/40',
    icon: <CalendarIcon className="h-5 w-5 text-blue-500 dark:text-blue-300" aria-hidden="true" />,
    count: 0,
  },
  interview: {
    title: 'Interview',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    lightColor: 'bg-yellow-50 dark:bg-yellow-900/40',
    icon: <BriefcaseIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-300" aria-hidden="true" />,
    count: 0,
  },
  waiting: {
    title: 'Waiting',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    lightColor: 'bg-green-50 dark:bg-green-900/40',
    icon: <ChartBarIcon className="h-5 w-5 text-green-500 dark:text-green-300" aria-hidden="true" />,
    count: 0,
  },
  rejected: {
    title: 'Rejected',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    lightColor: 'bg-red-50 dark:bg-red-900/40',
    icon: <ChartBarIcon className="h-5 w-5 text-red-500 dark:text-red-300" aria-hidden="true" />,
    count: 0,
  },
};

// Stats for the overview
const overviewStats = [
  { 
    name: 'Total Applications', 
    value: '32', 
    change: '+8', 
    changeType: 'increase',
    icon: BriefcaseIcon,
    inverseColors: false,
  },
  { 
    name: 'Response Rate', 
    value: '42%', 
    change: '+4%', 
    changeType: 'increase',
    icon: ChartBarIcon,
    inverseColors: false,
  },
  { 
    name: 'Avg. Response Time', 
    value: '5.2', 
    change: '-0.8', 
    changeType: 'decrease',
    icon: CalendarIcon,
    inverseColors: true,
  },
];

// Data for status distribution chart
const generateChartData = (applications) => {
  const statusCounts = applications.reduce((counts, app) => {
    counts[app.status] = (counts[app.status] || 0) + 1;
    return counts;
  }, {});

  return {
    labels: Object.keys(statusConfig).map(key => statusConfig[key].title),
    datasets: [
      {
        data: Object.keys(statusConfig).map(key => statusCounts[key] || 0),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',  // blue
          'rgba(245, 158, 11, 0.7)',  // yellow
          'rgba(16, 185, 129, 0.7)',  // green
          'rgba(239, 68, 68, 0.7)',   // red
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(245, 158, 11)',
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };
};

const Dashboard = () => {
  const { isDark } = useTheme();
  const chartRef = useRef(null);
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: 'Google',
      companyLogo: 'https://cdn-icons-png.flaticon.com/512/2702/2702602.png',
      position: 'Software Engineer',
      status: 'applied',
      date: '2024-03-28',
      lastUpdate: '2024-03-28',
      location: 'Mountain View, CA',
      salary: '$120K - $160K',
      type: 'Full-time',
    },
    {
      id: 2,
      company: 'Microsoft',
      companyLogo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
      position: 'Full Stack Developer',
      status: 'interview',
      date: '2024-03-25',
      lastUpdate: '2024-03-27',
      location: 'Redmond, WA',
      salary: '$110K - $150K',
      type: 'Full-time',
    },
    {
      id: 3,
      company: 'Amazon',
      companyLogo: 'https://cdn-icons-png.flaticon.com/512/5968/5968217.png',
      position: 'Frontend Developer',
      status: 'waiting',
      date: '2024-03-20',
      lastUpdate: '2024-03-23',
      location: 'Seattle, WA',
      salary: '$115K - $145K',
      type: 'Full-time',
    },
    {
      id: 4,
      company: 'Meta',
      companyLogo: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png',
      position: 'React Developer',
      status: 'rejected',
      date: '2024-03-15',
      lastUpdate: '2024-03-18',
      location: 'Menlo Park, CA',
      salary: '$125K - $165K',
      type: 'Full-time',
    },
    {
      id: 5,
      company: 'Apple',
      companyLogo: 'https://cdn-icons-png.flaticon.com/512/0/747.png',
      position: 'iOS Developer',
      status: 'applied',
      date: '2024-03-27',
      lastUpdate: '2024-03-27',
      location: 'Cupertino, CA',
      salary: '$130K - $170K',
      type: 'Full-time',
    },
    {
      id: 6,
      company: 'Netflix',
      companyLogo: 'https://cdn-icons-png.flaticon.com/512/2504/2504929.png',
      position: 'Senior Frontend Engineer',
      status: 'interview',
      date: '2024-03-22',
      lastUpdate: '2024-03-26',
      location: 'Los Gatos, CA',
      salary: '$140K - $180K',
      type: 'Full-time',
    },
    {
      id: 7,
      company: 'Twitter',
      companyLogo: 'https://cdn-icons-png.flaticon.com/512/3256/3256013.png',
      position: 'Software Engineer II',
      status: 'waiting',
      date: '2024-03-18',
      lastUpdate: '2024-03-21',
      location: 'San Francisco, CA',
      salary: '$120K - $150K',
      type: 'Full-time',
    },
    {
      id: 8,
      company: 'Airbnb',
      companyLogo: 'https://cdn-icons-png.flaticon.com/512/2111/2111320.png',
      position: 'Frontend Engineer',
      status: 'applied',
      date: '2024-03-26',
      lastUpdate: '2024-03-26',
      location: 'San Francisco, CA',
      salary: '$115K - $155K',
      type: 'Full-time',
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Update status counts
  Object.keys(statusConfig).forEach(status => {
    statusConfig[status].count = applications.filter(app => app.status === status).length;
  });

  // Update chart colors when theme changes
  useEffect(() => {
    // Chart will automatically re-render with the new isDark value
    // since we're using it directly in the options
  }, [isDark]);

  // Filtered applications based on search query and status filter
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddApplication = () => {
    setIsAddModalOpen(true);
    // This would open a modal form in a real implementation
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header with action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-primary-light">Job Applications</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-secondary-light">Keep track of your job search journey</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {}} 
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-primary-dark rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-primary-light bg-white dark:bg-secondary-dark hover:bg-gray-50 dark:hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-primary-dark"
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Refresh
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddApplication}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-primary-dark"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Application
          </motion.button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {overviewStats.map((stat, index) => (
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

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by company, position, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-md border-gray-300 dark:border-primary-dark pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 dark:bg-secondary-dark dark:text-primary-light dark:placeholder-gray-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
        
        <div className="flex-shrink-0 flex space-x-2">
          <div className="relative inline-block text-left">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border-gray-300 dark:border-primary-dark pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-secondary-dark dark:text-primary-light"
            >
              <option value="all">All Statuses</option>
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.title}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FunnelIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard main content */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <Card title="Applications" className="overflow-hidden">
            <div className="custom-scrollbar overflow-auto" style={{ maxHeight: "calc(100vh - 330px)" }}>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-primary-dark">
                <thead className="bg-gray-50 dark:bg-accent-dark sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-secondary-light uppercase tracking-wider">Company</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-secondary-light uppercase tracking-wider">Position</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-secondary-light uppercase tracking-wider">Location</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-secondary-light uppercase tracking-wider">Applied Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-secondary-light uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-secondary-light uppercase tracking-wider">Last Update</th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-secondary-dark divide-y divide-gray-200 dark:divide-primary-dark">
                  {filteredApplications.map((application) => (
                    <motion.tr 
                      key={application.id}
                      whileHover={{ scale: 1.005 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="hover:bg-gray-50 dark:hover:bg-accent-dark transition-all duration-150 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <CompanyLogo
                              src={application.companyLogo}
                              alt={application.company}
                              className="h-10 w-10 rounded-full"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-primary-light">{application.company}</div>
                            <div className="text-xs text-gray-500 dark:text-secondary-light">{application.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-primary-light">{application.position}</div>
                        <div className="text-xs text-gray-500 dark:text-secondary-light">{application.salary}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-secondary-light">{application.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-secondary-light">
                        {formatDate(application.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[application.status].color}`}>
                          {statusConfig[application.status].title}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-secondary-light">
                        {formatDate(application.lastUpdate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 dark:text-accent-light dark:hover:text-accent-light/80">
                          <EllipsisHorizontalIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="xl:col-span-1 space-y-6">
          <Card title="Status Distribution">
            <div className="h-64 flex items-center justify-center">
              <Doughnut 
                key={`status-chart-${isDark ? 'dark' : 'light'}`}
                ref={chartRef}
                data={generateChartData(applications)} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                          size: 11
                        },
                        color: isDark ? '#f3f4f6' : '#111827'
                      }
                    },
                  },
                  cutout: '70%',
                }} 
              />
            </div>
          </Card>

          <Card title="Status Breakdown">
            <div className="space-y-3">
              {Object.entries(statusConfig).map(([status, config]) => (
                <div 
                  key={status} 
                  className={`flex items-center justify-between p-3 rounded-lg ${config.lightColor} cursor-pointer hover:opacity-90 transition-opacity`}
                  onClick={() => setStatusFilter(status === statusFilter ? 'all' : status)}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      {config.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{config.title}</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{config.count}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard; 