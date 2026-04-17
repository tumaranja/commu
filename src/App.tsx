import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { AvatarMenu } from "./components/AvatarMenu";
import { CreateFab } from "./components/CreateFab";
import { NotificationsPanel } from "./components/NotificationsPanel";
import { SectionPlaceholder } from "./components/SectionPlaceholder";
import { DiscoverTab } from "./components/DiscoverTab";
import { HomeTab } from "./components/HomeTab";
import { HomeTabV2 } from "./components/HomeTabV2";
import { MyTownTabV2 } from "./components/MyTownTabV2";
import { SearchScreenPanel } from "./components/SearchScreenPanel";
import { TabHub } from "./components/TabHub";
import type { MainTab } from "./navigation/appStructure";
import { mainTabs } from "./navigation/appStructure";
import type { ReactNode } from "react";

const initialSections: Record<MainTab, string | null> = {
  home: null,
  discover: null,
  myTown: null,
  chats: null,
};

function PhoneInstance({
  activeTab,
  onTabChange,
  homeComponent,
  discoverComponent,
  myTownComponent,
  discoverHeaderSearch,
}: {
  activeTab: MainTab;
  onTabChange: (t: MainTab) => void;
  homeComponent?: ReactNode;
  discoverComponent: ReactNode;
  /** V2-only: My town uses segmented top nav instead of the default hub list */
  myTownComponent?: ReactNode;
  /** Prototype B: search icon on Discover opens full-screen search */
  discoverHeaderSearch?: boolean;
}) {
  const [sectionByTab, setSectionByTab] = useState<Record<MainTab, string | null>>(initialSections);
  /** V1 My town hub: grid cards are multi-select toggles (not mutually exclusive) */
  const [myTownSelectedSectionIds, setMyTownSelectedSectionIds] = useState<string[]>([]);
  const [fabOverlayId, setFabOverlayId] = useState<string | null>(null);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [searchScreenOpen, setSearchScreenOpen] = useState(false);

  // Shared `activeTab` across both preview phones: clear search when leaving Home/Discover.
  useEffect(() => {
    if (activeTab !== "discover" && activeTab !== "home") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset overlay when tab changes (incl. other preview column)
      setSearchScreenOpen(false);
    }
  }, [activeTab]);

  const openSection = sectionByTab[activeTab];
  const showFabPlaceholder = fabOverlayId !== null;

  const clearFab = () => {
    setFabOverlayId(null);
    setCreateMenuOpen(false);
  };

  const handleBack = () => {
    if (showFabPlaceholder) {
      clearFab();
      return;
    }
    if (openSection) {
      setSectionByTab((prev) => ({ ...prev, [activeTab]: null }));
    }
  };

  const mainContent = showFabPlaceholder ? (
    <SectionPlaceholder sectionId={fabOverlayId} onBack={handleBack} />
  ) : openSection ? (
    <SectionPlaceholder sectionId={openSection} onBack={handleBack} />
  ) : activeTab === "home" ? (
    homeComponent ?? <HomeTab />
  ) : activeTab === "discover" ? (
    discoverComponent
  ) : activeTab === "myTown" && myTownComponent ? (
    myTownComponent
  ) : (
    <TabHub
      tab={activeTab}
      onSelectSection={(id) => setSectionByTab((p) => ({ ...p, [activeTab]: id }))}
      myTownSelectedSectionIds={myTownSelectedSectionIds}
      onMyTownSelectedSectionIdsChange={setMyTownSelectedSectionIds}
    />
  );

  const closeSearchScreen = () => setSearchScreenOpen(false);

  const headerSearchIcon =
    discoverHeaderSearch && (activeTab === "home" || activeTab === "discover") ? (
      <button
        type="button"
        onClick={() => {
          setSearchScreenOpen(true);
          setNotificationsOpen(false);
          setAvatarOpen(false);
          setCreateMenuOpen(false);
        }}
        className="flex h-full min-w-[2.25rem] shrink-0 items-center justify-center px-2 text-slate-700 transition-colors hover:bg-slate-50 active:bg-slate-100"
        aria-label="Open search"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    ) : undefined;

  return (
    <AppShell
      bare
      globalSearch={headerSearchIcon}
      searchOverlay={
        discoverHeaderSearch ? (
          <SearchScreenPanel open={searchScreenOpen} onClose={closeSearchScreen} />
        ) : undefined
      }
      onAvatarClick={() => {
        closeSearchScreen();
        setAvatarOpen(true);
        setNotificationsOpen(false);
        setCreateMenuOpen(false);
      }}
      onNotificationsClick={() => {
        closeSearchScreen();
        setNotificationsOpen(true);
        setAvatarOpen(false);
        setCreateMenuOpen(false);
      }}
      avatarMenu={<AvatarMenu open={avatarOpen} onClose={() => setAvatarOpen(false)} />}
      notificationsPanel={<NotificationsPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />}
      fab={
        <CreateFab
          menuOpen={createMenuOpen}
          onToggleMenu={() => setCreateMenuOpen((o) => !o)}
          onPickAction={(id) => {
            setFabOverlayId(id);
            setCreateMenuOpen(false);
          }}
        />
      }
      bottomNav={
        <div className="grid grid-cols-4 gap-0.5 px-1 py-2 text-sm text-slate-500">
          {mainTabs.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  onTabChange(t.id);
                  setFabOverlayId(null);
                  setCreateMenuOpen(false);
                  setSearchScreenOpen(false);
                }}
                className={`rounded-lg py-2 font-semibold ${active ? "text-slate-900" : "text-slate-500"}`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      }
    >
      {mainContent}
    </AppShell>
  );
}

/** Fits two `.iphone-frame` columns (392px), gap-6, and p-4 without horizontal clip. */
const PHONE_SCALE = "min((100vh - 3rem) / 850, (100vw - 3rem) / 840)";

const PREVIEW_ZOOM_MIN = 0.5;
const PREVIEW_ZOOM_MAX = 1.5;
const PREVIEW_ZOOM_STEP = 0.1;

function PreviewZoomControls({
  zoom,
  onZoomChange,
}: {
  zoom: number;
  onZoomChange: (z: number) => void;
}) {
  const pct = Math.round(zoom * 100);
  const clamp = (z: number) => Math.min(PREVIEW_ZOOM_MAX, Math.max(PREVIEW_ZOOM_MIN, z));

  return (
    <div
      className="fixed top-3 right-3 z-[200] flex items-center gap-0.5 rounded-full border border-slate-200 bg-white/95 px-1 py-0.5 text-slate-700 shadow-md backdrop-blur-sm"
      role="toolbar"
      aria-label="Preview zoom"
    >
      <button
        type="button"
        className="flex h-7 w-7 items-center justify-center rounded-full text-base font-medium leading-none hover:bg-slate-100"
        aria-label="Zoom out"
        title="Zoom out"
        onClick={() => onZoomChange(clamp(zoom - PREVIEW_ZOOM_STEP))}
      >
        −
      </button>
      <button
        type="button"
        className="min-w-[2.25rem] rounded-md px-1 py-0.5 text-center text-[11px] font-semibold tabular-nums hover:bg-slate-100"
        aria-label="Reset zoom to 100 percent"
        title="Reset to 100%"
        onClick={() => onZoomChange(1)}
      >
        {pct}%
      </button>
      <button
        type="button"
        className="flex h-7 w-7 items-center justify-center rounded-full text-base font-medium leading-none hover:bg-slate-100"
        aria-label="Zoom in"
        title="Zoom in"
        onClick={() => onZoomChange(clamp(zoom + PREVIEW_ZOOM_STEP))}
      >
        +
      </button>
    </div>
  );
}

const initialSectionByTab: Record<MainTab, number> = {
  home: 0,
  discover: 0,
  myTown: 0,
  chats: 0,
};

function App() {
  const [activeTab, setActiveTab] = useState<MainTab>("home");
  const [sectionByTab, setSectionByTab] = useState<Record<MainTab, number>>(initialSectionByTab);
  const [previewZoom, setPreviewZoom] = useState(1);

  const activeSection = sectionByTab[activeTab];
  const setActiveSection = (i: number) => setSectionByTab((p) => ({ ...p, [activeTab]: i }));

  return (
    <div className="relative h-screen">
      <PreviewZoomControls zoom={previewZoom} onZoomChange={setPreviewZoom} />
      <div className="scrollbar-none flex h-full min-h-0 w-full items-start justify-center gap-6 overflow-x-auto overflow-y-auto p-4">
        <div className="flex h-full flex-col items-center">
          <span className="mb-2 shrink-0 text-xs font-bold uppercase tracking-widest text-slate-400">
            a
          </span>
          <div className="origin-top" style={{ transform: `scale(${previewZoom})` }}>
            <div className="origin-top" style={{ transform: `scale(${PHONE_SCALE})` }}>
              <PhoneInstance
                activeTab={activeTab}
                onTabChange={setActiveTab}
                discoverComponent={
                  <DiscoverTab activeIdx={activeSection} onActiveIdxChange={setActiveSection} />
                }
                homeComponent={<HomeTab activeIdx={activeSection} onActiveIdxChange={setActiveSection} />}
              />
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col items-center">
          <span className="mb-2 shrink-0 text-xs font-bold uppercase tracking-widest text-slate-400">
            b
          </span>
          <div className="origin-top" style={{ transform: `scale(${previewZoom})` }}>
            <div className="origin-top" style={{ transform: `scale(${PHONE_SCALE})` }}>
              <PhoneInstance
                activeTab={activeTab}
                onTabChange={setActiveTab}
                discoverHeaderSearch
                homeComponent={<HomeTabV2 activeIdx={activeSection} onActiveIdxChange={setActiveSection} />}
                discoverComponent={
                  <DiscoverTab
                    activeIdx={activeSection}
                    onActiveIdxChange={setActiveSection}
                    hideInlineSearch
                  />
                }
                myTownComponent={<MyTownTabV2 activeIdx={activeSection} onActiveIdxChange={setActiveSection} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
