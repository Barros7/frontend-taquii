"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import styles from './provider-layout.module.css';
import { MenuItem } from '@/types/admin';
import Link from 'next/link';

const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  const menuItems: MenuItem[] = [
    { path: '/admin/provider', label: 'Dashboard', icon: '📊' },
    { path: '/admin/provider/schedule', label: 'Agenda', icon: '📅' },
    { path: '/admin/provider/clients', label: 'Clientes', icon: '👥' },
    { path: '/admin/provider/services', label: 'Meus Serviços', icon: '🛠️' },
    { path: '/admin/provider/reports', label: 'Relatórios', icon: '📈' },
    { path: '/admin/provider/notifications', label: 'Notificações', icon: '🔔' },
    { path: '/admin/provider/profile', label: 'Perfil', icon: '👤' },
    { path: '/admin/provider/settings', label: 'Configurações', icon: '⚙️' },
  ];

  // Verificar se usuário é prestador
  if (!loading && (!user || user.userType !== 'PROVIDER')) {
    router.push('/login');
    return null;
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <ProtectedRoute allowedTypes={['PROVIDER']}>
      <div className={styles.providerLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Taqui Provider</h2>
        </div>
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Painel do Prestador</h1>
            <div className={styles.userInfo}>
              <span>Prestador</span>
            </div>
          </div>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
};

export default ProviderLayout; 