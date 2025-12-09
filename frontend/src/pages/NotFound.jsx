import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-white rounded-3xl shadow-card px-8 py-10 text-center space-y-4">
        <div className="text-xs uppercase tracking-wide text-muted">
          404
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Ez az oldal nem létezik.
        </h1>
        <p className="text-sm text-slate-500 max-w-sm">
          Valószínűleg elgépelés történt. Lépj vissza a főoldalra vagy
          nyisd meg a könyvkatalógust.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2 rounded-full bg-black text-white text-sm"
          >
            Vissza a főoldalra
          </Link>
          <Link
            to="/shop"
            className="px-5 py-2 rounded-full bg-white border border-slate-200 text-sm"
          >
            Katalógus
          </Link>
        </div>
      </div>
    </div>
  );
}
