'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Oops! Algo deu errado
            </h2>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || 'Um erro inesperado ocorreu.'}
            </p>
            <div className="flex justify-between">
              <button
                onClick={this.handleRetry}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

export function handleApiError(error: Error) {
  console.error('API Error:', error);
  
  const message = error.message 
    || error.message 
    || 'Um erro inesperado ocorreu';
    
  toast.error(message);
  
  if (error.message === 'Unauthorized') {
    // Redirecionar para login após um breve delay
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  }
  
  return message;
} 