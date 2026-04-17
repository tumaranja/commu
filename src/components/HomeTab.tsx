import { useState } from "react";
import { sectionsByTab } from "../navigation/appStructure";

const homeSections = sectionsByTab.home;

type HomeTabProps = {
  activeIdx?: number;
  onActiveIdxChange?: (i: number) => void;
};

export function HomeTab({ activeIdx: controlledIdx, onActiveIdxChange }: HomeTabProps = {}) {
  const [localIdx, setLocalIdx] = useState(0);
  const activeIdx = controlledIdx ?? localIdx;
  const setActiveIdx = onActiveIdxChange ?? setLocalIdx;

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 gap-1 border-b border-slate-200 bg-white px-3 pt-1">
        {homeSections.map((section, i) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={`rounded-t-lg px-3 py-1 text-sm font-semibold ${
              i === activeIdx
                ? "border-b-2 border-slate-800 text-slate-900"
                : "text-slate-500"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="scrollbar-none flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-36 rounded-t-2xl bg-slate-100" />
              <div className="p-3">
                <div className="mb-1.5 h-3 w-5/6 rounded bg-slate-200" />
                <div className="mb-1 h-2.5 w-full rounded bg-slate-100" />
                <div className="h-2.5 w-2/3 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
