import React from "react";
import styles from "./ResultsSection.module.css";

const ResultsSection: React.FC = () => {
  return (
    <section className={styles.resultsSection}>
      <h2 className={styles.title}>Resultados</h2>
      <p className={styles.subtitle}>Veja como o Taqui vem crescendo</p>
      <div className={styles.resultsGrid}>
        <div className={styles.resultCard}>
          <h5 className={styles.resultTitle}>Utilizadores</h5>
          <p className={styles.resultDesc}>Total de utilizadores ativos em nossa plataforma.</p>
          <h3 className={styles.resultValue}>35</h3>
        </div>
        <div className={styles.resultCard}>
          <h5 className={styles.resultTitle}>Agendamentos</h5>
          <p className={styles.resultDesc}>Total de agendamentos marcados.</p>
          <h3 className={styles.resultValue}>+50</h3>
        </div>
        <div className={styles.resultCard}>
          <h5 className={styles.resultTitle}>Empresas Registadas</h5>
          <p className={styles.resultDesc}>Empresas que confiam nos nossos serviços.</p>
          <h3 className={styles.resultValue}>+20</h3>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
