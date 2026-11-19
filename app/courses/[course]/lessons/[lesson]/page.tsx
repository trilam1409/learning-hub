import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonSources } from "@/components/learning/lesson-sources";
import { readCatalog } from "@/lib/content/catalog";

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

  const { default: Lesson } = await import(`@/content/${courseId}/lessons/${lessonId}.mdx`);

  return (
    <article className="max-w-3xl space-y-4">
      <Link className="inline-flex rounded-lg border border-teal-700 px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50" href={`/courses/${course.id}`}>← Quay lại danh sách bài học</Link>
      <h1 className="text-4xl font-bold tracking-tight">{lesson.title}</h1>
      <p className="text-lg text-stone-700">{lesson.summary}</p>
      {lesson.sessionIds.length === 0 && <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">Tài liệu đọc trước – chưa có transcript bài giảng trên lớp.</p>}
      <div className="lesson-body leading-relaxed"><Lesson /></div>
      <LessonSources sources={course.sources} references={lesson.references} />
      <div className="border-t border-stone-200 pt-6">
        <Link className="inline-flex rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-teal-800 hover:bg-teal-50" href={`/courses/${course.id}`}>← Quay lại {course.title}</Link>
      </div>
    </article>
  );
}
