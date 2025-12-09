export default function SectionTitle({ eyebrow, title, actionLabel }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        {eyebrow && (
          <div className="text-xs font-medium uppercase tracking-wide text-muted">
            {eyebrow}
          </div>
        )}
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>
      {actionLabel && (
        <button className="text-sm text-slate-700 px-4 py-1.5 bg-white border border-slate-200 rounded-full hover:bg-slate-50">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
