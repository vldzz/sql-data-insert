import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-boundary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-danger">
              <div className="card-header bg-danger text-white">
                <h4 className="mb-0">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Something went wrong
                </h4>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  An error occurred while processing your request. Please try refreshing the page or contact support if the problem persists.
                </p>
                {process.env.NODE_ENV === 'development' && (
                  <details className="mt-3">
                    <summary className="text-danger">Error Details</summary>
                    <pre className="bg-light p-3 mt-2 rounded">
                      <code>{error.message}</code>
                    </pre>
                  </details>
                )}
                <div className="mt-3">
                  <button 
                    className="btn btn-primary me-2" 
                    onClick={resetErrorBoundary}
                  >
                    Try Again
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => window.location.reload()}
                  >
                    Refresh Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};