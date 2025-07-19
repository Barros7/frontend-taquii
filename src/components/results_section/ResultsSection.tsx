import React from "react";
import styles from "./ResultsSection.module.css";

const ResultsSection: React.FC = () => {
  return (
    <section className={styles.resultsSection}>
      <h2 className={styles.title}>Números que falam por si</h2>
      <p className={styles.subtitle}>Milhares de pessoas já confiaram no Taqui para seus serviços</p>
      <div className={styles.resultsGrid}>
        <div className={styles.resultCard}>
          <h5 className={styles.resultTitle}>Clientes Satisfeitos</h5>
          <p className={styles.resultDesc}>Pessoas que encontraram o profissional ideal através da nossa plataforma.</p>
          <h3 className={styles.resultValue}>+2.500</h3>
        </div>
        <div className={styles.resultCard}>
          <h5 className={styles.resultTitle}>Agendamentos Realizados</h5>
          <p className={styles.resultDesc}>Serviços agendados com sucesso, economizando tempo e esforço.</p>
          <h3 className={styles.resultValue}>+8.000</h3>
        </div>
        <div className={styles.resultCard}>
          <h5 className={styles.resultTitle}>Profissionais Disponíveis</h5>
          <p className={styles.resultDesc}>Especialistas verificados prontos para atender você com qualidade.</p>
          <h3 className={styles.resultValue}>+150</h3>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
