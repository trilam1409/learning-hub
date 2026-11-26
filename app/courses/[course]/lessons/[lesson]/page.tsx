import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonSources } from "@/components/learning/lesson-sources";
import { readCatalog } from "@/lib/content/catalog";
import { notebooksForLesson, notebookUrl } from "@/lib/notebooks";

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

  return (
    <article className="max-w-3xl space-y-4">
      <Link className="inline-flex rounded-lg border border-teal-700 px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50" href={`/courses/${course.id}`}>← Quay lại danh sách bài học</Link>
      <h1 className="text-4xl font-bold tracking-tight">{lesson.title}</h1>
      <p className="text-lg text-stone-700">{lesson.summary}</p>
      {lesson.sessionIds.length === 0 && <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">Tài liệu đọc trước – chưa có transcript bài giảng trên lớp.</p>}
      <div className="lesson-body leading-relaxed"><Lesson /></div>
      {notebooksForLesson(course.id, lesson.id).length > 0 && (
        <section className="rounded-xl border border-teal-200 bg-teal-50 p-5">
          <h2 className="text-lg font-semibold text-teal-950">Thực hành Python ngay trên website</h2>
          <p className="mt-1 text-sm text-stone-700">
            Notebook này chạy bằng Pyodide trong trình duyệt và chứa bài tập liên quan đến kiến thức đang đọc.
          </p>
          <ul className="mt-3 space-y-2">
            {notebooksForLesson(course.id, lesson.id).map((notebook) => (
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
        {previous && <Link className="rounded-lg border border-stone-200 p-3 text-teal-800 hover:bg-teal-50" href={`/courses/${course.id}/lessons/${previous.id}`}>← Bài trước: {previous.title}</Link>}
        {next && <Link className="rounded-lg border border-stone-200 p-3 text-teal-800 hover:bg-teal-50" href={`/courses/${course.id}/lessons/${next.id}`}>Bài tiếp: {next.title} →</Link>}
      </nav>
      <LessonSources sources={course.sources} references={lesson.references} />
      <div className="border-t border-stone-200 pt-6">
        <Link className="inline-flex rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-teal-800 hover:bg-teal-50" href={`/courses/${course.id}`}>← Quay lại {course.title}</Link>
      </div>
    </article>
  );
}
