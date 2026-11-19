import type { readCatalog } from "@/lib/content/catalog";

type Course = ReturnType<typeof readCatalog>[number];

function formatTimestamp(seconds: number) {
  const totalMilliseconds = Math.round(seconds * 1000);
  const hours = Math.floor(totalMilliseconds / 3_600_000);
  const minutes = Math.floor(totalMilliseconds / 60_000) % 60;
  const wholeSeconds = Math.floor(totalMilliseconds / 1000) % 60;
  const milliseconds = totalMilliseconds % 1000;
  const time = [hours, minutes, wholeSeconds].map((part) => String(part).padStart(2, "0")).join(":");
  return milliseconds ? `${time}.${String(milliseconds).padStart(3, "0")}` : time;
}

export function LessonSources({ sources, references }: {
  sources: Course["sources"];
  references: Course["lessons"][number]["references"];
}) {
  if (!references.length) return null;

  return (
    <section className="mt-8 border-t border-stone-200 pt-5" aria-labelledby="lesson-sources">
      <h2 id="lesson-sources" className="text-xl font-semibold">Nguồn tham khảo</h2>
      <ul className="mt-3 list-inside list-disc space-y-2">
        {references.map((reference, index) => {
          const source = sources.find(({ id }) => id === reference.sourceId);
          if (!source) return null;

          const locator = "page" in reference
            ? `PDF, trang ${reference.page}`
            : `VTT, ${formatTimestamp(reference.startSeconds)}${reference.endSeconds === undefined
              ? ""
              : `–${formatTimestamp(reference.endSeconds)}`}`;
          const url = source.url ? new URL(source.url) : undefined;
          if (url && "page" in reference) url.hash = `page=${reference.page}`;

          return (
            <li key={`${reference.sourceId}-${index}`}>
              {url
                ? <a className="text-teal-800 underline" href={url.href}>{source.title}</a>
                : source.title}
              {" "}<span className="text-sm text-stone-700">({locator})</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
