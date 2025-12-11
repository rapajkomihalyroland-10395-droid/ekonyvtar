import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import BookCard from '../components/BookCard.jsx';
import styles from './LandingPage.module.css';

const dummyBooks = [
  { id: 1, title: 'Könyv cím 1', author: 'Ismeretlen szerző', tag: 'Új' },
  { id: 2, title: 'Könyv cím 2', author: 'Másik szerző', tag: 'Új' },
  { id: 3, title: 'Könyv cím 3', author: 'Valaki', tag: 'Új' },
];

export default function LandingPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroTextCol}>
          <p className={styles.eyebrow}>
            &lt;suli&gt; online könyvtára
          </p>
          <h1 className={styles.heroTitle}>
            Digitális könyvtár az egész osztálynak.
          </h1>
          <p className={styles.heroLead}>
            Mentsd el a kedvenc könyveidet, oszd meg az osztállyal, és fedezz
            fel új olvasmányokat pár kattintással.
          </p>
          <div className={styles.heroActions}>
            <a href="/shop" className={styles.primaryBtn}>
              Könyvek megtekintése
            </a>
            <a href="#reviews" className={styles.secondaryBtn}>
              Vélemények
            </a>
          </div>
        </div>

        {/* Toplista / kiemelt kép mock */}
        <div className={styles.toplistCard}>
          <div className={styles.toplistImage} />
          <div className={styles.toplistBody}>
            <p className={styles.cardEyebrow}>
              Toplista
            </p>
            <div className={styles.cardList}>
              <div>
                <div className={styles.cardTitle}>Top 1 könyv</div>
                <p className={styles.cardText}>
                  Rövid leírás a legnépszerűbb könyvről…
                </p>
              </div>
              <div>
                <div className={styles.cardTitle}>Top 2 könyv</div>
                <p className={styles.cardText}>
                  Még egy rövid leírás, hogy legyen szerkezet.
                </p>
              </div>
            </div>
            <Link
              to="/toplistak"
              className={styles.cardCta}
            >
              Toplisták megnyitása
            </Link>
          </div>
        </div>
      </section>

      {/* Új könyveink */}
      <section className={styles.section}>
        <SectionTitle
          eyebrow="Szűrt gyűjtemény"
          title="Új könyveink"
          actionLabel="Összes megtekintése"
        />
        <div className={styles.booksGrid}>
          {dummyBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>

      {/* Népszerű költők */}
      <section className={styles.section}>
        <SectionTitle title="Népszerű költők" />
        <div className={styles.poetsGrid}>
          <div className={`${styles.poetsCard} ${styles.poetsWide}`} />
          <div className={styles.poetsCard} />
        </div>
      </section>

      {/* Vélemények */}
      <section id="reviews" className={styles.section}>
        <SectionTitle title="Vélemények" />
        <div className={styles.reviewsGrid}>
          {['Terrific piece of smth', 'Fantastic bit of feedback', 'Glowing review'].map(
            (title, idx) => (
              <article
                key={idx}
                className={styles.reviewCard}
              >
                <p className={styles.reviewTitle}>
                  “{title}”
                </p>
                <p className={styles.reviewText}>
                  Rövid test szöveg, hogy legyen struktúra a kártyán.
                </p>
                <div className={styles.reviewMeta}>
                  <div className={styles.reviewAvatar} />
                  <div>
                    <div className={styles.reviewName}>Diák neve</div>
                    <div className={styles.reviewSubtitle}>Osztály / iskola</div>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} eKönyvtár</span>
        <div className={styles.footerLinks}>
          <a href="#">Impresszum</a>
          <a href="#">Adatkezelés</a>
          <a href="#">Kapcsolat</a>
        </div>
      </footer>
    </div>
  );
}
