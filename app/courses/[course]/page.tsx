import Link from "next/link";
import { notFound } from "next/navigation";
import { courseDocuments } from "@/lib/content/documents";
import { StudyOverview } from "@/components/learning/study-progress";
import { CourseCatalog } from "@/components/learning/course-catalog";
import { readCatalog } from "@/lib/content/catalog";
import { notebookUrl, notebooksForCourse } from "@/lib/notebooks";

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
      {courseDocuments[course.id] && (
        <nav aria-label="Tài liệu môn học" className="flex flex-wrap gap-3">
          {courseDocuments[course.id].map(({ id, title }) => (
            <Link key={id} href={`/courses/${course.id}/documents/${id}`}
              className="rounded-lg border border-teal-200 bg-white px-4 py-2 text-sm font-medium text-teal-800 hover:bg-teal-50">{title}</Link>
          ))}
        </nav>
      )}
      <StudyOverview courseId={course.id} lessons={course.lessons.map(({ id, title }) => ({ id, title }))} />
      <CourseCatalog courseId={course.id} topics={course.topics} sessions={course.sessions} lessons={course.lessons} />
      {notebooksForCourse(course.id).length > 0 && (
        <details className="rounded-xl border border-teal-200 bg-teal-50 p-5">
          <summary className="cursor-pointer text-lg font-semibold text-teal-950">Thực hành · Python Lab</summary>
          <p className="mt-1 text-sm text-stone-700">
            Mở một notebook để thực hành bằng JupyterLite trên trình duyệt. Không cần cài PyCharm hoặc Jupyter trên máy.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {notebooksForCourse(course.id).map((notebook) => (
              <li key={notebook.file}>
                <Link className="block rounded-lg border border-teal-200 bg-white px-4 py-3 text-sm font-medium text-teal-900 hover:bg-teal-100"
                  href={notebookUrl(course.id, notebook.file)}>
                  {notebook.title}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
