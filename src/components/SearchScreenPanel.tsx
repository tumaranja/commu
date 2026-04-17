import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

/** Full-screen search (Luma-style): dedicated screen with field + suggestions. */
export function SearchScreenPanel({ open, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-screen-title"
    >
      <h2 id="search-screen-title" className="sr-only">
        Search posts and stories
      </h2>
      <div className="shrink-0 px-3 pt-2.5 pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 active:bg-slate-200"
            aria-label="Close search"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path
                fillRule="evenodd"
                d="M11.78 5.22a.75.75 0 00-1.06 0l-4.25 4.25a.75.75 0 000 1.06l4.25 4.25a.75.75 0 101.06-1.06L8.06 10l3.72-3.72a.75.75 0 000-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">
            <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-slate-400" fill="currentColor" aria-hidden>
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              ref={inputRef}
              type="search"
              placeholder="Search posts and stories…"
              className="min-w-0 flex-1 bg-transparent text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
              aria-label="Search posts and stories"
            />
          </div>
        </div>
      </div>

      <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-2">
        <div className="flex flex-wrap gap-2">
          {["Posts", "Stories"].map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
