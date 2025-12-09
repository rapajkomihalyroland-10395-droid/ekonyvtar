import { Outlet, NavLink, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 bg-white m-4 rounded-3xl shadow-card flex flex-col">
        <div className="px-6 py-5 border-b border-slate-100">
          <Link to="/" className="font-semibold text-lg">
            suli<span className="text-accent">/admin</span>
          </Link>
          <p className="text-xs text-muted mt-1">
            Könyvtár admin panel
          </p>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              'block rounded-xl px-3 py-2 ' +
              (isActive
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100')
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/books"
            className={({ isActive }) =>
              'block rounded-xl px-3 py-2 ' +
              (isActive
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100')
            }
          >
            Könyvek
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              'block rounded-xl px-3 py-2 ' +
              (isActive
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100')
            }
          >
            Felhasználók
          </NavLink>
        </nav>
        <div className="px-4 pb-4 text-xs text-muted">
          <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100">
            Kilépés adminból
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col pr-4 py-4">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Admin dashboard
            </h1>
            <p className="text-xs text-muted">
              Rendszer statisztikák és moderáció
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 text-xs rounded-full bg-white border border-slate-200">
              Export
            </button>
            <button className="px-4 py-1.5 text-xs rounded-full bg-black text-white">
              Új könyv
            </button>
          </div>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
