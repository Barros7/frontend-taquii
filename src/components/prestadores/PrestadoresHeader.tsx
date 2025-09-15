'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './PrestadoresHeader.module.css';

export default function PrestadoresHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
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
                  Para Clientes
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="#vantagens" className={styles.menuLink}>
                  Vantagens
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="#como-funciona" className={styles.menuLink}>
                  Como Funciona
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="#testemunhos" className={styles.menuLink}>
                  Testemunhos
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="#faq" className={styles.menuLink}>
                  FAQ
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/prestadores/registro" className={styles.ctaButton}>
                  Criar Conta Grátis
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
} 