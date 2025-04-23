"use client"
import Banner from '@/components/banner/Banner';
import ServicesSection from '@/components/company_profile/CompanyProfile';
import Header from '@/components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
  return (
    <div className="container-fluid bg-light min-vh-100">
      <Header />
      <Banner />
      <ServicesSection />
    </div>
  );
}
