// app/empresas/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/header/Header';
import ServiceCatalog from '@/components/service_catalog/ServiceCatalog';
import styles from './Empresas.module.css';

function EmpresasContent() {
  const searchParams = useSearchParams();
  const categoryName = searchParams?.get('search') || '';
  const categoryDescription = "Descubra os melhores profissionais da área.";

  return (
    <div className={styles.empresasWrapper}>
      <Header />
      <div className={styles.catalogContainer}>
        <ServiceCatalog
          categoryName={categoryName}
          categoryDescription={categoryDescription}
        />
      </div>
    </div>
  );
}

export default function EmpresasPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EmpresasContent />
    </Suspense>
  );
}