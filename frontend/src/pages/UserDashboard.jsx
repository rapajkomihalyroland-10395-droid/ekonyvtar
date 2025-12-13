export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <section className="bg-white rounded-3xl shadow-card p-5">
        <h2 className="text-sm font-semibold mb-1">Üdv újra!</h2>
        <p className="text-xs text-muted">
          Itt látod az aktív kölcsönzéseidet és a következő határidőket.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white rounded-3xl shadow-card p-4">
          <div className="text-muted mb-1">Aktív kölcsönzések</div>
          <div className="text-2xl font-semibold">3</div>
        </div>
        <div className="bg-white rounded-3xl shadow-card p-4">
          <div className="text-muted mb-1">Késő határidő</div>
          <div className="text-2xl font-semibold text-amber-500">1</div>
        </div>
        <div className="bg-white rounded-3xl shadow-card p-4">
          <div className="text-muted mb-1">Olvasott oldalak (hét)</div>
          <div className="text-2xl font-semibold">427</div>
        </div>
      </section>

      <section className="bg-white rounded-3xl shadow-card p-5 text-xs">
        <h3 className="text-sm font-semibold mb-3">Legutóbbi könyveid</h3>
        <div className="space-y-2">
          {['Könyv A', 'Könyv B', 'Könyv C'].map((k) => (
            <div key={k} className="flex justify-between">
              <span>{k}</span>
              <span className="text-muted">vissza: 2025.01.12</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
