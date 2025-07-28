import { useState, useEffect } from 'react';

interface UseAutoClearErrorOptions {
  duration?: number;
  autoClear?: boolean;
}

export const useAutoClearError = (options: UseAutoClearErrorOptions = {}) => {
  const { duration = 5000, autoClear = true } = options;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error && autoClear) {
      const timer = setTimeout(() => {
        setError(null);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [error, duration, autoClear]);

  const clearError = () => setError(null);
  const setErrorWithAutoClear = (errorMessage: string | null) => setError(errorMessage);

  return {
    error,
    setError: setErrorWithAutoClear,
    clearError
  };
}; 