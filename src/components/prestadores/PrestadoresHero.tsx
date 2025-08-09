'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './PrestadoresHero.module.css';

export default function PrestadoresHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={styles.section}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientCircle1}></div>
        <div className={styles.gradientCircle2}></div>
        <div className={styles.floatingShape1}></div>
        <div className={styles.floatingShape2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.textContent} ${isVisible ? styles.fadeInUp : ''}`}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🚀</span>
              <span>Junte-se a +500 prestadores de serviços</span>
            </div>

            <h1 className={styles.title}>
              Transforme seu <span className={styles.highlight}>talento</span> em <span className={styles.highlight}>negócio</span> lucrativo
            </h1>

            <p className={styles.subtitle}>
              Conecte-se com milhares de clientes, gerencie seus serviços e <span className={styles.bold}>aumente sua renda</span> com a plataforma mais completa do mercado.
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✅</span>
                <span>Cadastro gratuito</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>💰</span>
                <span>Pagamentos seguros</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📱</span>
                <span>App completo</span>
              </div>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Prestadores ativos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10k+</span>
                <span className={styles.statLabel}>Serviços realizados</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4.8</span>
                <span className={styles.statLabel}>Avaliação média</span>
              </div>
            </div>

            <div className={styles.ctaContainer}>
              <Link href="/register" className={styles.primaryCta}>
                Começar Agora
                <span className={styles.arrowIcon}>→</span>
              </Link>
              
              <Link href="#como-funciona" className={styles.secondaryCta}>
                Como Funciona
              </Link>
              
              <p className={styles.ctaSubtext}>
                Cadastro gratuito • Sem taxas ocultas • Suporte 24/7
              </p>
            </div>
          </div>

          <div className={styles.visualContent}>
            <div className={styles.providerMockup}>
              <div className={styles.mockupHeader}>
                <div className={styles.mockupLogo}>T</div>
                <div className={styles.mockupTitle}>Dashboard do Prestador</div>
              </div>

              <div className={styles.mockupContent}>
                <div className={styles.mockupCard}>
                  <div className={styles.mockupCardTitle}>Receitas (30 dias)</div>
                  <div className={styles.chartBar}>
                    <div className={styles.bar} style={{height: '50%'}}></div>
                    <div className={styles.bar} style={{height: '70%'}}></div>
                    <div className={styles.bar} style={{height: '40%'}}></div>
                    <div className={styles.bar} style={{height: '85%'}}></div>
                    <div className={styles.bar} style={{height: '60%'}}></div>
                    <div className={styles.bar} style={{height: '90%'}}></div>
                    <div className={styles.bar} style={{height: '65%'}}></div>
                  </div>
                </div>

                <div className={styles.mockupGrid}>
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Novos Clientes</span>
                    <span className={styles.kpiValue}>+48</span>
                  </div>
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Agendamentos</span>
                    <span className={styles.kpiValue}>72</span>
                  </div>
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Ticket Médio</span>
                    <span className={styles.kpiValue}>Kz 6.200</span>
                  </div>
                </div>
              </div>

              <div className={styles.testimonialPreview}>
                <div className={styles.testimonialText}>
                  &ldquo;Minha carteira de clientes cresceu 3x em 2 meses usando o Taqui.&rdquo;
                </div>
                <div className={styles.cardStats}>
                  <span>⭐ 4.9</span>
                  <span>• 127 avaliações</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Role para saber mais</span>
          <div className={styles.scrollDot}></div>
        </div>
      </div>
    </section>
  );
} 