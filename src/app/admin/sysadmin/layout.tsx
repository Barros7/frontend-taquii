"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import styles from './sysadmin.module.css';
import { MenuItem } from '@/types/admin';
import Link from 'next/link';
import LogoutButton from '@/components/dashboard/LogoutButton';

export default function SysAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { path: '/admin/sysadmin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/sysadmin/appointements', label: 'Agendamentos', icon: '📅' },
    { path: '/admin/sysadmin/services', label: 'Serviços', icon: '🛠️' },
    { path: '/admin/sysadmin/users', label: 'Usuários', icon: '👥' },
    { path: '/admin/sysadmin/payments', label: 'Pagamentos', icon: '💰' },
    { path: '/admin/sysadmin/reports', label: 'Relatórios', icon: '📈' },
    { path: '/admin/sysadmin/configs', label: 'Configurações', icon: '⚙️' },
    { path: '/admin/sysadmin/notifications', label: 'Notificações', icon: '🔔' },
    { path: '/admin/sysadmin/logs', label: 'Logs', icon: '📝' },
    { path: '/admin/sysadmin/support', label: 'Suporte', icon: '❓' },
  ];

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Taqui Admin</h2>
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
            <h1>Painel Administrativo</h1>
            <div className={styles.userInfo}>
              <span>Administrador</span>
              <LogoutButton />
            </div>
          </div>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
} 