// app/empresas/page.tsx
'use client'; // Mantém como Client Component porque usa hooks de cliente

import { useSearchParams } from 'next/navigation'; // Importa o hook
import Header from '@/components/header/Header';
import ServiceCatalog from '@/components/service_catalog/ServiceCatalog';

export default function EmpresasPage() {
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