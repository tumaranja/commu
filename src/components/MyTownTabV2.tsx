import { useState } from "react";
import { sectionsByTab } from "../navigation/appStructure";

const myTownSections = sectionsByTab.myTown;

function PlaceholderFeed() {
  return (
    <div className="space-y-2.5">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm"
        >
          <div className="mb-1 h-3 w-3/4 rounded bg-slate-200" />
          <div className="h-2 w-1/2 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

type MyTownTabV2Props = {
  activeIdx?: number;
  onActiveIdxChange?: (i: number) => void;
};

export function MyTownTabV2({ activeIdx: controlledIdx, onActiveIdxChange }: MyTownTabV2Props = {}) {
  const [localIdx, setLocalIdx] = useState(0);
  const activeIdx = controlledIdx ?? localIdx;
  const setActiveIdx = onActiveIdxChange ?? setLocalIdx;

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 px-3 pt-0 pb-0">
        <div
          className="scrollbar-none -mx-3 flex gap-2.5 overflow-x-auto overscroll-x-contain px-3 pt-1 pb-2"
          role="tablist"
          aria-label="My town sections"
        >
          {myTownSections.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === activeIdx}
              onClick={() => setActiveIdx(i)}
              className={`shrink-0 min-w-[7.5rem] rounded-full border px-4 py-3 text-center text-sm font-semibold transition-colors ${
                i === activeIdx
                  ? "border-transparent bg-slate-800 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="scrollbar-none relative min-h-0 flex-1 overflow-y-auto px-3 pt-2.5 pb-3">
        <PlaceholderFeed />
      </div>
    </div>
  );
}
