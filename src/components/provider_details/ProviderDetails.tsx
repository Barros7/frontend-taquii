import Image from 'next/image';
import React, { useState } from 'react';
import styles from './ProviderProfile.module.css';
import ServicesSection from '../company_profile/CompanyProfile';
import AboutSection from '../about_section/AboutSection';
import GallerySection from '../galary_section/GallerySection';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  title: string;
  duration: number;
  status: 'Disponível' | 'Indisponível';
  description: string;
  price: number;
  averageRating?: number;
  providerId: string;
}

interface IProviderDetails {
  provider: {
    id: string;
    name: string;
    profileImage: string;
    galleryImages?: { id: string; imageUrl: string; }[];
    addresses?: { city: string; country: string; }[];
    services?: {
      id: string;
      title: string;
      duration: number;
      status: 'Disponível' | 'Indisponível';
      description: string;
      price: number;
      averageRating?: number;
    }[];
    category?: string;
    rating?: number;
    schedule?: string;
    phone?: string;
    email?: string;
  };
}

const DUMMY_SCHEDULE = 'Seg-Sex: 08h-18h, Sáb: 08h-12h';
const DUMMY_PHONE = '+244 123 456 789';
const DUMMY_EMAIL = 'joao.silva@email.com';

export const ProviderDetails: React.FC<IProviderDetails> = ({ provider }) => {
  const [activeTab, setActiveTab] = useState<'servicos' | 'galeria' | 'sobre' | 'contato'>('servicos');
  const router = useRouter();

  const servicesWithProviderId: Service[] = (provider.services ?? []).map(service => ({
    ...service,
    providerId: provider.id,
  }));

  const handleBack = () => router.back();
  const handleAgendar = () => router.push(`/agendar/${provider.id}`);
  const handleCall = () => window.open(`tel:+244937315418`);

  return (
    <div>
      {/* HEADER */}
      <div className={styles.profileHeader}>
        <button className={styles.backButton} onClick={handleBack} title="Voltar">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className={styles.headerInfo}>
          <Image
            src={provider.profileImage || '/avatar.png'}
            alt={provider.name}
            width={110}
            height={110}
            className={styles.avatar}
          />
          <div className={styles.name}>{provider.name}</div>
          <div className={styles.rating}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.round(provider.rating ?? provider.services?.[0]?.averageRating ?? 4.8) ? '★' : '☆'}</span>
            ))}
            <span style={{ color: '#fff', marginLeft: 4 }}>{(provider.rating ?? provider.services?.[0]?.averageRating ?? 4.8).toFixed(1)}</span>
          </div>
          <div className={styles.address}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {provider.addresses?.[0]?.city}, {provider.addresses?.[0]?.country}
          </div>
          <div className={styles.schedule}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            {provider.schedule || DUMMY_SCHEDULE}
          </div>
          <div className={styles.headerActions}>
            <button className={styles.actionBtn} onClick={handleAgendar}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 17l4 4 4-4m-4-5v9"/></svg>
              Agendar Serviço
            </button>
            <button className={styles.actionBtn} onClick={handleCall}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.28a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.05.35 2.15.59 3.28.72A2 2 0 0 1 21 18.91z"/></svg>
              Ligar
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <nav className={styles.tabsNav}>
        <button className={`${styles.tabBtn} ${activeTab === 'servicos' ? styles.active : ''}`} onClick={() => setActiveTab('servicos')}>Serviços</button>
        <button className={`${styles.tabBtn} ${activeTab === 'galeria' ? styles.active : ''}`} onClick={() => setActiveTab('galeria')}>Galeria</button>
        <button className={`${styles.tabBtn} ${activeTab === 'sobre' ? styles.active : ''}`} onClick={() => setActiveTab('sobre')}>Sobre</button>
        <button className={`${styles.tabBtn} ${activeTab === 'contato' ? styles.active : ''}`} onClick={() => setActiveTab('contato')}>Contato</button>
      </nav>

      {/* TABS CONTENT */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem' }}>
        {activeTab === 'servicos' && (
          <ServicesSection items={servicesWithProviderId} />
        )}
        {activeTab === 'galeria' && (
          <GallerySection items={(provider.galleryImages ?? []).map(img => ({ ...img, caption: '' }))} />
        )}
        {activeTab === 'sobre' && (
          <AboutSection
            title={`Sobre ${provider.name}`}
            description={`Profissional da categoria ${provider.category || 'Serviço'} com experiência e dedicação. Atendimento de qualidade e foco no cliente.`}
            imageUrl={provider.profileImage || '/avatar.png'}
            imageAlt={provider.name}
            additionalInfo={[
              'Rating: 4.8 estrelas',
              'Endereço: ' + (provider.addresses?.[0]?.city || 'Cidade') + ', ' + (provider.addresses?.[0]?.country || 'País'),
              'Horários: ' + (provider.schedule || DUMMY_SCHEDULE),
            ]}
          />
        )}
        {activeTab === 'contato' && (
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(79,70,229,0.06)', padding: '2rem', maxWidth: 500, margin: '2rem auto' }}>
            <h4 style={{ color: '#4F46E5', fontWeight: 700, marginBottom: 16 }}>Contato</h4>
            <div style={{ marginBottom: 12 }}>
              <strong>Telefone:</strong> <a href={`tel:${provider.phone || DUMMY_PHONE}`} style={{ color: '#4F46E5', textDecoration: 'none' }}>{provider.phone || DUMMY_PHONE}</a>
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Email:</strong> <a href={`mailto:${provider.email || DUMMY_EMAIL}`} style={{ color: '#4F46E5', textDecoration: 'none' }}>{provider.email || DUMMY_EMAIL}</a>
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Endereço:</strong> {provider.addresses?.[0]?.city}, {provider.addresses?.[0]?.country}
            </div>
            <div>
              <strong>Horários:</strong> {provider.schedule || DUMMY_SCHEDULE}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};