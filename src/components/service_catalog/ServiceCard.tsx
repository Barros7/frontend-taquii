'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ServiceCard.module.css';
//import TagList from './TagList';
import Rating from './Rating';

interface ServiceCardProps {
  provider: {
    id: string;
    name: string;
    profileImage: string;
    addresses?: Array<{
      city?: string;
      country?: string;
    }>;
    services?: Array<{
      averageRating?: number;
      price?: number;
      category?: string;
    }>;
    category?: string;
    tags?: string[];
    distance?: string;
    isAvailable?: boolean;
  };
}

export default function ServiceCard({ provider }: ServiceCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const defaultImage = '/barber.webp'; // Imagem padrão para barbearia
  const imageSrc = imageError ? defaultImage : provider.profileImage || defaultImage;
  
  const averageRating = provider.services?.[0]?.averageRating || 0;
  const price = provider.services?.[0]?.price || 15;
  const category = provider.category || provider.services?.[0]?.category || 'Serviço';
  const city = provider.addresses?.[0]?.city || 'Localização';
  const distance = provider.distance || '2.3km';
  //const tags = provider.tags || ['Corte Tradicional', 'Barba', 'Cuidados Masculinos'];
  const isAvailable = provider.isAvailable !== false;

  return (
    <div className={styles.card}>
      {/* Image Section */}
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={provider.name}
          width={400}
          height={250}
          className={styles.image}
          onError={handleImageError}
        />
        
        {/* Available Badge */}
        {isAvailable && (
          <div className={styles.availableBadge}>
            Disponível
          </div>
        )}
        
        {/* Favorite Button */}
        <button 
          className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        
        {/* Price Label */}
        <div className={styles.priceLabel}>
          Desde {price}Kz
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        <h3 className={styles.title}>{provider.name}</h3>
        <p className={styles.category}>{category}</p>
        
        <div className={styles.ratingSection}>
          <Rating rating={averageRating} reviewCount={127} />
        </div>
        
        <div className={styles.locationSection}>
          <div className={styles.location}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{city}, Centro</span>
          </div>
          <div className={styles.distance}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10,8 16,12 10,16 10,8"/>
            </svg>
            <span>{distance}</span>
          </div>
        </div>
        
        {/*<TagList tags={tags} />*/}
        
        <div className={styles.actionSection}>
          <Link href={`/perfil/${provider.id}`} className={styles.agendarButton}>
            Agendar
          </Link>
        </div>
      </div>
    </div>
  );
} 