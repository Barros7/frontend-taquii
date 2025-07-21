'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';

const AuthButton: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Fazer logout usando o contexto próprio
      await logout();
      
      // Redirecionar para a página inicial
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Em caso de erro, forçar redirecionamento
      router.push('/');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (user) {
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