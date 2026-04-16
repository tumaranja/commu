import type { MainTab, SectionDef } from "../navigation/appStructure";
import { sectionsByTab } from "../navigation/appStructure";

type Props = {
  tab: MainTab;
  onSelectSection: (sectionId: string) => void;
  myTownSelectedSectionIds?: string[];
  onMyTownSelectedSectionIdsChange?: (ids: string[]) => void;
};

const rowClassName =
  "flex w-full items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-left text-sm font-semibold text-slate-800 shadow-sm";

function toggleSectionId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}

function SectionRow({
  section,
  onSelectSection,
  nested,
}: {
  section: SectionDef;
  onSelectSection: (sectionId: string) => void;
  nested?: boolean;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelectSection(section.id)}
        className={nested ? `${rowClassName} pl-3` : rowClassName}
      >
        <span className="min-w-0 flex-1">{section.label}</span>
        {section.badge ? (
          <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
            {section.badge}
          </span>
        ) : null}
      </button>
      {section.children?.length ? (
        <ul className="mt-2 ml-1 space-y-2 border-l-2 border-slate-200 pl-3">
          {section.children.map((child) => (
            <SectionRow key={child.id} section={child} onSelectSection={onSelectSection} nested />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function TabHub({
  tab,
  onSelectSection,
  myTownSelectedSectionIds = [],
  onMyTownSelectedSectionIdsChange,
}: Props) {
  const sections: SectionDef[] = sectionsByTab[tab];

  if (tab === "myTown") {
    const setSelected = onMyTownSelectedSectionIdsChange;

    if (!setSelected) {
      return (
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex min-h-0 flex-1 flex-col px-3 py-3">
            <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => onSelectSection(section.id)}
                  className="flex min-h-0 min-w-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 text-center text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50"
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex min-h-0 flex-1 flex-col px-3 py-3">
          <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-3">
            {sections.map((section) => {
              const selected = myTownSelectedSectionIds.includes(section.id);
              return (
                <button
                  key={section.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelected(toggleSectionId(myTownSelectedSectionIds, section.id))}
                  className={`flex min-h-0 min-w-0 items-center justify-center rounded-2xl border p-3 text-center text-sm font-semibold shadow-sm transition-colors ${
                    selected
                      ? "border-slate-800 bg-slate-800 text-white hover:bg-slate-700"
                      : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {sections.length > 0 ? (
          <ul className="grid gap-2">
            {sections.map((section) => (
              <SectionRow key={section.id} section={section} onSelectSection={onSelectSection} />
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
