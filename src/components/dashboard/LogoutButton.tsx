'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Primeiro, fazer logout do NextAuth com callbackUrl
      await signOut({ 
        redirect: true,
        callbackUrl: '/'
      });

      // Chamar o endpoint de logout do backend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Em caso de erro, forçar redirecionamento
      router.push('/');
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="btn btn-danger"
    >
      <i className="fas fa-sign-out-alt me-2"></i>
      Sair
    </button>
  );
};

export default LogoutButton; 