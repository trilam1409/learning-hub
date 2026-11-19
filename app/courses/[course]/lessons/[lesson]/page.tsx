import Link from "next/link";
import { notFound } from "next/navigation";
import { readCatalog } from "@/lib/content/catalog";

type LessonParams = { course: string; lesson: string };

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { course: string } }) {
  const course = readCatalog().find(({ id }) => id === params.course);
  return course?.lessons.map(({ id }) => ({ lesson: id })) ?? [];
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
      <Link className="text-sm text-teal-800 underline" href={`/courses/${course.id}`}>{course.title}</Link>
      <h1 className="text-4xl font-bold tracking-tight">{lesson.title}</h1>
      <p className="text-lg text-stone-700">{lesson.summary}</p>
      <div className="lesson-body leading-relaxed"><Lesson /></div>
    </article>
  );
}
