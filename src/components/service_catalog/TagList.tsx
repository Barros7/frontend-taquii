import styles from './TagList.module.css';

interface TagListProps {
  tags: string[];
  maxTags?: number;
}

export default function TagList({ tags, maxTags = 3 }: TagListProps) {
  const displayTags = tags.slice(0, maxTags);

  return (
    <div className={styles.tagList}>
      {displayTags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          {tag}
        </span>
      ))}
      {tags.length > maxTags && (
        <span className={styles.moreTag}>
          +{tags.length - maxTags}
        </span>
      )}
    </div>
  );
} 