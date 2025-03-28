import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  inverseColors = false,
  delay = 0
}) => {
  // Determine color based on change type and inverseColors setting
  const getColorClass = () => {
    // For cases where increase is good (default)
    if (!inverseColors) {
      return changeType === 'increase' 
        ? 'text-green-600 dark:text-green-500' 
        : 'text-red-600 dark:text-red-500';
    } 
    // For cases where decrease is good (like "Rejections" or "Pending Responses")
    else {
      return changeType === 'decrease' 
        ? 'text-green-600 dark:text-green-500' 
        : 'text-red-600 dark:text-red-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-lg bg-white dark:bg-primary-dark px-4 py-5 shadow sm:px-6 sm:py-6"
    >
      <dt>
        <div className="absolute rounded-md bg-indigo-500 p-3">
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-secondary-light">{title}</p>
      </dt>
      <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900 dark:text-primary-light">{value}</p>
        <p className={`ml-2 flex items-center text-sm font-semibold ${getColorClass()}`}>
          {change}
          {changeType === 'increase' ? (
            <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center" aria-hidden="true" />
          ) : (
            <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center" aria-hidden="true" />
          )}
        </p>
      </dd>
    </motion.div>
  );
};

export default StatCard; 