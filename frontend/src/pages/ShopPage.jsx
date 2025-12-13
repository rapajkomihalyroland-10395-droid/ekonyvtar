import { useState } from 'react';
import BookCard from '../components/BookCard.jsx';
import styles from './ShopPage.module.css';

export default function ShopPage() {
  const [viewMode, setViewMode] = useState('grid');

  const books = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    title: `Könyv #${i + 1}`,
    author: 'Szerző Név',
    tag: 'Elérhető',
  }));

  return (
    <div className={styles.layout}>
      {/* Sidebar filter */}
      <aside className={styles.sidebar}>
        <div>
          <div className={styles.sidebarTitle}>Kategória</div>
          <div className={styles.checkboxGroup}>
            {['Mind', 'Regény', 'Vers', 'Tananyag', 'Jegyzet'].map((cat) => (
              <label key={cat} className={styles.checkboxRow}>
                <input type="checkbox" className={styles.checkbox} />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className={styles.sidebarTitle}>Nyelv</div>
          <select className={styles.select}>
            <option>Összes</option>
            <option>Magyar</option>
            <option>Angol</option>
          </select>
        </div>

        <div>
          <div className={styles.sidebarTitle}>Rendezés</div>
          <select className={styles.select}>
            <option>Legújabb elöl</option>
            <option>ABC szerint</option>
            <option>Legtöbbet kölcsönzött</option>
          </select>
        </div>
      </aside>

      {/* Results */}
      <section className={styles.results}>
        <div className={styles.resultsHeader}>
          <div>
            <h1 className={styles.title}>
              Könyvkatalógus
            </h1>
            <p className={styles.subtitle}>
              Tallózz a könyvtár teljes állománya között.
            </p>
          </div>
          <div className={styles.viewToggle} role="group" aria-label="Nézet váltása">
            <button
              type="button"
              className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.toggleActive : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleActive : ''}`}
              onClick={() => setViewMode('list')}
            >
              Lista
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className={styles.gridView}>
            {books.map((b) => (
              <BookCard key={b.id} {...b} />
            ))}
          </div>
        ) : (
          <div className={styles.listView}>
            {books.map((b) => (
              <article key={b.id} className={styles.listItem}>
                <div className={styles.listThumb} />
                <div className={styles.listInfo}>
                  <div className={styles.listTag}>{b.tag}</div>
                  <div className={styles.listTitle}>{b.title}</div>
                  <div className={styles.listAuthor}>{b.author}</div>
                  <p className={styles.listDesc}>
                    Rövid leírás a könyvről, hogy a lista nézetben is legyen
                    kontextus a felhasználónak.
                  </p>
                </div>
                <div className={styles.listMeta}>
                  <span className={styles.listAvailability}>Elérhető</span>
                  <button className={styles.listButton}>Részletek</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
