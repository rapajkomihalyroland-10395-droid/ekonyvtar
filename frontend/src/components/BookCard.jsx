import styles from './BookCard.module.css';

export default function BookCard({ title, author, tag }) {
  return (
    <article className={styles.card}>
      <div className={styles.image} />
      <div className={styles.body}>
        <div className={styles.tag}>
          {tag}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{author}</p>
        <p className={styles.desc}>
          Lorem ipsum placeholder könyvleírás, hogy legyen némi szöveg a
          kártyán…
        </p>
        <div className={styles.footer}>
          <span className={styles.availability}>Elérhető</span>
          <button className={styles.cta}>
            Részletek
          </button>
        </div>
      </div>
    </article>
  );
}
