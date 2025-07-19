import React from "react";
import Link from "next/link";
import styles from "./CallToActionSection.module.css";

const CallToActionSection: React.FC = () => {
  return (
    <section className={styles.ctaSection} aria-labelledby="cta-title">
      <div className={styles.ctaCard}>
        <h2 id="cta-title" className={styles.title}>
          Pronto para simplificar sua vida?
        </h2>
        <p className={styles.subtitle}>
          Junte-se a milhares de pessoas que já descobriram a forma mais fácil de agendar serviços. 
          Sem complicações, sem esperas, apenas resultados.
        </p>
        <Link
          href="/register"
          className={styles.ctaButton}
          aria-label="Começar agora - é grátis"
        >
          Começar agora - é grátis
        </Link>
      </div>
    </section>
  );
};

export default CallToActionSection; 