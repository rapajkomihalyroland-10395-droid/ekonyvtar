import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import BookCard from '../components/BookCard.jsx';
import styles from './Toplistak.module.css';

const toplistaKonyvek = [
  { id: 1, title: 'Az elveszett fejezet', author: 'Kiss Andrea', tag: 'Legtöbbet kölcsönzött' },
  { id: 2, title: 'Nyári fény', author: 'Szabó Dániel', tag: 'Legnépszerűbb' },
  { id: 3, title: 'Kódok és rejtélyek', author: 'Farkas Lilla', tag: 'Új kedvenc' },
];

const rangsorok = [
  {
    title: 'Legnépszerűbb könyvek',
    items: ['Az elveszett fejezet', 'Nyári fény', 'Kódok és rejtélyek', 'Digitális horizont', 'Könyvtáros naplója'],
    extended: [
      'Éjszakai vonat',
      'Rezgő szavak',
      'Naplemente klub',
      'Szélcsend',
      'Fény a polcon',
    ],
  },
  {
    title: 'Legtöbbet kölcsönzött szerzők',
    items: ['Kiss Andrea', 'Szabó Dániel', 'Farkas Lilla', 'Nagy Máté', 'Oláh Petra'],
    extended: ['Kovács Juli', 'Bíró Lajos', 'Tóth Anikó', 'Jakab Milán', 'Lengyel Boróka'],
  },
  {
    title: 'Leggyorsabban fogyó újdonságok',
    items: ['Éjféli expressz', 'Egy hét a hegyen', 'Szirének városa', 'Tanulj okosan', 'Kreatív jegyzetelés'],
    extended: ['Felhőatlasz 2.0', 'Nyári szünet', 'Új remény', 'Az utolsó leckéig', 'Lámpafény'],
  },
  {
    title: 'Olvasói kedvencek',
    items: ['Tükörlabirintus', 'Holdpor', 'Az első sor', 'Ötletgyár', 'A 451. oldal'],
    extended: ['Kézzel írt fejezet', 'Körtefa', 'Második emelet', 'Tengermoraj', 'Keveredő sorok'],
  },
];

export default function Toplistak() {
  const [nyitottLista, setNyitottLista] = useState(null);

  const osszevontTetelek = (lista) => [...lista.items, ...(lista.extended || [])];

  useEffect(() => {
    // Amíg a modál nyitva van, tiltsuk a háttér scrollozását.
    if (nyitottLista) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return undefined;
  }, [nyitottLista]);

  return (
    <div className={styles.page}>
      <section className={styles.sectionCard}>
        <SectionTitle eyebrow="Közösségi statisztikák" title="Toplisták" />
        <p className={styles.lead}>
          Fedezd fel, mely könyvek pörögnek most leginkább, kik a kedvenc szerzők,
          és mely újdonságok tűntek fel a polcokon. A listák hetente frissülnek.
        </p>
        <div className={styles.listGrid}>
          {rangsorok.map((lista) => (
            <article
              key={lista.title}
              className={styles.card}
              role="button"
              tabIndex={0}
              onClick={() => setNyitottLista(lista)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setNyitottLista(lista);
              }}
            >
              <div className={styles.cardTitle}>
                {lista.title}
              </div>
              <ol className={styles.list}>
                {lista.items.map((item, idx) => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.listIndex}>
                      {idx + 1}
                    </span>
                    <span className={styles.listLabel}>{item}</span>
                    <span className={styles.listMeta}>#{(idx + 3) * 4} olvasás</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Kiemelt választás" title="A hét könyvei" />
        <div className={styles.booksGrid}>
          {toplistaKonyvek.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>

      {nyitottLista &&
        createPortal(
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <div className={styles.modalHeader}>
                <div>
                  <p className={styles.modalEyebrow}>Toplista</p>
                  <h3 className={styles.modalTitle}>{nyitottLista.title}</h3>
                </div>
                <button
                  onClick={() => setNyitottLista(null)}
                  className={styles.closeButton}
                >
                  Bezárás
                </button>
              </div>
              <div className={styles.modalBody}>
                <ol className={styles.modalList}>
                  {osszevontTetelek(nyitottLista).map((item, idx) => (
                    <li
                      key={`${nyitottLista.title}-${item}-${idx}`}
                      className={styles.modalListItem}
                    >
                      <span className={styles.listIndex}>
                        {idx + 1}
                      </span>
                      <span className={styles.listLabel}>{item}</span>
                      <span className={styles.listMeta}>#{(idx + 3) * 4} olvasás</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

