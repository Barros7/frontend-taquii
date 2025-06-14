'use client';

import { useSession } from 'next-auth/react';
import { Spinner } from './Spinner';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

export function AuthStatus() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      toast.success(`Bem-vindo, ${session.user?.name}!`);
    } else if (status === 'unauthenticated') {
      toast.error('Sessão expirada. Por favor, faça login novamente.');
    }
  }, [status, session]);

  if (status === 'loading') {
    return (
      <div className="fixed top-0 left-0 w-full h-1">
        <div className="h-full bg-blue-500 animate-pulse"></div>
      </div>
    );
  }

  return null;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  
  if (status === 'unauthenticated') {
    window.location.href = '/login';
    return null;
  }
  
  return <>{children}</>;
}

export function RoleGuard({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { data: session } = useSession();
  
  if (!session?.user?.userType || !allowedRoles.includes(session.user.userType)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Acesso Negado
          </h2>
          <p className="text-gray-600">
            Você não tem permissão para acessar esta página.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
} 