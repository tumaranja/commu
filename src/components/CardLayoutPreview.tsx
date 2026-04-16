import type { ReactElement, ReactNode } from "react";

const cardClass =
  "flex min-h-0 min-w-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 text-center text-sm font-semibold text-slate-800 shadow-sm";

function Card({ n }: { n: number }) {
  return <div className={cardClass}>Card {n}</div>;
}

function PhoneShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="max-w-[360px] text-center text-xs font-semibold text-slate-600">{title}</p>
      <div className="relative flex h-[500px] w-[360px] flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-lg">
        <div className="flex min-h-0 flex-1 flex-col p-3">{children}</div>
      </div>
    </div>
  );
}

/** Option 1: orphan spans full width */
function LayoutSpanFull({ count }: { count: number }) {
  const items = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 auto-rows-fr">
      {items.map((n, idx) => (
        <div
          key={n}
          className={`min-h-0 ${idx === items.length - 1 && count % 2 === 1 ? "col-span-2" : ""}`}
        >
          <Card n={n} />
        </div>
      ))}
    </div>
  );
}

/** Option 2: equal-sized cards; last odd card centered at half width */
function LayoutCentered({ count }: { count: number }) {
  const items = Array.from({ length: count }, (_, i) => i + 1);
  const lastIsOrphan = count % 2 === 1;

  if (!lastIsOrphan) {
    return (
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 auto-rows-fr">
        {items.map((n) => (
          <div key={n} className="min-h-0">
            <Card n={n} />
          </div>
        ))}
      </div>
    );
  }

  const head = items.slice(0, -1);
  const tail = items[items.length - 1];

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 auto-rows-fr content-start">
        {head.map((n) => (
          <div key={n} className="min-h-0">
            <Card n={n} />
          </div>
        ))}
      </div>
      <div className="flex shrink-0 justify-center">
        <div className="w-[calc((100%-0.75rem)/2)] max-w-[50%]">
          <Card n={tail} />
        </div>
      </div>
    </div>
  );
}

/** Option 3: first card hero (full width), rest in 2-column grid */
function LayoutHero({ count }: { count: number }) {
  const items = Array.from({ length: count }, (_, i) => i + 1);
  const [first, ...rest] = items;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
      <div className="shrink-0">
        <div className={`${cardClass} min-h-[72px]`}>Card {first} (hero)</div>
      </div>
      {rest.length > 0 ? (
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 auto-rows-fr">
          {rest.map((n) => (
            <div key={n} className="min-h-0">
              <Card n={n} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const COUNTS = [3, 5, 7] as const;

const ROWS: {
  id: string;
  label: string;
  Layout: (props: { count: number }) => ReactElement;
}[] = [
  { id: "span", label: "Option 1 — Last odd card spans full width", Layout: LayoutSpanFull },
  { id: "center", label: "Option 2 — Equal cards, last odd centered (half width)", Layout: LayoutCentered },
  { id: "hero", label: "Option 3 — Hero card + 2-column grid below", Layout: LayoutHero },
];

export function CardLayoutPreview() {
  return (
    <div className="min-h-screen bg-[#f3f5f7] p-6">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="mb-2 text-xl font-bold text-slate-900">My town card layouts (odd counts)</h1>
        <p className="mb-8 text-sm text-slate-600">
          Compare three strategies for 3, 5, and 7 cards inside a phone-sized area (360×500).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-48 p-2 text-left text-xs font-bold uppercase tracking-wide text-slate-500" />
                {COUNTS.map((c) => (
                  <th key={c} className="p-2 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                    {c} cards
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.id} className="align-top">
                  <td className="max-w-[14rem] p-3 pr-4 text-sm font-semibold text-slate-800">{row.label}</td>
                  {COUNTS.map((c) => {
                    const { Layout } = row;
                    return (
                      <td key={c} className="p-3">
                        <PhoneShell title={`${row.label.split("—")[0].trim()} · ${c} cards`}>
                          <Layout count={c} />
                        </PhoneShell>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
