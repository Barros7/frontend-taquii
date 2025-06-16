'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (error) {
      console.error('Error during logout:', error);
      // Fallback to just signOut if the API call fails
      await signOut({ redirect: true, callbackUrl: '/' });
    }
  };

  const getProfileLink = () => {
    if (!session?.user) return '/login';
    
    switch (session.user.userType) {
      case 'ADMIN':
        return '/admin/sysadmin/profile';
      case 'PROVIDER':
        return '/admin/provider/profile';
      case 'CLIENT':
        return '/profile';
      default:
        return '/login';
    }
  };

  if (status === 'loading') {
    return (
      <div className={styles.userMenu}>
        <button className={`${styles.button} ${styles.buttonPrimary}`} disabled>
          Carregando...
        </button>
      </div>
    );
  }

  return (
    <div className={styles.userMenu}>
      {session?.user ? (
        <div className={styles.loggedInMenu}>
          <button 
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {session.user.name}
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