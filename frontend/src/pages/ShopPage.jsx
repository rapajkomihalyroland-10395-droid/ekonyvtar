import BookCard from '../components/BookCard.jsx';

export default function ShopPage() {
  const books = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    title: `Könyv #${i + 1}`,
    author: 'Szerző Név',
    tag: 'Elérhető',
  }));

  return (
    <div className="grid lg:grid-cols-[260px,1fr] gap-6">
      {/* Sidebar filter */}
      <aside className="bg-white rounded-3xl shadow-card p-5 space-y-6 text-xs">
        <div>
          <div className="font-semibold text-sm mb-2">Kategória</div>
          <div className="space-y-1">
            {['Mind', 'Regény', 'Vers', 'Tananyag', 'Jegyzet'].map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="font-semibold text-sm mb-2">Nyelv</div>
          <select className="w-full border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
            <option>Összes</option>
            <option>Magyar</option>
            <option>Angol</option>
          </select>
        </div>

        <div>
          <div className="font-semibold text-sm mb-2">Rendezés</div>
          <select className="w-full border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
            <option>Legújabb elöl</option>
            <option>ABC szerint</option>
            <option>Legtöbbet kölcsönzött</option>
          </select>
        </div>
      </aside>

      {/* Results */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Könyvkatalógus
            </h1>
            <p className="text-xs text-muted">
              Tallózz a könyvtár teljes állománya között.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200">
              Grid
            </span>
            <span className="px-3 py-1 rounded-full text-muted hover:bg-white">
              Lista
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {books.map((b) => (
            <BookCard key={b.id} {...b} />
          ))}
        </div>
      </section>
    </div>
  );
}
