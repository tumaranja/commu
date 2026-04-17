import { useState } from "react";
import { sectionsByTab } from "../navigation/appStructure";


const homeSections = sectionsByTab.home;

function HeroBanner() {
  return (
    <div className="mb-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
      <svg viewBox="0 0 48 48" className="mb-3 h-10 w-10 text-emerald-400" fill="none">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
        <path
          d="M24 14c-2.2 0-4.5 1.3-5.5 3.2C17.2 15.3 15 14 12.8 14 9 14 6 17 6 20.8c0 5.4 6.2 10.2 14.4 17.2L24 41l3.6-3C35.8 31 42 26.2 42 20.8 42 17 39 14 35.2 14c-2.2 0-4.4 1.3-5.7 3.2C28.5 15.3 26.2 14 24 14z"
          fill="currentColor"
        />
      </svg>
      <p className="mb-1 text-lg font-bold text-slate-800">
        Be the first to offer help in your area
      </p>
      <p className="mb-4 text-sm text-slate-500">
        It's a bit quiet here — we need heroes like you.
      </p>
      <button
        type="button"
        className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
      >
        Offer help
      </button>
      <button
        type="button"
        className="ml-3 text-sm text-slate-400 underline underline-offset-2"
      >
        or ask for help
      </button>
    </div>
  );
}

function StoryTestimonial({ onTap }: { onTap: () => void }) {
  return (
    <button
      type="button"
      onClick={onTap}
      className="mb-4 flex w-full gap-3 rounded-2xl border-l-4 border-emerald-300 bg-white p-4 text-left shadow-sm"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
        M
      </div>
      <div>
        <p className="text-sm italic text-slate-600">
          "Matti offered to help with groceries — 3 neighbors thanked him."
        </p>
        <p className="mt-1.5 text-xs text-slate-400">Kallio, Helsinki</p>
      </div>
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600"
      aria-label="Back"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
        <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
      </svg>
    </button>
  );
}

function StoryDetailOverlay({
  onBack,
  onProfileTap,
}: {
  onBack: () => void;
  onProfileTap: () => void;
}) {
  return (
    <div className="scrollbar-none absolute inset-0 z-30 overflow-y-auto bg-white">
      <div className="p-3">
        <BackButton onClick={onBack} />

        <div className="mb-4 h-48 rounded-2xl bg-slate-100" />

        <button
          type="button"
          onClick={onProfileTap}
          className="mb-3 flex items-center gap-3 text-left"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
            M
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Matti</p>
            <p className="text-xs text-slate-400">Kallio, Helsinki</p>
          </div>
        </button>

        <p className="mb-4 text-sm text-slate-600">
          Offered to help carry groceries for a neighbor. It only took 20 minutes
          and made someone's day a little easier.
        </p>

        <div className="flex gap-4 border-t border-slate-100 pt-3">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.723.723 0 01-.692 0h-.002z" />
            </svg>
            3 likes
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
              <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
            </svg>
            1 comment
          </span>
        </div>
      </div>
    </div>
  );
}

function ProfileOverlay({ onBack }: { onBack: () => void }) {
  return (
    <div className="scrollbar-none absolute inset-0 z-30 overflow-y-auto bg-white">
      <div className="p-3">
        <BackButton onClick={onBack} />

        <div className="mb-4 flex flex-col items-center">
          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-xl font-bold text-slate-600">
            M
          </div>
          <p className="text-base font-bold text-slate-800">Matti</p>
          <p className="text-xs text-slate-400">Kallio, Helsinki</p>
        </div>

        <div className="mb-5 flex justify-center gap-6">
          <div className="text-center">
            <p className="text-lg font-bold text-slate-800">12</p>
            <p className="text-xs text-slate-400">times helped</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-800">3</p>
            <p className="text-xs text-slate-400">recommendations</p>
          </div>
        </div>

        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
          Recent activity
        </h3>
        <div className="space-y-3">
          {[1, 2].map((n) => (
            <div key={n} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-28 rounded-t-2xl bg-slate-100" />
              <div className="p-3">
                <div className="mb-1.5 h-3 w-5/6 rounded bg-slate-200" />
                <div className="h-2.5 w-2/3 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InvitePrompt() {
  return (
    <div className="mb-4 flex items-center gap-2.5 rounded-full bg-slate-50 px-3.5 py-2.5">
      <svg viewBox="0 0 20 20" className="h-4.5 w-4.5 shrink-0 text-slate-400" fill="currentColor">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.97 5.97 0 00-.75-2.9A3.005 3.005 0 0119 17v1h-3zM4.75 14.1A5.97 5.97 0 004 17v1H1v-1a3 3 0 013.75-2.9z" />
      </svg>
      <span className="min-w-0 flex-1 text-xs text-slate-500">
        Know someone who'd help out? <span className="font-semibold text-slate-600">Invite them</span>
      </span>
      <button
        type="button"
        className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200"
      >
        Share
      </button>
    </div>
  );
}

function FeedCards({ count }: { count: number }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
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
  );
}

type HomeTabV2Props = {
  activeIdx?: number;
  onActiveIdxChange?: (i: number) => void;
};

export function HomeTabV2({ activeIdx: controlledIdx, onActiveIdxChange }: HomeTabV2Props = {}) {
  const [localIdx, setLocalIdx] = useState(0);
  const activeIdx = controlledIdx ?? localIdx;
  const setActiveIdx = onActiveIdxChange ?? setLocalIdx;
  const [view, setView] = useState<"feed" | "story" | "profile">("feed");
  const isNearby = homeSections[activeIdx]?.id === "home.newest-nearby";

  return (
    <div className="relative flex h-full flex-col">
      <div className="shrink-0 px-3 pt-0 pb-0">
        <div
          className="scrollbar-none -mx-3 flex gap-2.5 overflow-x-auto overscroll-x-contain px-3 pt-1 pb-2"
          role="tablist"
          aria-label="Home sections"
        >
          {homeSections.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === activeIdx}
              onClick={() => {
                setActiveIdx(i);
                setView("feed");
              }}
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
        {isNearby ? (
          <>
            <HeroBanner />
            <StoryTestimonial onTap={() => setView("story")} />
            <InvitePrompt />
            <FeedCards count={3} />
          </>
        ) : (
          <FeedCards count={6} />
        )}

        {view === "story" && (
          <StoryDetailOverlay
            onBack={() => setView("feed")}
            onProfileTap={() => setView("profile")}
          />
        )}
        {view === "profile" && (
          <ProfileOverlay onBack={() => setView("story")} />
        )}
      </div>
    </div>
  );
}
