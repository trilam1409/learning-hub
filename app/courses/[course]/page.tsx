import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseCatalog } from "@/components/learning/course-catalog";
import { readCatalog } from "@/lib/content/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return readCatalog().map(({ id }) => ({ course: id }));
}

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const { course: courseId } = await params;
  const course = readCatalog().find(({ id }) => id === courseId);
  if (!course) notFound();

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Link className="text-sm text-teal-800 underline" href="/">← Danh sách môn học</Link>
        <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
        <p className="text-stone-700">{course.description}</p>
        {course.chatgptProjectUrl && (
          <Link className="text-teal-800 underline" href={course.chatgptProjectUrl}>Mở ChatGPT Project</Link>
        )}
      </div>
      <CourseCatalog courseId={course.id} topics={course.topics} sessions={course.sessions} lessons={course.lessons} />
    </div>
  );
}
