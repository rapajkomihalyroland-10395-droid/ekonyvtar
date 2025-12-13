import { Outlet, NavLink, Link } from 'react-router-dom';

export default function UserLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-card rounded-r-3xl m-4">
        <div className="px-6 py-5 border-b border-slate-100">
          <Link to="/" className="font-semibold text-lg">
            suli<span className="text-muted">/user</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          <NavLink
            to="/user"
            end
            className={({ isActive }) =>
              'block rounded-xl px-3 py-2 ' +
              (isActive
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100')
            }
          >
            Irányítópult
          </NavLink>
          <NavLink
            to="/shop"
            className="block rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100"
          >
            Katalógus
          </NavLink>
        </nav>
        <div className="px-4 pb-4 text-xs text-muted">
          <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100">
            Kilépés
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="px-6 pt-4 pb-2 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Felhasználói felület</h1>
          <span className="text-xs text-muted">
            Bejelentkezve: <b>diak@example.com</b>
          </span>
        </header>
        <main className="flex-1 px-6 pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
