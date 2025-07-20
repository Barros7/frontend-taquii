'use client';

import { useState, useEffect } from 'react';
import styles from './Testemunhos.module.css';

const testemunhos = [
  {
    id: 1,
    nome: "Carlos Silva",
    profissao: "Mecânico",
    foto: "👨‍🔧",
    avaliacao: 5,
    texto: "Já recebo 3x mais clientes por semana! O Taqui Serviço revolucionou meu negócio. Os clientes chegam prontos para agendar e eu tenho muito mais tempo para focar no trabalho.",
    ganhos: "+150%",
    tempo: "6 meses"
  },
  {
    id: 2,
    nome: "Maria Santos",
    profissao: "Cabeleireira",
    foto: "👩‍🦰",
    avaliacao: 5,
    texto: "Minha agenda está sempre cheia! Os clientes adoram a facilidade de agendamento e eu não preciso mais ficar no telefone o dia todo. Recomendo para todos os profissionais.",
    ganhos: "+200%",
    tempo: "4 meses"
  },
  {
    id: 3,
    nome: "João Costa",
    profissao: "Eletricista",
    foto: "👨‍🔌",
    avaliacao: 5,
    texto: "Comecei há 2 meses e já estou com agenda lotada. O sistema é muito intuitivo e os pagamentos são seguros. Melhor decisão que tomei para meu negócio.",
    ganhos: "+120%",
    tempo: "2 meses"
  }
];

export default function Testemunhos() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testemunhos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testemunhos.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testemunhos.length) % testemunhos.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`${styles.star} ${i < rating ? styles.starFilled : styles.starEmpty}`}>
        ★
      </span>
    ));
  };

  return (
    <section id="testemunhos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            O que nossos <span className={styles.highlight}>prestadores</span> dizem
          </h2>
          <p className={styles.subtitle}>
            Histórias reais de profissionais que transformaram seus negócios
          </p>
        </div>

        <div className={styles.testimonialContainer}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <div className={styles.quoteIcon}>&ldquo;</div>
              
              <div className={styles.testimonialText}>
                {testemunhos[currentIndex].texto}
              </div>

              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>
                  {testemunhos[currentIndex].foto}
                </div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{testemunhos[currentIndex].nome}</h4>
                  <p className={styles.authorProfession}>{testemunhos[currentIndex].profissao}</p>
                  <div className={styles.authorRating}>
                    {renderStars(testemunhos[currentIndex].avaliacao)}
                  </div>
                </div>
              </div>

              <div className={styles.testimonialStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{testemunhos[currentIndex].ganhos}</span>
                  <span className={styles.statLabel}>Aumento na renda</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{testemunhos[currentIndex].tempo}</span>
                  <span className={styles.statLabel}>Usando a plataforma</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.navigation}>
            <button 
              className={styles.navButton} 
              onClick={prevTestimonial}
              aria-label="Testemunho anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className={styles.dots}>
              {testemunhos.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Ir para testemunho ${index + 1}`}
                />
              ))}
            </div>

            <button 
              className={styles.navButton} 
              onClick={nextTestimonial}
              aria-label="Próximo testemunho"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            Junte-se a centenas de prestadores que já estão crescendo
          </p>
          <a href="/register" className={styles.ctaButton}>
            Começar agora
          </a>
        </div>
      </div>
    </section>
  );
} 