'use client';

import Link from 'next/link';
import styles from './CtaReforcada.module.css';

export default function CtaReforcada() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              Pronto para crescer com o <span className={styles.highlight}>Taqui Serviço</span>?
            </h2>
            
            <p className={styles.subtitle}>
              Junte-se a centenas de prestadores que já estão aumentando seus ganhos e organizando melhor seus negócios. 
              Comece hoje mesmo e veja a diferença em poucas semanas.
            </p>

            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>✓</div>
                <span>Registro 100% gratuito</span>
              </div>
              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>✓</div>
                <span>Comece a receber clientes hoje</span>
              </div>
              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>✓</div>
                <span>Suporte especializado</span>
              </div>
            </div>

            <div className={styles.ctaGroup}>
              <Link href="/register" className={styles.primaryCta}>
                <span>Criar minha conta gratuita</span>
                <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              
              <p className={styles.ctaNote}>
                Não precisa de cartão de crédito • Sem compromisso • Cancele quando quiser
              </p>
            </div>
          </div>

          <div className={styles.visualContent}>
            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>+500</div>
                <div className={styles.statLabel}>Prestadores ativos</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>+10k</div>
                <div className={styles.statLabel}>Agendamentos</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>4.8★</div>
                <div className={styles.statLabel}>Avaliação média</div>
              </div>
            </div>

            <div className={styles.guaranteeCard}>
              <div className={styles.guaranteeIcon}>🛡️</div>
              <h3>Garantia de 30 dias</h3>
              <p>Se não estiver satisfeito, devolvemos 100% do seu dinheiro</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.backgroundDecoration}>
        <div className={styles.decorationCircle}></div>
        <div className={styles.decorationCircle}></div>
        <div className={styles.decorationCircle}></div>
      </div>
    </section>
  );
} 