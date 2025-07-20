import React from "react";
import styles from "./FeaturesSection.module.css";

const FeatureSection: React.FC = () => {
  return (
    <section className={styles.featuresWrapper}>
      <h2 className={styles.title}>Por que escolher o Taqui Serviço?</h2>
      <p className={styles.subtitle}>Descubra como tornamos o agendamento de serviços simples, rápido e seguro</p>
      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <span className={styles.icon}>⚡</span>
          <h5 className={styles.featureTitle}>Agendamento em segundos</h5>
          <p className={styles.featureDesc}>
            Encontre e reserve seu horário em menos de 30 segundos. Sem ligações, sem esperas, sem complicações.
          </p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.icon}>🛡️</span>
          <h5 className={styles.featureTitle}>Profissionais verificados</h5>
          <p className={styles.featureDesc}>
            Todos os prestadores de serviço são cuidadosamente selecionados e avaliados por nossa comunidade.
          </p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.icon}>📱</span>
          <h5 className={styles.featureTitle}>Lembretes automáticos</h5>
          <p className={styles.featureDesc}>
            Receba notificações no WhatsApp e email para nunca mais esquecer de um compromisso importante.
          </p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.icon}>⭐</span>
          <h5 className={styles.featureTitle}>Avaliações reais</h5>
          <p className={styles.featureDesc}>
            Veja comentários de clientes reais e escolha o profissional ideal para você com total confiança.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
