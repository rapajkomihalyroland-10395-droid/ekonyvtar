import SectionTitle from '../components/SectionTitle.jsx';
import BookCard from '../components/BookCard.jsx';

const dummyBooks = [
  { id: 1, title: 'Könyv cím 1', author: 'Ismeretlen szerző', tag: 'Új' },
  { id: 2, title: 'Könyv cím 2', author: 'Másik szerző', tag: 'Új' },
  { id: 3, title: 'Könyv cím 3', author: 'Valaki', tag: 'Új' },
];

export default function LandingPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="grid md:grid-cols-[2fr,1.3fr] gap-10 items-start">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted mb-2">
            &lt;suli&gt; online könyvtára
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Digitális könyvtár az egész osztálynak.
          </h1>
          <p className="text-sm text-slate-600 mb-6 max-w-prose">
            Mentsd el a kedvenc könyveidet, oszd meg az osztállyal, és fedezz
            fel új olvasmányokat pár kattintással.
          </p>
          <div className="flex gap-3">
            <a
              href="/shop"
              className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-medium"
            >
              Könyvek megtekintése
            </a>
            <a
              href="#reviews"
              className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm"
            >
              Vélemények
            </a>
          </div>
        </div>

        {/* Toplista / kiemelt kép mock */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden">
          <div className="h-40 bg-slate-200" />
          <div className="p-5 space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Toplista
            </p>
            <div className="space-y-2 text-sm">
              <div>
                <div className="font-semibold">Top 1 könyv</div>
                <p className="text-xs text-slate-500">
                  Rövid leírás a legnépszerűbb könyvről…
                </p>
              </div>
              <div>
                <div className="font-semibold">Top 2 könyv</div>
                <p className="text-xs text-slate-500">
                  Még egy rövid leírás, hogy legyen szerkezet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Új könyveink */}
      <section>
        <SectionTitle
          eyebrow="Szűrt gyűjtemény"
          title="Új könyveink"
          actionLabel="Összes megtekintése"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>

      {/* Népszerű költők */}
      <section>
        <SectionTitle title="Népszerű költők" />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl shadow-card h-52" />
          <div className="bg-white rounded-3xl shadow-card h-52" />
        </div>
      </section>

      {/* Vélemények */}
      <section id="reviews">
        <SectionTitle title="Vélemények" />
        <div className="grid md:grid-cols-3 gap-4">
          {['Terrific piece of smth', 'Fantastic bit of feedback', 'Glowing review'].map(
            (title, idx) => (
              <article
                key={idx}
                className="bg-white rounded-3xl shadow-card p-5 flex flex-col justify-between"
              >
                <p className="text-sm font-semibold mb-2">
                  “{title}”
                </p>
                <p className="text-xs text-slate-500 mb-3">
                  Rövid test szöveg, hogy legyen struktúra a kártyán.
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-7 w-7 rounded-full bg-slate-200" />
                  <div>
                    <div className="font-medium">Diák neve</div>
                    <div className="text-muted">Osztály / iskola</div>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-6 border-t border-slate-200 text-xs text-muted flex flex-col sm:flex-row justify-between gap-3">
        <span>© {new Date().getFullYear()} eKönyvtár</span>
        <div className="flex gap-4">
          <a href="#">Impresszum</a>
          <a href="#">Adatkezelés</a>
          <a href="#">Kapcsolat</a>
        </div>
      </footer>
    </div>
  );
}
