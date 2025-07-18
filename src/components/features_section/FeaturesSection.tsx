import React from "react";
import styles from "./FeaturesSection.module.css";

const FeatureSection: React.FC = () => {
  return (
    <section className={styles.featuresWrapper}>
      <h2 className={styles.title}>Tudo em um só lugar</h2>
      <p className={styles.subtitle}>Uma plataforma focada no controle total do estabelecimento</p>
      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <span className={styles.icon}>💬</span>
          <h5 className={styles.featureTitle}>Notificações</h5>
          <p className={styles.featureDesc}>
            Mantenha sempre seus clientes avisados sobre seus agendamentos. Evitando assim faltas e possíveis prejuízos.
          </p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.icon}>👥</span>
          <h5 className={styles.featureTitle}>Funcionários</h5>
          <p className={styles.featureDesc}>
            Gerencie comissão, horários, serviços e férias de seus funcionários. Tenha estatísticas de performance ao fim do mês.
          </p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.icon}>⏰</span>
          <h5 className={styles.featureTitle}>Horários</h5>
          <p className={styles.featureDesc}>
            Configure facilmente os horários da sua semana, adicione férias/descansos, dias disponíveis na agenda e muito mais.
          </p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.icon}>✏️</span>
          <h5 className={styles.featureTitle}>Personalize seu perfil</h5>
          <p className={styles.featureDesc}>
            Mostre todos os seus serviços, configure um perfil personalizado para sua empresa e atraia ainda mais clientes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
