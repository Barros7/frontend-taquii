import styles from './Rating.module.css';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  showReviewCount?: boolean;
}

export default function Rating({ rating, reviewCount = 0, showReviewCount = true }: RatingProps) {
  const roundedRating = Math.round(rating * 10) / 10;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.stars}>
        {/* Full stars */}
        {Array.from({ length: fullStars }, (_, i) => (
          <span key={`full-${i}`} className={styles.star}>
            ★
          </span>
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <span className={`${styles.star} ${styles.halfStar}`}>
            ★
          </span>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }, (_, i) => (
          <span key={`empty-${i}`} className={`${styles.star} ${styles.emptyStar}`}>
            ★
          </span>
        ))}
      </div>
      
      <span className={styles.ratingText}>
        {roundedRating}
      </span>
      
      {showReviewCount && reviewCount > 0 && (
        <span className={styles.reviewCount}>
          ({reviewCount} avaliações)
        </span>
      )}
    </div>
  );
} 