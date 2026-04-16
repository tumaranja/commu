import type { ReactNode } from "react";

type Props = {
  onAvatarClick: () => void;
  onNotificationsClick: () => void;
  avatarMenu: ReactNode;
  notificationsPanel: ReactNode;
  children: ReactNode;
  bottomNav: ReactNode;
  fab: ReactNode;
  bare?: boolean;
  /** V1 prototype: white status bar + header to match white sub-tab strip */
  whiteTopChrome?: boolean;
};

export function AppShell({
  onAvatarClick,
  onNotificationsClick,
  avatarMenu,
  notificationsPanel,
  children,
  bottomNav,
  fab,
  bare,
  whiteTopChrome,
}: Props) {
  const topChrome = whiteTopChrome ? "bg-white" : "bg-slate-100";
  const phone = (
        <div className="iphone-frame" data-device="iPhone 17 Pro">
        <div className="relative flex h-[780px] w-[360px] flex-col overflow-hidden rounded-[2rem] bg-slate-100">
          <div
            className="iphone-dynamic-island pointer-events-none absolute left-1/2 top-1.5 z-30 -translate-x-1/2"
            aria-hidden
          />
          <div className={`relative z-10 flex min-h-[54px] shrink-0 items-center px-4 pt-2.5 pb-2 ${topChrome}`} aria-hidden>
            <span className="text-[15px] font-bold leading-none text-slate-800">9:41</span>
            <span className="flex-1" />
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.24 4.24 0 0 0-6 0zm-4-4l2 2a7.07 7.07 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
              <svg viewBox="0 0 25 12" className="h-[14px] w-[25px]" fill="currentColor"><rect x="0.5" y="0.5" width="21" height="11" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1"/><rect x="2" y="2" width="14" height="7" rx="1" ry="1"/><path d="M22.5 4v4a2 2 0 0 0 0-4z"/></svg>
            </div>
          </div>
          <header className={`relative z-20 flex shrink-0 items-center gap-2 px-3 pb-0.5 ${topChrome}`}>
            <button
              type="button"
              onClick={onAvatarClick}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-700"
              aria-label="Open account menu"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
                <circle cx="12" cy="12" r="10" fill="currentColor" className="text-emerald-400" />
                <circle cx="9.5" cy="11" r="1" fill="white" />
                <circle cx="14.5" cy="11" r="1" fill="white" />
                <path d="M9.2 14.8c.8.6 1.7.9 2.8.9s2-.3 2.8-.9" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
            <span className="flex-1" aria-hidden />
            <button
              type="button"
              onClick={onNotificationsClick}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
              aria-label="Open notifications"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path
                  fill="currentColor"
                  d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
                />
              </svg>
            </button>
          </header>

          <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>

          {fab}

          <nav className="relative z-20 mt-auto shrink-0 bg-white">{bottomNav}</nav>

          <div className="flex shrink-0 justify-center bg-white px-2 pb-2.5 pt-1" aria-hidden>
            <div className="iphone-home-indicator" />
          </div>

          {avatarMenu}
          {notificationsPanel}
        </div>
        </div>
  );

  if (bare) return phone;

  return (
    <div className="flex min-h-full items-start justify-center overflow-x-hidden p-4">
      <div className="origin-top scale-[0.82] max-[480px]:scale-[0.72]">
        {phone}
      </div>
    </div>
  );
}
