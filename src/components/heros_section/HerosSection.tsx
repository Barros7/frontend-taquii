'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './HerosSection.module.css';
import LaptopMockup from '../laptop_mockup/LaptopMockup';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Renderização para Mobile (apenas o laptop)
  if (isMobile) {
    return (
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.backgroundElements}>
            <div className={styles.gradientCircle1}></div>
            <div className={styles.gradientCircle2}></div>
            <div className={styles.floatingShape1}></div>
            <div className={styles.floatingShape2}></div>
          </div>

          <div className={styles.heroContent}>
            {/* Apenas o Laptop no centro */}
            <div className={`${styles.heroVisual} ${isVisible ? styles.fadeInRight : ''}`}>
              <LaptopMockup />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Renderização para Desktop (layout original)
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {/* Background Elements */}
        <div className={styles.backgroundElements}>
          <div className={styles.gradientCircle1}></div>
          <div className={styles.gradientCircle2}></div>
          <div className={styles.floatingShape1}></div>
          <div className={styles.floatingShape2}></div>
        </div>

        <div className={styles.heroContent}>
          {/* Left Column - Text Content */}
          <div className={`${styles.heroText} ${isVisible ? styles.fadeInUp : ''}`}>
            <h1 className={styles.heroTitle}>
              Agende e pague serviços em segundos — 
              <span className={styles.highlight}> sem complicação.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Encontre profissionais confiáveis e marque serviços diretamente pelo celular. 
              <span className={styles.bold}> Agendou cuida do resto.</span>
            </p>

            <div className={styles.heroFeatures}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🔍</div>
                <span>Encontre facilmente</span>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>📅</div>
                <span>Agende rapidamente</span>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>💳</div>
                <span>Pague com segurança</span>
              </div>
            </div>

            <div className={styles.ctaContainer}>
              <Link href="/register" className={styles.ctaButton}>
                <span>Comece agora — é fácil</span>
                <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <p className={styles.ctaSubtext}>
                Registo Gratuito • Sem cartão de crédito • 1 minuto para começar
              </p>
            </div>
          </div>

          {/* Right Column - Visual Content */}
          <div className={`${styles.heroVisual} ${isVisible ? styles.fadeInRight : ''}`}>
            <div className={styles.phoneMockup}>
              <div className={styles.phoneFrame}>
                <div className={styles.phoneScreen}>
                  <div className={styles.appHeader}>
                    <div className={styles.appLogo}>
                      <span className={styles.logoText}>Taqui</span>
                      <span className={styles.logoHighlight}>Serviço</span>
                    </div>
                  </div>
                  
                  <div className={styles.appContent}>
                    <div className={styles.searchBar}>
                      <div className={styles.searchIcon}>🔍</div>
                      <span>Buscar serviços...</span>
                    </div>
                    
                    <div className={styles.serviceCard}>
                      <div className={styles.serviceIcon}>💇‍♀️</div>
                      <div className={styles.serviceInfo}>
                        <div className={styles.serviceName}>Corte de Cabelo</div>
                        <div className={styles.servicePrice}>500 Kz</div>
                      </div>
                      <button className={styles.bookButton}>Agendar</button>
                    </div>

                    <div className={styles.serviceCard}>
                      <div className={styles.serviceIcon}>🏨</div>
                      <div className={styles.serviceInfo}>
                        <div className={styles.serviceName}>Hospedaria</div>
                        <div className={styles.servicePrice}>2.500 Kz</div>
                      </div>
                      <button className={styles.bookButton}>Agendar</button>
                    </div>

                    <div className={styles.paymentPreview}>
                      <div className={styles.paymentText}>Pagamento Seguro</div>
                      <div className={styles.paymentMethods}>
                        <span>💳</span>
                        <span>📱</span>
                        <span>🏦</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className={styles.floatingElement1}>
              <div className={styles.floatingIcon}>⭐</div>
              <span>4.9/5</span>
            </div>
            <div className={styles.floatingElement2}>
              <div className={styles.floatingIcon}>👥</div>
              <span>+10k clientes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
