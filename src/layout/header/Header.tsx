'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import UserMenu from '@/components/header/UserMenu';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Taqui
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/services" className={styles.navLink}>
            Serviços
          </Link>
          <Link href="/providers" className={styles.navLink}>
            Profissionais
          </Link>
          <Link href="/about" className={styles.navLink}>
            Sobre
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Contato
          </Link>
        </nav>

        <UserMenu />
      </div>
    </header>
  );
};

export default Header; 