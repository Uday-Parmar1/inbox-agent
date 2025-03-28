import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  title, 
  className = '', 
  children, 
  delay = 0,
  noAnimation = false,
  headerActions
}) => {
  const containerProps = noAnimation 
    ? {} 
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay },
        whileHover: { y: -5 },
      };

  const Container = noAnimation ? 'div' : motion.div;

  return (
    <Container
      {...containerProps}
      className={`bg-white dark:bg-primary-dark rounded-lg shadow overflow-hidden ${className}`}
    >
      {title && (
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-dark flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-primary-light">{title}</h3>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">
        {children}
      </div>
    </Container>
  );
};

export default Card; 