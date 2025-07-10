'use client';

import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components/Spinner';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

export function AuthStatus() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      toast.success(`Bem-vindo, ${user.name}!`);
    } else {
      toast.error('Sessão expirada. Por favor, faça login novamente.');
    }
  }, [user]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-1">
        <Spinner />
      </div>
    );
  }

  if (!user) return null;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  if (!user) {
    return <div>Você precisa estar autenticado para acessar esta página.</div>;
  }
  return <>{children}</>;
}

export function RoleGuard({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  if (!user || !allowedRoles.includes(user.userType)) {
    return <div>Acesso não autorizado.</div>;
  }
  return <>{children}</>;
} 