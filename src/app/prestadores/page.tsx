import React from 'react';
import PrestadoresHeader from '@/components/prestadores/PrestadoresHeader';
import PrestadoresHero from '@/components/prestadores/PrestadoresHero';
import PropostaValor from '@/components/prestadores/PropostaValor';
import ComoFunciona from '@/components/prestadores/ComoFunciona';
import Testemunhos from '@/components/prestadores/Testemunhos';
import CtaReforcada from '@/components/prestadores/CtaReforcada';
import FaqPrestadores from '@/components/prestadores/FaqPrestadores';
import styles from './prestadores.module.css';



export default function PrestadoresPage() {
  return (
    <div className={styles.pageContainer}>
      <PrestadoresHeader />
      <main>
        <PrestadoresHero />
        <PropostaValor />
        <ComoFunciona />
        <Testemunhos />
        <CtaReforcada />
        <FaqPrestadores />
      </main>
    </div>
  );
} 