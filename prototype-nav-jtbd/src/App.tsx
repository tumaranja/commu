import { useMemo, useState } from "react";

type Intent = "give" | "receive";
type Area = "nearby" | "remote";
type ContentType = "neighborhood" | "citizen" | "company";
type Availability = "quick" | "standard" | "committed";

type Opportunity = {
  id: string;
  title: string;
  intent: Intent;
  area: Area;
  contentType: ContentType;
  topics: string[];
  effort: Availability;
  author: string;
  location: string;
  description: string;
  tags: string[];
  freshness: string;
  replies: string;
};

const topicOptions: Record<ContentType, string[]> = {
  neighborhood: ["Errands", "Family", "Mobility", "Pets", "Food", "Language"],
  citizen: ["Benefits", "Municipality news", "Forums", "Culture", "Events", "Wellbeing"],
  company: ["Volunteering", "Mentoring", "Donations", "Team activities", "Local partners"],
};

const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "Need help carrying groceries",
    intent: "receive",
    area: "nearby",
    contentType: "neighborhood",
    topics: ["Errands", "Food"],
    effort: "quick",
    author: "Maria",
    location: "0.7 km away - Kville",
    description: "Two bags only. Prefer today after 18:00.",
    tags: ["Errands", "Short task"],
    freshness: "38 min ago",
    replies: "Usually replies in 25 min",
  },
  {
    id: "2",
    title: "I can help with CV reviews",
    intent: "give",
    area: "remote",
    contentType: "company",
    topics: ["Mentoring"],
    effort: "standard",
    author: "Amin",
    location: "Remote - Sweden",
    description: "Happy to review up to 3 CVs this evening.",
    tags: ["Career", "CV"],
    freshness: "2h ago",
    replies: "Usually replies in 10 min",
  },
  {
    id: "3",
    title: "Dog walk support this weekend",
    intent: "receive",
    area: "nearby",
    contentType: "neighborhood",
    topics: ["Pets"],
    effort: "standard",
    author: "Lauri",
    location: "1.4 km away - Haga",
    description: "Recovering from surgery, need short walks for my dog.",
    tags: ["Pets", "Weekend"],
    freshness: "1h ago",
    replies: "Usually replies in 40 min",
  },
  {
    id: "4",
    title: "I can teach basic Finnish",
    intent: "give",
    area: "nearby",
    contentType: "citizen",
    topics: ["Culture", "Language"],
    effort: "standard",
    author: "Sanna",
    location: "2.2 km away - Centrum",
    description: "20-minute conversation sessions for beginners.",
    tags: ["Language"],
    freshness: "3h ago",
    replies: "Usually replies in 35 min",
  },
  {
    id: "5",
    title: "Need advice for mental health resources",
    intent: "receive",
    area: "remote",
    contentType: "citizen",
    topics: ["Wellbeing", "Benefits"],
    effort: "committed",
    author: "Irina",
    location: "Remote - Finland",
    description: "Looking for trusted local services and next steps.",
    tags: ["Health", "Guidance"],
    freshness: "22 min ago",
    replies: "Usually replies in 15 min",
  },
];

const availabilityLabels: Record<Availability, string> = {
  quick: "Quick",
  standard: "Standard",
  committed: "Committed",
};

function App() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [contentType, setContentType] = useState<ContentType>("neighborhood");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["Errands", "Food"]);
  const [activeAreas, setActiveAreas] = useState<Area[]>(["nearby"]);
  const [intentPrompt, setIntentPrompt] = useState<Intent | null>(null);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const personalized = useMemo(() => {
    const scored = opportunities
      .filter((item) => (activeAreas.length ? activeAreas.includes(item.area) : true))
      .map((item) => {
        let score = 0;
        if (item.contentType === contentType) score += 4;
        const topicOverlap = item.topics.filter((topic) => selectedTopics.includes(topic)).length;
        score += topicOverlap * 2;

        // Lightweight guidance signal only; do not hard-filter alternatives.
        if (intentPrompt === "give" && item.intent === "receive") score += 2;
        if (intentPrompt === "receive" && item.intent === "give") score += 2;

        if (availability && item.effort === availability) score += 1;
        return { item, score };
      })
      .sort((a, b) => b.score - a.score);

    return scored.map((entry) => entry.item);
  }, [activeAreas, availability, contentType, intentPrompt, selectedTopics]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((x) => x !== topic) : [...prev, topic]
    );
  };

  const toggleArea = (area: Area) => {
    setActiveAreas((prev) => (prev.includes(area) ? prev.filter((x) => x !== area) : [...prev, area]));
  };

  const intentLabel = intentPrompt === "give" ? "Give help" : intentPrompt === "receive" ? "Get help" : "Any intent";
  const availabilityLabel = availability ? availabilityLabels[availability] : "Any effort";

  return (
    <div className="flex min-h-full items-start justify-center p-4">
      <div className="iphone-frame">
        <div className="iphone-notch" />
        <main className="flex h-[780px] w-[360px] flex-col overflow-hidden rounded-3xl bg-slate-100">
          {step === 1 ? (
            <section className="flex h-full flex-col p-4">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Step 1 of 2</p>
                <h1 className="mt-1 text-xl font-bold text-slate-900">What do you want to explore first?</h1>
                <p className="mt-1 text-sm text-slate-600">
                  Pick a focus and a few topics. We will tailor your first homepage.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {[
                  { key: "neighborhood", label: "Neighborhood help" },
                  { key: "citizen", label: "Citizen platform" },
                  { key: "company", label: "Company help" },
                ].map((option) => {
                  const isActive = contentType === option.key;
                  return (
                    <button
                      key={option.key}
                      onClick={() => {
                        const next = option.key as ContentType;
                        setContentType(next);
                        setSelectedTopics(topicOptions[next].slice(0, 2));
                      }}
                      className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold ${
                        isActive
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-slate-300 bg-white text-slate-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-slate-900">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {topicOptions[contentType].map((topic) => {
                    const isActive = selectedTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                          isActive
                            ? "border-pink-600 bg-pink-600 text-white"
                            : "border-pink-700 bg-transparent text-pink-700"
                        }`}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                disabled={!selectedTopics.length}
                onClick={() => setStep(2)}
                className="mt-auto rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Continue
              </button>
            </section>
          ) : step === 2 ? (
            <section className="flex h-full flex-col p-4">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Step 2 of 2</p>
                <h1 className="mt-1 text-xl font-bold text-slate-900">What are you here for today?</h1>
                <p className="mt-1 text-sm text-slate-600">
                  This helps prioritize suggestions. You can change it later.
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-900">Intent</p>
                <div className="flex gap-2">
                  {[
                    { key: "give", label: "Give help" },
                    { key: "receive", label: "Get help" },
                  ].map((option) => {
                    const isActive = intentPrompt === option.key;
                    return (
                      <button
                        key={option.key}
                        onClick={() => setIntentPrompt(option.key as Intent)}
                        className={`rounded-full border px-3 py-2 text-sm font-semibold ${
                          isActive
                            ? "border-pink-600 bg-pink-600 text-white"
                            : "border-pink-700 bg-transparent text-pink-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-slate-900">Availability</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "quick", label: "Quick (5-15 min)" },
                    { key: "standard", label: "Standard (15-45 min)" },
                    { key: "committed", label: "Committed (45+ min)" },
                  ].map((option) => {
                    const isActive = availability === option.key;
                    return (
                      <button
                        key={option.key}
                        onClick={() => setAvailability(option.key as Availability)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                          isActive
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-emerald-700 bg-transparent text-emerald-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-auto grid gap-2">
                <button
                  onClick={() => setStep(3)}
                  className="rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-bold text-white"
                >
                  Go to homepage
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700"
                >
                  Skip for now
                </button>
              </div>
            </section>
          ) : (
            <>
              <header className="sticky top-0 z-10 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 p-3">
                <div className="mb-2.5 flex items-center gap-2">
                  <button className="flex h-9 flex-1 items-center justify-between rounded-full border border-slate-200 bg-white px-3.5 text-left text-sm font-semibold">
                    <span>Gothenburg</span>
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 text-slate-500">
                      <path
                        d="M5.5 7.5 10 12l4.5-4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    aria-label="Search"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-base"
                  >
                    <span className="inline-block text-xl scale-x-[-1]">⌕</span>
                  </button>
                </div>
                <div className="mb-2">
                  <button
                    onClick={() => setIsEditOpen((prev) => !prev)}
                    className="rounded-full border border-pink-700 bg-transparent px-3 py-1.5 text-xs font-semibold text-pink-700"
                  >
                    {`Today: ${intentLabel} · ${availabilityLabel}`}
                  </button>
                </div>
                {isEditOpen ? (
                  <div className="mb-2 rounded-xl border border-slate-200 bg-white p-2.5">
                    <div className="mb-2 flex gap-2">
                      {[
                        { key: "give", label: "Give help" },
                        { key: "receive", label: "Get help" },
                      ].map((option) => {
                        const isActive = intentPrompt === option.key;
                        return (
                          <button
                            key={option.key}
                            onClick={() => setIntentPrompt(option.key as Intent)}
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                              isActive
                                ? "border-pink-600 bg-pink-600 text-white"
                                : "border-pink-700 bg-transparent text-pink-700"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: "quick", label: "Quick" },
                        { key: "standard", label: "Standard" },
                        { key: "committed", label: "Committed" },
                      ].map((option) => {
                        const isActive = availability === option.key;
                        return (
                          <button
                            key={option.key}
                            onClick={() => setAvailability(option.key as Availability)}
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                              isActive
                                ? "border-emerald-600 bg-emerald-600 text-white"
                                : "border-emerald-700 bg-transparent text-emerald-700"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {[
                    { key: "nearby", label: "Nearby" },
                    { key: "remote", label: "Remote" },
                  ].map((chip) => {
                    const isActive = activeAreas.includes(chip.key as Area);
                    return (
                      <button
                        key={chip.key}
                        onClick={() => toggleArea(chip.key as Area)}
                        className={`whitespace-nowrap rounded-full border px-3 py-2 text-sm font-semibold ${
                          isActive
                            ? "border-slate-300 bg-slate-200 text-slate-700"
                            : "border-slate-400 bg-transparent text-slate-600"
                        }`}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </header>

              <section className="px-4 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                JTBD navigation variant
              </section>
              <section className="px-4 py-1 text-sm text-slate-600">
                <span>{personalized.length === 1 ? "1 opportunity" : `${personalized.length} opportunities`}</span>
              </section>

              <section className="flex-1 overflow-y-auto">
                <div className="grid gap-2.5 px-3 pb-3">
                  {personalized.length === 0 ? (
                    <article className="rounded-2xl border border-slate-200 bg-white p-4">
                      <h2 className="mb-1 text-lg font-semibold text-slate-900">No good matches right now</h2>
                      <button className="mt-2 w-full rounded-xl bg-emerald-600 px-3 py-2 text-sm font-bold text-white">
                        Make a post
                      </button>
                    </article>
                  ) : (
                    <>
                      {personalized.map((item) => (
                        <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-3">
                          <div className="inline-flex items-center gap-1.5">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400">
                              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-slate-900">
                                <circle cx="8" cy="10" r="1.2" fill="currentColor" />
                                <circle cx="16" cy="10" r="1.2" fill="currentColor" />
                                <path
                                  d="M8 15c1 .9 2.1 1.4 4 1.4s3-.5 4-1.4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                            <span className="text-xs text-slate-700">
                              <span className="font-semibold text-slate-900">{item.author}</span>{" "}
                              {item.intent === "give" ? "is offering help" : "is asking for help"}
                            </span>
                          </div>
                          <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                          <p className="text-sm text-slate-500">{item.location}</p>
                          <p className="mt-1.5 text-sm text-slate-600">{item.description}</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-2.5 flex gap-2 text-xs text-slate-600">
                            <span>{item.freshness}</span>
                            <span>{item.replies}</span>
                          </div>
                          <div className="mt-3 flex">
                            <button className="flex-1 rounded-xl bg-pink-600 px-3 py-2 text-sm font-bold text-white">
                              Start chat
                            </button>
                          </div>
                        </article>
                      ))}
                    </>
                  )}
                </div>
              </section>

              <nav className="mt-auto grid grid-cols-3 gap-1 border-t border-slate-200 bg-white px-2 py-2 text-xs text-slate-500">
                <button className="py-1 font-semibold text-slate-800">Home</button>
                <button className="py-1">Discover</button>
                <button className="py-1">Chats</button>
              </nav>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
