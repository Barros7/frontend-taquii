'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/design-system.module.css';
import UserMenu from './UserMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
          <Link href="/" className={styles.brand} aria-label="Página inicial Taqui Serviço">
            <span className={styles.logoText}>Taqui <span className={styles.logoHighlight}>Serviço</span></span>
          </Link>

          <button 
            className={styles.menuToggle} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={styles.menuIcon} />
          </button>

          <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Link href="/" className={styles.menuLink}>
                  Home
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/#sobre" className={styles.menuLink}>
                  Sobre
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/#contatos" className={styles.menuLink}>
                  Contacto
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/#como-funciona" className={styles.menuLink}>
                  Como funciona
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/prestadores" className={styles.menuLink}>
                  Para Prestadores
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/#faqs" className={styles.menuLink}>
                  FAQs
                </Link>
              </li>
              <li className={styles.menuItem}>
                <UserMenu />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}