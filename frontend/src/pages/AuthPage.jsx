import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AuthPage.module.css';

const tabs = [
  { key: 'login', label: 'Bejelentkezés' },
  { key: 'register', label: 'Regisztráció' },
];

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const deviceKey = 'library_device_id';

const getDeviceId = () => {
  const cached = localStorage.getItem(deviceKey);
  if (cached) return cached;
  const generated = crypto.randomUUID ? crypto.randomUUID() : `device-${Date.now()}`;
  localStorage.setItem(deviceKey, generated);
  return generated;
};

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    address: '',
    schoolId: '1',
    userType: '1',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const next = searchParams.get('mode');
    if (next && (next === 'login' || next === 'register')) {
      setMode(next);
    }
  }, [searchParams]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const title = useMemo(
    () => (mode === 'login' ? 'Lépj be a könyvtárba' : 'Hozz létre egy fiókot'),
    [mode],
  );
  const subtitle = useMemo(
    () =>
      mode === 'login'
        ? 'Folytasd ott, ahol abbahagytad az olvasást.'
        : 'Kapj hozzáférést a teljes katalógushoz és toplistákhoz.',
    [mode],
  );

  const onSelectMode = (nextMode) => {
    setMode(nextMode);
    setError('');
    setSuccess('');
    navigate(`/auth?mode=${nextMode}`);
  };

  const onChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'login') {
        const res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          withCredentials:true,
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            device_id: getDeviceId(),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || data.error || 'Sikertelen bejelentkezés');
        setSuccess('Sikeres bejelentkezés');
        setTimeout(() => navigate('/user'), 600);
      } else {
        const res = await fetch(`${API_BASE}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            nev: form.name,
            email: form.email,
            password: form.password,
            telefonszam: form.phone || undefined,
            szuletesi_datum: form.birthDate || new Date().toISOString(),
            lakcim: form.address || undefined,
            admin: false,
            iskola_id: Number(form.schoolId || 1),
            felhasznalo_tipus: Number(form.userType || 1),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || data.error || 'Sikertelen regisztráció');
        setSuccess('Sikeres regisztráció, beléptünk a fiókba');
        setTimeout(() => navigate('/user'), 600);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.background} />
      <div className={styles.overlay}>
        <div className={styles.card}>
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Fiók</p>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
            <div className={styles.tabGroup} role="tablist" aria-label="Belépés vagy regisztráció">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={mode === t.key}
                  className={`${styles.tab} ${mode === t.key ? styles.tabActive : ''}`}
                  onClick={() => onSelectMode(t.key)}
                  type="button"
                >
                  {t.label}
                </button>
              ))}
            </div>
          </header>

          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            {mode === 'register' && (
              <div className={styles.twoCol}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">
                    Név
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Teljes neved"
                    className={styles.input}
                    value={form.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="phone">
                    Telefonszám
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+36 20 123 4567"
                    className={styles.input}
                    value={form.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="nev@example.com"
                className={styles.input}
                value={form.email}
                onChange={(e) => onChange('email', e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">
                Jelszó
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className={styles.input}
                value={form.password}
                onChange={(e) => onChange('password', e.target.value)}
                required
              />
            </div>

            {mode === 'register' && (
              <>
                <div className={styles.twoCol}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="birthDate">
                      Születési dátum
                    </label>
                    <input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      className={styles.input}
                      value={form.birthDate}
                      onChange={(e) => onChange('birthDate', e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="address">
                      Lakcím
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Irányítószám, város, utca"
                      className={styles.input}
                      value={form.address}
                      onChange={(e) => onChange('address', e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.twoCol}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="schoolId">
                      Iskola azonosító
                    </label>
                    <input
                      id="schoolId"
                      name="schoolId"
                      type="number"
                      min="1"
                      className={styles.input}
                      value={form.schoolId}
                      onChange={(e) => onChange('schoolId', e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="userType">
                      Felhasználó típus
                    </label>
                    <input
                      id="userType"
                      name="userType"
                      type="number"
                      min="1"
                      className={styles.input}
                      value={form.userType}
                      onChange={(e) => onChange('userType', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {mode === 'login' && (
              <div className={styles.actionsRow}>
                <label className={styles.checkboxRow}>
                  <input type="checkbox" className={styles.checkbox} />
                  <span>Emlékezz rám</span>
                </label>
                <button type="button" className={styles.linkButton}>
                  Elfelejtett jelszó
                </button>
              </div>
            )}

            <button type="submit" className={styles.primaryButton} disabled={loading}>
              {loading ? 'Folyamatban…' : mode === 'login' ? 'Belépés' : 'Regisztráció'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

