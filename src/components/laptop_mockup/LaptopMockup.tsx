'use client';
import React from 'react';
import styles from './LaptopMockup.module.css';

const LaptopMockup: React.FC = () => {
  return (
    <div className={styles.mobileHeroContainer}>
      {/* Hero Content Mobile */}
      <div className={styles.mobileHeroContent}>
        {/* Main Headline */}
        <div className={styles.mobileHeadline}>
          <h1 className={styles.mobileTitle}>
            Agende e pague serviços em
            <span className={styles.mobileTitleHighlight}> segundos</span>
          </h1>
        </div>

        {/* Value Proposition */}
        <div className={styles.mobileValueProp}>
          <p className={styles.mobileSubtitle}>
            Encontre profissionais e empresas confiáveis e marque serviços diretamente pelo celular. 
            <strong> Taqui Serviços, cuida do resto.</strong>
          </p>
        </div>

        {/* Key Benefits */}
        <div className={styles.mobileBenefits}>
          <div className={styles.mobileBenefitItem}>
            <div className={styles.mobileBenefitIcon}>🔍</div>
            <span className={styles.mobileBenefitText}>Encontre facilmente</span>
          </div>
          <div className={styles.mobileBenefitItem}>
            <div className={styles.mobileBenefitIcon}>📅</div>
            <span className={styles.mobileBenefitText}>Agende rapidamente</span>
          </div>
          <div className={styles.mobileBenefitItem}>
            <div className={styles.mobileBenefitIcon}>💳</div>
            <span className={styles.mobileBenefitText}>Pague com segurança</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopMockup; 