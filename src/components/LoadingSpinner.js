import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = ({ message = 'Generating data...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  };

  return (
    <div className="loading-spinner d-flex flex-column align-items-center justify-content-center p-4">
      <div className={`spinner-border ${sizeClasses[size]} text-primary mb-3`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted mb-0">{message}</p>
      <div className="progress mt-3" style={{ width: '200px' }}>
        <div 
          className="progress-bar progress-bar-striped progress-bar-animated" 
          role="progressbar" 
          style={{ width: '100%' }}
          aria-valuenow="100" 
          aria-valuemin="0" 
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export const InlineSpinner = ({ size = 'sm' }) => {
  return (
    <FaSpinner className={`spinner-border-${size} text-primary me-2`} />
  );
};

export default LoadingSpinner;