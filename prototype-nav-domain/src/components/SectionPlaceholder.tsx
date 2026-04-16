import { labelForSectionId } from "../navigation/appStructure";

type Props = {
  sectionId: string;
  onBack: () => void;
};

export function SectionPlaceholder({ sectionId, onBack }: Props) {
  const title = labelForSectionId(sectionId);

  return (
    <div className="flex h-full flex-col bg-slate-100">
      <div className="relative flex shrink-0 items-center border-b border-slate-200 bg-white px-2 py-2.5">
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
          aria-label="Back"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h1 className="pointer-events-none absolute inset-x-0 top-1/2 mx-12 -translate-y-1/2 truncate text-center text-sm font-bold text-slate-900">
          {title}
        </h1>
        <span className="w-9 shrink-0" aria-hidden />
      </div>
      <div className="min-h-0 flex-1" />
    </div>
  );
}
