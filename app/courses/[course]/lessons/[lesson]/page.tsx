import type { ComponentProps } from "react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { CatalogLink } from "@/components/learning/catalog-link";
import { RememberLesson } from "@/components/learning/study-progress";
import { sectionId } from "@/lib/lesson-navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonSources } from "@/components/learning/lesson-sources";
import { readCatalog } from "@/lib/content/catalog";
import { notebooksForLesson, notebookUrl } from "@/lib/notebooks";

function LessonHeading({ level: Heading, children, ...props }: ComponentProps<"h2"> & { level: "h2" | "h3" }) {
  return <Heading {...props} id={typeof children === "string" ? sectionId(children) : props.id} className="scroll-mt-6">{children}</Heading>;
}

type LessonParams = { course: string; lesson: string };

export const dynamicParams = false;

export function generateStaticParams(): LessonParams[] {
  return readCatalog().flatMap(({ id: course, lessons }) =>
    lessons.map(({ id: lesson }) => ({ course, lesson })),
  );
}

export default async function LessonPage({ params }: { params: Promise<LessonParams> }) {
  const { course: courseId, lesson: lessonId } = await params;
  const courses = readCatalog();
  const course = courses.find(({ id }) => id === courseId);
  const lesson = course?.lessons.find(({ id }) => id === lessonId);
  if (!course || !lesson) notFound();

  const lessonIndex = course.lessons.findIndex(({ id }) => id === lesson.id);
  const previous = course.lessons[lessonIndex - 1];
  const next = course.lessons[lessonIndex + 1];
  const { default: Lesson } = await import(`@/content/${courseId}/lessons/${lessonId}.mdx`);

  const markdown = readFileSync(path.join(process.cwd(), "content", courseId, "lessons", `${lessonId}.mdx`), "utf8");
  const headings = [...markdown.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, "")
    .matchAll(/^(#{2,3})[ \t]+(.+?)[ \t]*$/gm)]
    .filter(([, level, title]) => level === "##" || title.startsWith("Bài tập"))
    .map(([, , title]) => ({ title, id: sectionId(title) }));
  const notebooks = notebooksForLesson(course.id, lesson.id);
  const sections = [
    ...headings,
    ...(notebooks.length ? [{ id: "python-lab", title: "Thực hành Python" }] : []),
  ];

  return (
    <article className="max-w-3xl space-y-4">
      <RememberLesson courseId={course.id} lessonId={lesson.id} />
      <CatalogLink className="inline-flex rounded-lg border border-teal-700 px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50" href={`/courses/${course.id}`}>← Quay lại danh sách bài học</CatalogLink>
      <h1 className="text-4xl font-bold tracking-tight">{lesson.title}</h1>
      <p className="text-lg text-stone-700">{lesson.summary}</p>
      {lesson.sessionIds.length === 0 && <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">Tài liệu đọc trước – chưa có transcript bài giảng trên lớp.</p>}
      {sections.length > 0 && (
        <details className="rounded-xl border border-stone-200 bg-white p-4">
          <summary className="cursor-pointer font-semibold text-teal-900">Trong bài này</summary>
          <nav aria-label="Mục lục bài học">
            <ul className="mt-3 space-y-2 text-sm sm:columns-2">
              {sections.map(({ id, title }) => (
                <li key={id} className="break-inside-avoid"><a className="text-teal-800 underline" href={`#${id}`}>{title}</a></li>
              ))}
            </ul>
          </nav>
        </details>
      )}
      <div className="lesson-body leading-relaxed">
        <Lesson components={{
          h2: (props: ComponentProps<"h2">) => <LessonHeading level="h2" {...props} />,
          h3: (props: ComponentProps<"h3">) => <LessonHeading level="h3" {...props} />,
        }} />
      </div>
      {notebooks.length > 0 && (
        <section id="python-lab" className="scroll-mt-6 rounded-xl border border-teal-200 bg-teal-50 p-5">
          <h2 className="text-lg font-semibold text-teal-950">Thực hành Python ngay trên website</h2>
          <p className="mt-1 text-sm text-stone-700">
            Notebook này chạy bằng Pyodide trong trình duyệt và chứa bài tập liên quan đến kiến thức đang đọc.
          </p>
          <ul className="mt-3 space-y-2">
            {notebooks.map((notebook) => (
              <li key={notebook.file}>
                <Link href={notebookUrl(course.id, notebook.file)}
                  className="inline-flex rounded-lg bg-teal-800 px-4 py-2 text-sm font-medium text-white hover:bg-teal-900">
                  Mở JupyterLite · {notebook.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <nav aria-label="Chuyển bài học" className="grid gap-3 border-t border-stone-200 pt-5 sm:grid-cols-2">
        {previous && <CatalogLink className="rounded-lg border border-stone-200 p-3 text-teal-800 hover:bg-teal-50" href={`/courses/${course.id}/lessons/${previous.id}`}>← Bài trước: {previous.title}</CatalogLink>}
        {next && <CatalogLink className="rounded-lg border border-stone-200 p-3 text-teal-800 hover:bg-teal-50" href={`/courses/${course.id}/lessons/${next.id}`}>Bài tiếp: {next.title} →</CatalogLink>}
      </nav>
      <LessonSources sources={course.sources} references={lesson.references} />
      <div className="border-t border-stone-200 pt-6">
        <CatalogLink className="inline-flex rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-teal-800 hover:bg-teal-50" href={`/courses/${course.id}`}>← Quay lại {course.title}</CatalogLink>
      </div>
    </article>
  );
}
