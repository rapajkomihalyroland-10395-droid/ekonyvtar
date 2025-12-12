import { Link, NavLink } from 'react-router-dom';
import styles from './MainHeader.module.css';

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo + app name */}
        <Link to="/" className={styles.logoWrap}>
          <span className={styles.logoMark}>
            &lt;&gt;
          </span>
          <span className={styles.logoText}>
            suli<span className={styles.logoMuted}>/online könyvtár</span>
          </span>
        </Link>

        {/* Category select */}
        <div className={styles.category}>
          <span className={styles.categoryLabel}>
            Kategória
          </span>
          <select className={styles.categorySelect}>
            <option>könyvtár</option>
            <option>jegyzetek</option>
            <option>tananyagok</option>
          </select>
        </div>

        {/* Search */}
        <div className={styles.searchWrap}>
          <div className={styles.searchInner}>
            <input
              type="text"
              placeholder="Keresés könyv, szerző vagy téma szerint"
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>
              Keresés
            </button>
          </div>
        </div>

        {/* Auth + icon */}
        <div className={styles.auth}>
          <NavLink to="/auth?mode=login" className={styles.authLink}>
            Bejelentkezés
          </NavLink>
          <NavLink
            to="/auth?mode=register"
            className={styles.authPrimary}
          >
            Regisztráció
          </NavLink>
          <NavLink
            to="/admin"
            className={styles.adminBadge}
          >
            A
          </NavLink>
        </div>
      </div>
    </header>
  );
}
