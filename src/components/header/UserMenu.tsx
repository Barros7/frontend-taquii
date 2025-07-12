'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './UserMenu.module.css';
import { useAuth } from '@/context/AuthContext';

const UserMenu = () => {
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    // Redirecione se necessário, ex: window.location.href = '/login';
  };

  const getProfileLink = () => {
    if (!user) return '/login';
    
    switch (user.userType) {
      case 'ADMIN':
        return '/admin/sysadmin/profile';
      case 'PROVIDER':
        return '/admin/provider/profile';
      case 'CUSTOMER':
        return '/profile';
      default:
        return '/login';
    }
  };

  return (
    <div className={styles.userMenu}>
      {user ? (
        <div className={styles.loggedInMenu}>
          <button 
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {user.name}
          </button>
          
          {isMenuOpen && (
            <div className={styles.dropdownMenu}>
              <Link 
                href={getProfileLink()} 
                className={styles.menuItem}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-user"></i>
                Meu Perfil
              </Link>
              <button 
                className={styles.menuItem}
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i>
                Sair
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login" className={`${styles.button} ${styles.buttonPrimary}`}>
          Entrar
        </Link>
      )}
    </div>
  );
};

export default UserMenu; 