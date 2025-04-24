import React from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

// Import the interface if it's in a separate file
// import { GalleryItem } from '../types/gallery';

interface GalleryItem {
  link: string;
  imageUrl: string;
  imageAlt: string;
  caption: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

const GallerySection: React.FC<GalleryProps> = ({ items }) => {
  return (
    <section className={`${styles.gallery} my-4`}>
      {items.map((item, index) => (
        <a
          key={index} // Using index as key. Ideally, use a unique ID if available in your data.
          href={item.link}
          target="_blank"
          rel="noopener noreferrer" // Recommended for security when using target="_blank"
          className={styles.galleryLink}
        >
          <figure className={styles.galleryThumb}>
            {/* Using Next.js Image component */}
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              layout="responsive" // Makes the image responsive within its container
              width={400} // Provide a base width (used for aspect ratio with responsive)
              height={400} // Provide a base height (used for aspect ratio with responsive)
              objectFit="cover" // How the image should fit within the provided dimensions
              className={styles.galleryImage} // Apply CSS module class for additional styling if needed
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