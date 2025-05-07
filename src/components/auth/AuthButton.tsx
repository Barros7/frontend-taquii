'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthButton: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Primeiro, fazer logout do NextAuth com callbackUrl
      await signOut({ 
        redirect: true,
        callbackUrl: '/'
      });

      // Chamar o endpoint de logout do backend
      await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Em caso de erro, forçar redirecionamento
      router.push('/');
    }
  };

  if (status === 'loading') {
    return (
      <button className="btn btn-outline-primary" disabled>
        Carregando...
      </button>
    );
  }

  if (session) {
    return (
      <button 
        onClick={handleLogout}
        className="btn btn-outline-danger"
      >
        Sair
      </button>
    );
  }

  return (
    <Link href="/login" className="btn btn-outline-primary">
      Entrar
    </Link>
  );
};

export default AuthButton; 