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
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '28rem',
            width: '100%'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#dc3545',
              marginBottom: '1rem'
            }}>
              Oops! Algo deu errado
            </h2>
            <p style={{
              color: '#6c757d',
              marginBottom: '1.5rem'
            }}>
              {this.state.error?.message || 'Um erro inesperado ocorreu.'}
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <button
                onClick={this.handleRetry}
                style={{
                  backgroundColor: '#007bff',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  backgroundColor: '#6c757d',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#545b62'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
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