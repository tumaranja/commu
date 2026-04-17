import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const TOPICS = [
  { id: "all", label: "All topics" },
  { id: "neighborhood-help", label: "Neighborhood help" },
  { id: "ngos", label: "NGOs" },
  { id: "food-aid", label: "Food aid" },
] as const;

type TopicId = (typeof TOPICS)[number]["id"];
const SPECIFIC_IDS = ["neighborhood-help", "ngos", "food-aid"] as const;
type SpecificId = (typeof SPECIFIC_IDS)[number];

function labelFor(id: TopicId): string {
  return TOPICS.find((t) => t.id === id)!.label;
}

function DemoCard({
  title,
  description,
  children,
  summary,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  summary: string;
}) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
      <div className="min-h-[120px] rounded-xl bg-slate-50 p-4">{children}</div>
      <p className="border-t border-slate-100 pt-3 text-sm text-slate-800">
        <span className="font-semibold text-slate-500">Showing:</span> {summary}
      </p>
    </section>
  );
}

const triggerClass =
  "flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow-sm";
const panelClass =
  "absolute top-full left-0 z-20 mt-1 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1 shadow-lg";

/** A — single-select (current Discover behavior) */
function DemoSingleSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TopicId>("all");

  const summary = useMemo(() => {
    if (selected === "all") return "All topics";
    return `Only ${labelFor(selected)}`;
  }, [selected]);

  return (
    <DemoCard
      title="A — Single select (current)"
      description="Pick one row; the list is mutually exclusive. Closest to today’s Discover Posts filter."
      summary={summary}
    >
      <div className="relative inline-block">
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((o) => !o)}
          className={triggerClass}
        >
          <span>{labelFor(selected)}</span>
          <svg
            viewBox="0 0 20 20"
            className={`h-4 w-4 shrink-0 text-white/90 transition-transform ${open ? "rotate-180" : ""}`}
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {open && (
          <div className={panelClass} role="listbox" aria-label="Topic filter">
            {TOPICS.map((t) => {
              const active = t.id === selected;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setSelected(t.id);
                    setOpen(false);
                  }}
                  className={`flex w-full px-4 py-2.5 text-left text-sm font-semibold ${
                    active ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </DemoCard>
  );
}

function multiSelectSummary(selected: Set<SpecificId>): string {
  if (selected.size === 0 || selected.size === SPECIFIC_IDS.length) return "All topics";
  if (selected.size === 2) {
    const labels = SPECIFIC_IDS.filter((id) => selected.has(id)).map((id) => labelFor(id as TopicId));
    return labels.join(" and ");
  }
  const only = SPECIFIC_IDS.find((id) => selected.has(id))!;
  return labelFor(only as TopicId);
}

function CheckboxMark({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
        checked ? "border-slate-800 bg-slate-800" : "border-slate-300 bg-white"
      }`}
      aria-hidden
    >
      {checked && (
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 6l2.5 2.5L10 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

/** B — multi-select in a dropdown */
function DemoMultiDropdown() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<SpecificId>>(new Set(SPECIFIC_IDS));

  const closeDropdown = useCallback(() => {
    setSelected((prev) => (prev.size === 0 ? new Set(SPECIFIC_IDS) : prev));
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) closeDropdown();
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open, closeDropdown]);

  const summary = useMemo(() => multiSelectSummary(selected), [selected]);

  const toggle = (id: SpecificId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const rowClass = (active: boolean) =>
    `flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-semibold ${
      active ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50"
    }`;

  return (
    <DemoCard
      title="B - Multi-select dropdown"
      description="Toggle categories to narrow the feed. No boxes checked is the same as all checked — both mean no filter. The panel stays open until you click outside or the trigger again."
      summary={summary}
    >
      <div ref={rootRef} className="relative inline-block">
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => (open ? closeDropdown() : setOpen(true))}
          className={triggerClass}
        >
          <span className="max-w-[14rem] truncate text-left">{summary}</span>
          <svg
            viewBox="0 0 20 20"
            className={`h-4 w-4 shrink-0 text-white/90 transition-transform ${open ? "rotate-180" : ""}`}
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {open && (
          <div className={panelClass} role="listbox" aria-label="Multi topic filter">
            {SPECIFIC_IDS.map((id) => {
              const on = selected.has(id);
              return (
                <button key={id} type="button" role="option" aria-selected={on} className={rowClass(on)} onClick={() => toggle(id)}>
                  <CheckboxMark checked={on} />
                  {labelFor(id as TopicId)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </DemoCard>
  );
}

export function FilterOptionsPreview() {
  return (
    <div className="min-h-screen bg-[#f3f5f7] p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Filter options — visual comparison</h1>
        <p className="mb-8 text-sm text-slate-600">
          Same categories as Discover Posts: All topics, Neighborhood help, NGOs, Food aid. Each card is independent — try
          interactions and read the &quot;Showing&quot; line.
        </p>
        <div className="flex flex-col gap-8">
          <DemoSingleSelect />
          <DemoMultiDropdown />
        </div>
      </div>
    </div>
  );
}
