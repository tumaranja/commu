import type { AvatarMenuEntry } from "../navigation/appStructure";
import { userMenuEntries } from "../navigation/appStructure";

type Props = {
  open: boolean;
  onClose: () => void;
};

const btnClass =
  "w-full rounded-xl px-3 py-2.5 text-left text-sm text-slate-800 hover:bg-slate-50";

function EntryRow({
  entry,
  onClose,
  nested,
}: {
  entry: AvatarMenuEntry;
  onClose: () => void;
  nested?: boolean;
}) {
  return (
    <li>
      <button type="button" className={nested ? `${btnClass} pl-2` : btnClass} onClick={onClose}>
        {entry.label}
      </button>
      {entry.children?.length ? (
        <ul className="mt-1 ml-2 space-y-1 border-l-2 border-slate-100 pl-3">
          {entry.children.map((child) => (
            <EntryRow key={child.id} entry={child} onClose={onClose} nested />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function AvatarMenu({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-slate-900/40" role="presentation">
      <button type="button" aria-label="Close menu" className="min-h-0 flex-1" onClick={onClose} />
      <div
        className="max-h-[85%] overflow-y-auto rounded-t-2xl bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="avatar-menu-title"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
          <h2 id="avatar-menu-title" className="text-base font-bold text-slate-900">
            Menu
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-sm font-semibold text-emerald-700">
            Done
          </button>
        </div>
        <div className="px-3 pb-6 pt-2">
          <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
              You
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Signed-in user</p>
              <p className="text-xs text-slate-500">Prototype — no account</p>
            </div>
          </div>
          <section className="mb-5">
            <h3 className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">User</h3>
            <ul className="grid gap-1">
              {userMenuEntries.map((entry) => (
                <EntryRow key={entry.id} entry={entry} onClose={onClose} />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
