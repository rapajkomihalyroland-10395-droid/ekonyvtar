export default function AdminBooks() {
  const rows = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: `Könyv ${i + 1}`,
    author: 'Szerző',
    status: i % 2 === 0 ? 'aktív' : 'archiv',
  }));

  return (
    <div className="bg-white rounded-3xl shadow-card p-5 text-xs">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">Könyvek kezelése</h2>
        <button className="px-3 py-1 rounded-full bg-black text-white">
          Új könyv
        </button>
      </div>
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead className="text-[11px] uppercase tracking-wide text-muted">
          <tr>
            <th className="py-1 px-2">ID</th>
            <th className="py-1 px-2">Cím</th>
            <th className="py-1 px-2">Szerző</th>
            <th className="py-1 px-2">Státusz</th>
            <th className="py-1 px-2 text-right">Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="bg-slate-50 rounded-xl">
              <td className="py-2 px-2 rounded-l-xl">{r.id}</td>
              <td className="py-2 px-2">{r.title}</td>
              <td className="py-2 px-2">{r.author}</td>
              <td className="py-2 px-2">
                <span
                  className={
                    'px-2 py-0.5 rounded-full text-[11px] ' +
                    (r.status === 'aktív'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-200 text-slate-600')
                  }
                >
                  {r.status}
                </span>
              </td>
              <td className="py-2 px-2 text-right rounded-r-xl space-x-2">
                <button className="underline">Szerkesztés</button>
                <button className="text-red-500 underline">Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
