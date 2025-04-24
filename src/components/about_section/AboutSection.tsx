import React from 'react';
import styles from './AboutSection.module.css';
import Image from 'next/image'; // Using Next.js Image component for optimization

interface AboutSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  // Optional: Add other relevant information, maybe as an array of points or a separate paragraph
  additionalInfo?: string | string[];
}

const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  description,
  imageUrl,
  imageAlt,
  additionalInfo,
}) => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>

            {additionalInfo && (
              <div className={styles.additionalInfo}>
                {typeof additionalInfo === 'string' ? (
                  <p>{additionalInfo}</p>
                ) : (
                  <ul>
                    {additionalInfo.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              layout="responsive" // Use responsive layout
              width={500} // Provide a width (used for aspect ratio with responsive)
              height={500} // Provide a height (used for aspect ratio with responsive)
              objectFit="cover" // Cover the container while maintaining aspect ratio
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;