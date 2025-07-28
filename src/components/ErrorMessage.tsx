'use client';

import React, { useState, useEffect } from 'react';

interface ErrorMessageProps {
  error: string | null;
  onClear?: () => void;
  className?: string;
  autoHide?: boolean;
  duration?: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  error, 
  onClear, 
  className = '', 
  autoHide = true, 
  duration = 5000 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      
      if (autoHide) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          if (onClear) {
            onClear();
          }
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [error, autoHide, duration, onClear]);

  if (!error || !isVisible) {
    return null;
  }

  return (
    <div 
      className={`error-message ${className}`}
      style={{
        background: '#dc2626',
        color: '#fff',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '16px',
        fontSize: '14px',
        lineHeight: '1.4'
      }}
    >
      {error}
    </div>
  );
};

export default ErrorMessage; 