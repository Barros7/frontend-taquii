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
                <div className={styles.mockupTitle}>Taqui Serviço</div>
              </div>

              <div className={styles.mockupContent}>
                <div className={styles.mockupCard}>
                  <div className={styles.mockupCardTitle}>Ganhos do Mês</div>
                  <div className={styles.mockupCardValue}>R$ 3.250</div>
                </div>
                
                <div className={styles.mockupCard}>
                  <div className={styles.mockupCardTitle}>Serviços Realizados</div>
                  <div className={styles.mockupCardValue}>24</div>
                </div>
              </div>

              <div className={styles.testimonialPreview}>
                <div className={styles.testimonialText}>
                  &ldquo;A plataforma revolucionou meu negócio. Agora tenho clientes fixos e minha renda triplicou!&rdquo;
                </div>
                
                <div className={styles.testimonialAuthor}>
                  <div className={styles.avatar}>M</div>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>Maria Silva</div>
                    <div className={styles.authorRole}>Cabeleireira</div>
                  </div>
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