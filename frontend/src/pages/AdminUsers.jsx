export default function AdminUsers() {
  const users = ['diak1', 'diak2', 'tanar1'];

  return (
    <div className="bg-white rounded-3xl shadow-card p-5 text-xs">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">Felhasználók</h2>
        <button className="px-3 py-1 rounded-full bg-black text-white">
          Új felhasználó
        </button>
      </div>
      <ul className="divide-y divide-slate-100">
        {users.map((u, idx) => (
          <li key={idx} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full bg-slate-200" />
              <div>
                <div className="font-medium text-xs">{u}</div>
                <div className="text-[11px] text-muted">
                  role: {idx === 2 ? 'tanár' : 'diák'}
                </div>
              </div>
            </div>
            <button className="text-[11px] px-3 py-1 rounded-full bg-slate-100">
              Részletek
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
