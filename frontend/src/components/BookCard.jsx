export default function BookCard({ title, author, tag }) {
  return (
    <article className="bg-white rounded-3xl shadow-card overflow-hidden flex flex-col">
      <div className="h-40 bg-slate-200" />
      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-2">
        <div className="inline-flex text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 w-max">
          {tag}
        </div>
        <h3 className="text-sm font-semibold leading-snug">{title}</h3>
        <p className="text-xs text-muted mb-2">{author}</p>
        <p className="text-xs text-slate-500 line-clamp-3">
          Lorem ipsum placeholder könyvleírás, hogy legyen némi szöveg a
          kártyán…
        </p>
        <div className="mt-auto flex items-center justify-between pt-3 text-xs">
          <span className="text-muted">Elérhető</span>
          <button className="px-3 py-1 rounded-full bg-black text-white">
            Részletek
          </button>
        </div>
      </div>
    </article>
  );
}
