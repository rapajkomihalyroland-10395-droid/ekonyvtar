import styles from './SectionTitle.module.css';

export default function SectionTitle({ eyebrow, title, actionLabel }) {
  return (
    <div className={styles.wrapper}>
      <div>
        {eyebrow && (
          <div className={styles.eyebrow}>
            {eyebrow}
          </div>
        )}
        <h2 className={styles.title}>
          {title}
        </h2>
      </div>
      {actionLabel && (
        <button className={styles.action}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
