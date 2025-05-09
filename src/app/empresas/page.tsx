"use client"
import Header from '@/components/header/Header';
import ServiceCatalog from '@/components/service_catalog/ServiceCatalog';

export default function HomePage() {
  return (
    <div className="container-fluid bg-light min-vh-100">
      <Header />
      <ServiceCatalog />
    </div>
  );
}
