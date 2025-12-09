export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <section className="grid md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white rounded-3xl shadow-card p-4">
          <div className="text-muted mb-1">Összes könyv</div>
          <div className="text-2xl font-semibold">1 248</div>
        </div>
        <div className="bg-white rounded-3xl shadow-card p-4">
          <div className="text-muted mb-1">Aktív felhasználó</div>
          <div className="text-2xl font-semibold">326</div>
        </div>
        <div className="bg-white rounded-3xl shadow-card p-4">
          <div className="text-muted mb-1">Mai kölcsönzések</div>
          <div className="text-2xl font-semibold">19</div>
        </div>
      </section>

      <section className="bg-white rounded-3xl shadow-card p-5 text-xs">
        <h3 className="text-sm font-semibold mb-3">
          Legutóbbi aktivitás
        </h3>
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead className="text-[11px] uppercase tracking-wide text-muted">
            <tr>
              <th className="py-1">Felhasználó</th>
              <th className="py-1">Művelet</th>
              <th className="py-1">Objektum</th>
              <th className="py-1 text-right">Időpont</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['diak1', 'Kölcsönzés', 'Könyv A', '09:12'],
              ['diak2', 'Visszahozta', 'Könyv B', '09:03'],
              ['diak3', 'Regisztrált', '-', '08:44'],
            ].map(([user, action, obj, time], idx) => (
              <tr key={idx} className="bg-slate-50 rounded-xl">
                <td className="py-2 px-2 rounded-l-xl">{user}</td>
                <td className="py-2 px-2">{action}</td>
                <td className="py-2 px-2">{obj}</td>
                <td className="py-2 px-2 text-right rounded-r-xl">
                  {time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
