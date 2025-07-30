'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={isLoggingOut}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: isLoggingOut ? 'not-allowed' : 'pointer',
        opacity: isLoggingOut ? 0.7 : 1,
        transition: 'background-color 0.3s ease',
        fontSize: '0.9rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
      onMouseEnter={(e) => {
        if (!isLoggingOut) {
          e.currentTarget.style.backgroundColor = '#c0392b';
        }
      }}
      onMouseLeave={(e) => {
        if (!isLoggingOut) {
          e.currentTarget.style.backgroundColor = '#e74c3c';
        }
      }}
    >
      <span style={{ fontSize: '1rem' }}>🚪</span>
      {isLoggingOut ? 'Saindo...' : 'Sair'}
    </button>
  );
};

export default LogoutButton; 