import Link from "next/link";
import { notFound } from "next/navigation";
import { readCatalog } from "@/lib/content/catalog";
import { courseDocuments } from "@/lib/content/documents";

type DocumentParams = { course: string; document: string };
export const dynamicParams = false;

export function generateStaticParams(): DocumentParams[] {
  return Object.entries(courseDocuments).flatMap(([course, documents]) =>
    documents.map(({ id: document }) => ({ course, document })),
  );
}

export default async function DocumentPage({ params }: { params: Promise<DocumentParams> }) {
  const { course: courseId, document: documentId } = await params;
  const course = readCatalog().find(({ id }) => id === courseId);
  const document = courseDocuments[courseId]?.find(({ id }) => id === documentId);
  if (!course || !document) notFound();
  const { default: Document } = await import(`@/content/${courseId}/documents/${documentId}.mdx`);

  return (
    <article className="max-w-3xl space-y-6">
      <Link className="text-teal-800 underline" href={`/courses/${course.id}`}>← Quay lại {course.title}</Link>
      <nav aria-label="Tài liệu môn học" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {courseDocuments[courseId].map(({ id, title }) => (
          <Link key={id} href={`/courses/${courseId}/documents/${id}`}
            aria-current={id === documentId ? "page" : undefined} className="text-teal-800 underline">{title}</Link>
        ))}
      </nav>
      <div className="lesson-body leading-relaxed"><Document /></div>
      <Link className="inline-block text-teal-800 underline" href={`/courses/${course.id}`}>← Quay lại danh sách bài học</Link>
    </article>
  );
}
