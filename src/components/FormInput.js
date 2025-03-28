import React from 'react';
import { motion } from 'framer-motion';

const FormInput = ({ 
  id, 
  name, 
  type = 'text', 
  label, 
  icon: Icon, 
  value, 
  onChange, 
  required = false,
  placeholder,
  autoComplete
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300 }}
          id={id}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default FormInput; 