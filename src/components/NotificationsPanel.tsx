import { notificationMenuEntries } from "../navigation/appStructure";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function NotificationsPanel({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-slate-900/40" role="presentation">
      <button type="button" aria-label="Close notifications" className="min-h-0 flex-1" onClick={onClose} />
      <div
        className="scrollbar-none max-h-[85%] overflow-y-auto rounded-t-2xl bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notifications-panel-title"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
          <h2 id="notifications-panel-title" className="text-base font-bold text-slate-900">
            Notifications
          </h2>
          <button type="button" onClick={onClose} className="rounded-full px-2 py-1 text-sm font-semibold text-emerald-700">
            Done
          </button>
        </div>
        <div className="px-3 pb-6 pt-2">
          <ul className="grid gap-1">
            {notificationMenuEntries.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="w-full rounded-full px-3 py-2.5 text-left text-sm text-slate-800 hover:bg-slate-50"
                  onClick={onClose}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
