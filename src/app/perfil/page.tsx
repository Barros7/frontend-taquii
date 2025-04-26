"use client"
import { Banner } from '@/components/banner/Banner';
import Header from '@/components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
  return (
    <div className="container-fluid bg-light min-vh-100 m-0 p-0">
      <Header />
      <Banner />
    </div>
  );
}
