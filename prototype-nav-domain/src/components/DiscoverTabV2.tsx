import { useState } from "react";
import type { SectionDef } from "../navigation/appStructure";
import { sectionsByTab } from "../navigation/appStructure";
import { SegmentedSectionNav } from "./SegmentedSectionNav";

const discoverSections = sectionsByTab.discover;

function SearchBar() {
  return (
    <div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
      <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-slate-400" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm text-slate-400">Search…</span>
    </div>
  );
}

const mapPins = [
  { top: "45%", left: "25%" },
  { top: "65%", left: "50%" },
  { top: "50%", left: "72%" },
  { top: "75%", left: "35%" },
  { top: "40%", left: "55%" },
];

function MapPins({
  selectedPin,
  onSelect,
}: {
  selectedPin: number | null;
  onSelect: (i: number) => void;
}) {
  return (
    <>
      {mapPins.map((pos, i) => (
        <button
          key={i}
          type="button"
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ top: pos.top, left: pos.left }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(i);
          }}
        >
          <svg
            viewBox="0 0 24 36"
            className={`h-6 w-4 drop-shadow-md transition-transform ${selectedPin === i ? "scale-125" : ""}`}
          >
            <path
              d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z"
              fill={selectedPin === i ? "#10b981" : "#334155"}
            />
            <circle cx="12" cy="11" r="4.5" fill="white" />
          </svg>
        </button>
      ))}
    </>
  );
}

/** Shared skeleton for VerticalFeed and SelectedCard — keep in sync in one place. */
function FeedCardContent() {
  return (
    <>
      <div className="h-36 rounded-t-2xl bg-slate-100" />
      <div className="p-3">
        <div className="mb-1.5 h-3 w-5/6 rounded bg-slate-200" />
        <div className="mb-1 h-2.5 w-full rounded bg-slate-100" />
        <div className="h-2.5 w-2/3 rounded bg-slate-100" />
      </div>
    </>
  );
}

function SelectedCard({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500"
        onClick={onDismiss}
        aria-label="Dismiss"
      >
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
      <FeedCardContent />
    </div>
  );
}

function ExpandButton({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 text-slate-600 shadow backdrop-blur-sm"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={expanded ? "Collapse map" : "Expand map"}
    >
      {expanded ? (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
          <path d="M3.28 2.22a.75.75 0 00-1.06 1.06L5.94 7H3.75a.75.75 0 000 1.5h4.5a.75.75 0 00.75-.75v-4.5a.75.75 0 00-1.5 0v2.19L3.28 2.22zM16.72 17.78a.75.75 0 001.06-1.06L14.06 13h2.19a.75.75 0 000-1.5h-4.5a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-2.19l3.22 3.22z" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
          <path d="M13.28 7.78a.75.75 0 10-1.06-1.06L8.5 10.44V8.25a.75.75 0 00-1.5 0v4.5c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-2.19l3.72-3.72zM2 4.75A2.75 2.75 0 014.75 2h10.5A2.75 2.75 0 0118 4.75v10.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25V4.75zM4.75 3.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25H4.75z" />
        </svg>
      )}
    </button>
  );
}

function ExpandedMapOverlay({
  selectedPin,
  onSelectPin,
  onCollapse,
}: {
  selectedPin: number | null;
  onSelectPin: (i: number | null) => void;
  onCollapse: () => void;
}) {
  return (
    <div className="absolute inset-0 z-10">
      <div
        className="relative h-full w-full cursor-pointer"
        onClick={() => onSelectPin(null)}
      >
        <img
          src="/map-placeholder.png"
          alt="Map of nearby posts"
          className="h-full w-full object-cover"
        />
        <MapPins selectedPin={selectedPin} onSelect={(i) => onSelectPin(i)} />
        <ExpandButton expanded onToggle={onCollapse} />

        {selectedPin !== null && (
          <div
            className="absolute right-3 bottom-3 left-3"
            onClick={(e) => e.stopPropagation()}
          >
            <SelectedCard onDismiss={() => onSelectPin(null)} />
          </div>
        )}
      </div>
    </div>
  );
}

function VerticalFeed({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
        <div
          key={n}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <FeedCardContent />
        </div>
      ))}
    </div>
  );
}

function CarouselRow({ section }: { section: SectionDef }) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
        {section.label}
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="w-52 shrink-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <div className="mb-2 h-32 rounded-lg bg-slate-100" />
            <div className="mb-1.5 h-3 w-3/4 rounded bg-slate-200" />
            <div className="h-2.5 w-1/2 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

type PostsChip = "nearby" | "found-for-you" | "popular-finland";

const postsChips: { id: PostsChip; label: string }[] = [
  { id: "nearby", label: "Nearby" },
  { id: "found-for-you", label: "For you" },
  { id: "popular-finland", label: "Popular in Finland" },
];

function FilterChips<T extends string>({
  options,
  active,
  onSelect,
}: {
  options: { id: T; label: string }[];
  active: T;
  onSelect: (id: T) => void;
}) {
  return (
    <div className="mb-3 flex min-w-0 shrink-0 justify-center">
      <div
        className="inline-flex max-w-full min-w-0 flex-nowrap items-stretch gap-0.5 overflow-x-auto overscroll-x-contain rounded-full bg-slate-200 p-1 [scrollbar-width:thin]"
        role="tablist"
        aria-label="Filters"
      >
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            role="tab"
            aria-selected={active === o.id}
            onClick={() => onSelect(o.id)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              active === o.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

type DiscoverTabV2Props = {
  activeIdx?: number;
  onActiveIdxChange?: (i: number) => void;
};

export function DiscoverTabV2({ activeIdx: controlledIdx, onActiveIdxChange }: DiscoverTabV2Props = {}) {
  const [localIdx, setLocalIdx] = useState(0);
  const activeIdx = controlledIdx ?? localIdx;
  const setActiveIdx = onActiveIdxChange ?? setLocalIdx;
  const [mapExpanded, setMapExpanded] = useState(false);
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const [postsChip, setPostsChip] = useState<PostsChip>("nearby");
  const [storiesFilter, setStoriesFilter] = useState<"local" | "finland">("local");

  const active = discoverSections[activeIdx];
  const isPosts = active.id === "discover.posts";
  const isStories = active.id === "discover.stories";
  const children = active.children ?? [];
  const hasSearch = children.some((c) => c.id.includes("search"));
  const newsChild = children.find((c) => c.id === "discover.news-commu");
  const carouselChildren = children.filter(
    (c) => !c.id.includes("search") && c.id !== "discover.nearby" && c.id !== "discover.news-commu",
  );

  return (
    <div className="flex h-full flex-col">
      <SegmentedSectionNav
        items={discoverSections}
        activeIdx={activeIdx}
        onSelect={(i) => {
          setActiveIdx(i);
          setPostsChip("nearby");
          setStoriesFilter("local");
          setSelectedPin(null);
          setMapExpanded(false);
        }}
      />

      <div
        className={
          isPosts && postsChip === "nearby"
            ? "relative flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-3"
            : "relative min-h-0 flex-1 overflow-y-auto px-3 py-3"
        }
      >
        {hasSearch && (
          <div className="shrink-0">
            <SearchBar />
          </div>
        )}

        {isPosts && (
          <>
            <div className="shrink-0">
              <FilterChips options={postsChips} active={postsChip} onSelect={setPostsChip} />
            </div>

            {postsChip === "nearby" && (
              <div className="flex min-h-0 flex-1 flex-col gap-3">
                <div
                  className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
                  onClick={() => setSelectedPin(null)}
                >
                  <img
                    src="/map-placeholder.png"
                    alt="Map of nearby posts"
                    className="h-full min-h-[200px] w-full cursor-pointer object-cover"
                  />
                  <MapPins
                    selectedPin={selectedPin}
                    onSelect={(i) => {
                      setSelectedPin(i);
                      setMapExpanded(true);
                    }}
                  />
                  <ExpandButton expanded={false} onToggle={() => setMapExpanded(true)} />
                </div>
              </div>
            )}

            {postsChip === "found-for-you" && <VerticalFeed count={5} />}
            {postsChip === "popular-finland" && <VerticalFeed count={3} />}
          </>
        )}

        {isStories && (
          <>
            <FilterChips
              options={[
                { id: "local" as const, label: "Local" },
                { id: "finland" as const, label: "Finland" },
              ]}
              active={storiesFilter}
              onSelect={setStoriesFilter}
            />
            {carouselChildren.length > 0
              ? carouselChildren.map((child) => (
                  <CarouselRow key={child.id} section={child} />
                ))
              : null}
            {newsChild && <VerticalFeed count={storiesFilter === "local" ? 3 : 5} />}
          </>
        )}

        {!isPosts && !isStories && (
          <div className="space-y-3">
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
        )}

        {mapExpanded && (
          <ExpandedMapOverlay
            selectedPin={selectedPin}
            onSelectPin={setSelectedPin}
            onCollapse={() => setMapExpanded(false)}
          />
        )}
      </div>
    </div>
  );
}
