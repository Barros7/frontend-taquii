"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import styles from './provider.module.css';
import { MenuItem } from '@/types/admin';
import Link from 'next/link';

const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

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

  return (
    <div className={styles.adminLayout}>
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
  );
};

export default ProviderLayout; 