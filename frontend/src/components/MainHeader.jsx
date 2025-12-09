import { Link, NavLink } from 'react-router-dom';

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center gap-6">
        {/* Logo + app name */}
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-black text-white text-sm font-semibold tracking-tight">
            &lt;&gt;
          </span>
          <span className="font-semibold tracking-tight text-lg">
            suli<span className="text-muted">/online könyvtár</span>
          </span>
        </Link>

        {/* Category select */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-200">
          <span className="text-xs uppercase tracking-wide text-muted">
            Kategória
          </span>
          <select className="bg-transparent text-sm outline-none">
            <option>könyvtár</option>
            <option>jegyzetek</option>
            <option>tananyagok</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex-1 hidden md:flex">
          <div className="w-full flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
            <input
              type="text"
              placeholder="Keresés könyv, szerző vagy téma szerint"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <button className="text-xs font-medium px-3 py-1 rounded-full bg-slate-900 text-white">
              Keresés
            </button>
          </div>
        </div>

        {/* Auth + icon */}
        <div className="flex items-center gap-3 text-sm">
          <NavLink
            to="/user"
            className="text-slate-700 hover:text-slate-900"
          >
            Bejelentkezés
          </NavLink>
          <NavLink
            to="/user"
            className="hidden sm:inline-flex px-4 py-1.5 rounded-full bg-black text-white text-sm font-medium"
          >
            Regisztráció
          </NavLink>
          <NavLink
            to="/admin"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold"
          >
            A
          </NavLink>
        </div>
      </div>
    </header>
  );
}
