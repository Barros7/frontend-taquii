import React from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

interface GalleryItem {
  id: string;
  caption: string;
  imageUrl: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

const GallerySection: React.FC<GalleryProps> = ({ items }) => {
  return (
    <section className={styles.gallery}> {/* Removi 'my-4' se for uma classe externa, para manter o estilo no CSS Module */}
      {items.map((item) => ( // Use item.id como key, se disponível. Se não, index ainda é uma opção.
        <a
          key={item.id || item.imageUrl} // Preferível usar item.id. Se não tiver, imageUrl pode servir como um fallback melhor que index.
          href={item.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.galleryLink}
        >
          <figure className={styles.galleryThumb}>
            <Image
              src={item.imageUrl}
              alt={item.caption}
              layout="responsive"
              width={500}
              height={500}
              objectFit="cover"
              className={styles.galleryImage}
            />
            <figcaption className={styles.galleryCaption}>
              {item.caption}
            </figcaption>
          </figure>
        </a>
      ))}
    </section>
  );
};

export default GallerySection;