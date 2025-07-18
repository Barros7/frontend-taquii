import React from "react";
import Link from "next/link";
import styles from "./CallToActionSection.module.css";

const CallToActionSection: React.FC = () => {
  return (
    <section className={styles.ctaSection} aria-labelledby="cta-title">
      <div className={styles.ctaCard}>
        <h2 id="cta-title" className={styles.title}>
          Está a um clique do seu próximo serviço!
        </h2>
        <p className={styles.subtitle}>
          Encontre e agende serviços confiáveis em poucos segundos. Prático, seguro e feito para você.
        </p>
        <Link
          href="/agendar"
          className={styles.ctaButton}
          aria-label="Agendar agora"
        >
          Agendar agora
        </Link>
      </div>
    </section>
  );
};

export default CallToActionSection; 