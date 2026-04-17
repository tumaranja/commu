/** Secondary section switcher (segmented control). Bottom nav stays underline tabs. */

export type SegmentedItem = { id: string; label: string };

export function SegmentedSectionNav({
  items,
  activeIdx,
  onSelect,
}: {
  items: SegmentedItem[];
  activeIdx: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex min-w-0 shrink-0 justify-center px-3 py-1">
      <div
        className="scrollbar-none inline-flex max-w-full min-w-0 flex-nowrap items-stretch gap-0.5 overflow-x-auto overscroll-x-contain rounded-full bg-slate-200 p-1"
        role="tablist"
        aria-label="Sections"
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === activeIdx}
            onClick={() => onSelect(i)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              i === activeIdx ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
