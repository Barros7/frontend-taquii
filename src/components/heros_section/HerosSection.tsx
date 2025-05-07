'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/design-system.module.css';

const Hero: React.FC = () => {
  return (
    <section className={`${styles.container} ${styles.spacing5}`}>
      <div className={styles.row}>
        <div className={`${styles.col} ${styles.spacing3}`}>
          <h1 className={styles.heading1}>
            Conectando tecnologia & trabalho.
          </h1>
          <p className={styles.body1}>
            Feito para estabelecimentos que prezam pelo melhor para seus clientes.
          </p>
          <div className={styles.spacing3}>
            <Link href="/register" className={styles.buttonPrimary}>
              Registrar Meu Estabelecimento
            </Link>
          </div>
        </div>
        <div className={`${styles.col} ${styles.spacing3}`}>
          <div className={styles.card}>
            <Image
              height={500}
              width={500}
              src="/main.svg"
              alt="Ilustração de tecnologia e agendamento"
              className="img-fluid"
              priority
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
