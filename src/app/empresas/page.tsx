// app/empresas/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/header/Header';
import ServiceCatalog from '@/components/service_catalog/ServiceCatalog';

function EmpresasContent() {
  const searchParams = useSearchParams();
  const categoryName = searchParams?.get('search') || '';
  const categoryDescription = "Descubra os melhores profissionais da área.";

  return (
    <div className="container-fluid bg-light min-vh-100">
      <Header />
      <ServiceCatalog
        categoryName={categoryName}
        categoryDescription={categoryDescription}
      />
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