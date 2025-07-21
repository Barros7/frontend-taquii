import Image from 'next/image';
import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { FaArrowLeft, FaPhoneAlt, FaStar, FaCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Mock data fallback
const mockProvider = {
  name: 'João Silva',
  profileImage: '/barber.webp',
  category: 'Barbeiro',
  rating: 4.8,
  address: 'Benguela, Centro',
  schedule: 'Seg-Sex: 08h-18h',
  phone: '+244 123 456 789',
  email: 'joao.silva@email.com',
  galleryImages: [
    { id: '1', imageUrl: '/photo.jpg' },
    { id: '2', imageUrl: '/barber.webp' },
    { id: '3', imageUrl: '/beauty.png' },
    { id: '4', imageUrl: '/petshops.webp' },
    { id: '5', imageUrl: '/main.svg' },
    { id: '6', imageUrl: '/logo/j2b_code_logo.png' },
  ],
  services: [
    { id: '1', title: 'Corte Masculino', description: 'Corte clássico e moderno', price: 5000, imageUrlService: '/barber.webp' },
    { id: '2', title: 'Barba Completa', description: 'Barba desenhada e aparada', price: 7000, imageUrlService: '/beauty.png' },
    { id: '3', title: 'Tratamento Capilar', description: 'Hidratação e revitalização', price: 15000, imageUrlService: '/photo.jpg' },
  ],
};

const TABS = [
  { key: 'servicos', label: 'Serviços' },
  { key: 'galeria', label: 'Galeria' },
  { key: 'sobre', label: 'Sobre' },
  { key: 'contato', label: 'Contato' },
];

export const ProviderDetails = ({ provider }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('servicos');
  const [modalImg, setModalImg] = useState(null);
  const data = provider || mockProvider;

  // Header
  const HeaderSection = () => (
    <div style={{
      background: 'linear-gradient(90deg, #4F46E5 0%, #6366f1 100%)',
      borderRadius: '0 0 24px 24px',
      padding: '2rem 1rem 1.5rem 1rem',
      color: '#fff',
      position: 'relative',
      marginBottom: 32,
      boxShadow: '0 4px 24px rgba(79,70,229,0.10)'
    }}>
      <button onClick={() => router.back()} style={{
        position: 'absolute', left: 24, top: 24, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }} aria-label="Voltar">
        <FaArrowLeft size={20} />
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Image src={data.profileImage} alt={data.name} width={96} height={96} style={{ borderRadius: '50%', border: '4px solid #fff', objectFit: 'cover', boxShadow: '0 2px 12px rgba(79,70,229,0.13)' }} />
        <h2 style={{ fontWeight: 800, fontSize: 28, margin: 0 }}>{data.name}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18 }}>
          <span style={{ color: '#ffd700' }}><FaStar /></span>
          <span style={{ fontWeight: 700 }}>{data.rating}</span>
          <span style={{ fontSize: 15, color: '#ede9fe' }}>({provider?.services?.[0]?.averageRating ? provider.services[0].averageRating : '127'} avaliações)</span>
        </div>
        <div style={{ color: '#ede9fe', fontSize: 16 }}>{data.category || 'Profissional'} • {data.address || 'Endereço'}</div>
        <div style={{ color: '#ede9fe', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FaCalendarAlt /> <span>{data.schedule}</span>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
          <button style={{ background: '#fff', color: '#4F46E5', border: 'none', borderRadius: 999, padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: 16, boxShadow: '0 2px 12px rgba(79,70,229,0.13)', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => router.push(`/agendar/${data.services?.[0]?.id || 1}`)}>
            <FaCalendarAlt /> Agendar Serviço
          </button>
          <a href={`tel:${data.phone}`} style={{ background: 'linear-gradient(90deg, #4F46E5 0%, #6366f1 100%)', color: '#fff', border: 'none', borderRadius: 999, padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: 16, boxShadow: '0 2px 12px rgba(79,70,229,0.13)', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textDecoration: 'none', transition: 'background 0.2s' }}>
            <FaPhoneAlt /> Ligar
          </a>
        </div>
      </div>
    </div>
  );

  // Tabs
  const Tabs = () => (
    <nav style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(79,70,229,0.06)', margin: '0 auto 2rem auto', maxWidth: 900, padding: 0 }}>
      <ul style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none', height: 56 }}>
        {TABS.map(tab => (
          <li key={tab.key} style={{ flex: 1, textAlign: 'center', height: '100%' }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === tab.key ? '#4F46E5' : '#222',
                fontWeight: activeTab === tab.key ? 700 : 500,
                fontSize: 17,
                height: '100%',
                width: '100%',
                borderBottom: activeTab === tab.key ? '3px solid #4F46E5' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'color 0.2s, border 0.2s',
                outline: 'none',
              }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  // Serviços
  const ServicesTab = () => (
    <div className="container py-4">
      <div className="row g-4">
        {data.services.map((service, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={service.id}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(79,70,229,0.06)', padding: 20, transition: 'box-shadow 0.2s, transform 0.18s', cursor: 'pointer', minHeight: 220, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', border: '2px solid transparent' }}
              onMouseOver={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(79,70,229,0.13)'; e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)'; e.currentTarget.style.border = '2px solid #4F46E5'; }}
              onMouseOut={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(79,70,229,0.06)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.border = '2px solid transparent'; }}
            >
              <Image src={service.imageUrlService || '/barber.webp'} alt={service.title} width={80} height={80} style={{ borderRadius: 12, objectFit: 'cover', marginBottom: 8 }} />
              <h5 style={{ fontWeight: 700, color: '#222', margin: 0 }}>{service.title}</h5>
              <p style={{ color: '#6b7280', fontSize: 15, margin: 0, textAlign: 'center' }}>{service.description}</p>
              <div style={{ fontWeight: 700, color: '#4F46E5', fontSize: 18 }}>{service.price.toLocaleString()} Kz</div>
              <button style={{ background: 'linear-gradient(90deg, #4F46E5 0%, #6366f1 100%)', color: '#fff', border: 'none', borderRadius: 999, padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: 15, marginTop: 8, boxShadow: '0 2px 8px rgba(79,70,229,0.10)', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => router.push(`/agendar/${service.id}`)}>
                Agendar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Galeria
  const GalleryTab = () => (
    <div className="container py-4">
      <div className="row g-3">
        {data.galleryImages.map(img => (
          <div className="col-6 col-md-4 col-lg-4" key={img.id}>
            <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(79,70,229,0.06)', cursor: 'pointer', transition: 'box-shadow 0.2s' }} onClick={() => setModalImg(img.imageUrl)}>
              <Image src={img.imageUrl} alt="Galeria" width={300} height={200} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {modalImg && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30, 41, 59, 0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setModalImg(null)}>
          <img src={modalImg} alt="Galeria" style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }} />
        </div>
      )}
    </div>
  );

  // Sobre
  const SobreTab = () => (
    <div className="container py-4">
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(79,70,229,0.06)', padding: 32, color: '#222', fontSize: 17, lineHeight: 1.7, maxWidth: 800, margin: '0 auto' }}>
        <h4 style={{ color: '#4F46E5', fontWeight: 700, marginBottom: 16 }}>Sobre {data.name}</h4>
        <p>Profissional com anos de experiência em {data.category}. Atendimento personalizado, ambiente confortável e compromisso com a satisfação do cliente.</p>
        <ul style={{ color: '#6b7280', fontSize: 15, marginTop: 16 }}>
          <li>Atendimento com hora marcada</li>
          <li>Ambiente climatizado</li>
          <li>Produtos de alta qualidade</li>
        </ul>
      </div>
    </div>
  );

  // Contato
  const ContatoTab = () => (
    <div className="container py-4">
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(79,70,229,0.06)', padding: 32, color: '#222', fontSize: 17, lineHeight: 1.7, maxWidth: 800, margin: '0 auto' }}>
        <h4 style={{ color: '#4F46E5', fontWeight: 700, marginBottom: 16 }}>Contato</h4>
        <div style={{ marginBottom: 12 }}><strong>Telefone:</strong> <a href={`tel:${data.phone}`} style={{ color: '#4F46E5', textDecoration: 'none' }}>{data.phone}</a></div>
        <div style={{ marginBottom: 12 }}><strong>Email:</strong> <a href={`mailto:${data.email}`} style={{ color: '#4F46E5', textDecoration: 'none' }}>{data.email}</a></div>
        <div style={{ marginBottom: 12 }}><strong>Endereço:</strong> {data.address}</div>
        <div style={{ marginBottom: 12 }}><strong>Horários:</strong> {data.schedule}</div>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 32 }}>
      <HeaderSection />
      <Tabs />
      {activeTab === 'servicos' && <ServicesTab />}
      {activeTab === 'galeria' && <GalleryTab />}
      {activeTab === 'sobre' && <SobreTab />}
      {activeTab === 'contato' && <ContatoTab />}
    </div>
  );
};