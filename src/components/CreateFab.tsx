import { fabActions } from "../navigation/appStructure";

type Props = {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onPickAction: (actionId: string) => void;
};

export function CreateFab({ menuOpen, onToggleMenu, onPickAction }: Props) {
  return (
    <div className="pointer-events-none absolute bottom-[80px] right-3 z-30 flex flex-col items-end gap-2">
      {menuOpen ? (
        <div className="pointer-events-auto mb-1 grid w-[200px] gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
          {fabActions.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onPickAction(a.id)}
              className="rounded-full px-3 py-2.5 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              {a.label}
            </button>
          ))}
        </div>
      ) : null}
      <button
        type="button"
        onClick={onToggleMenu}
        className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-pink-600 text-white shadow-lg"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close create menu" : "Create"}
      >
        {menuOpen ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
        )}
      </button>
    </div>
  );
}
