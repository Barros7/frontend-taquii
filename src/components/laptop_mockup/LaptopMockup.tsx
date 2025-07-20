'use client';
import React from 'react';
import styles from './LaptopMockup.module.css';

const LaptopMockup: React.FC = () => {
  return (
    <div className={styles.laptopContainer}>
      <div className={styles.laptop}>
        {/* Tela do Laptop */}
        <div className={styles.screen}>
          <div className={styles.screenContent}>
            {/* Header da aplicação */}
            <div className={styles.appHeader}>
              <div className={styles.appLogo}>
                <span className={styles.logoText}>Taqui</span>
                <span className={styles.logoHighlight}>Serviço</span>
              </div>
              <div className={styles.headerActions}>
                <button className={styles.headerButton}>Entrar</button>
              </div>
            </div>

            {/* Hero Content */}
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
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
                  <button className={styles.ctaButton}>
                    <span>Comece agora — é fácil</span>
                    <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <p className={styles.ctaSubtext}>
                    Registo Gratuito • Sem cartão de crédito • 1 minuto para começar
                  </p>
                </div>
              </div>

              {/* Phone Mockup dentro da tela */}
              <div className={styles.phoneMockup}>
                <div className={styles.phoneFrame}>
                  <div className={styles.phoneScreen}>
                    <div className={styles.phoneHeader}>
                      <div className={styles.phoneLogo}>
                        <span className={styles.phoneLogoText}>Taqui</span>
                        <span className={styles.phoneLogoHighlight}>Serviço</span>
                      </div>
                    </div>
                    
                    <div className={styles.phoneContent}>
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
            </div>
          </div>
        </div>

        {/* Base do Laptop */}
        <div className={styles.base}>
          <div className={styles.trackpad}></div>
        </div>
      </div>
    </div>
  );
};

export default LaptopMockup; 