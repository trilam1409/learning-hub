import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { readCatalog } from "@/lib/content/catalog";
import { learningNotebooks, notebooksForCourse } from "@/lib/notebooks";

type Params = { course: string; notebook: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return learningNotebooks.map(({ courseId: course, file: notebook }) => ({ course, notebook }));
}

export default async function NotebookPage({ params }: { params: Promise<Params> }) {
  const { course: courseId, notebook: file } = await params;
  const notebook = notebooksForCourse(courseId).find((item) => item.file === file);
  const course = readCatalog().find((item) => item.id === courseId);
  if (!notebook || !course) notFound();

  const labPath = `/jupyterlite/lab/index.html?path=${encodeURIComponent(notebook.file)}`;
  const isRuntimePublished = existsSync(path.join(process.cwd(), "public", "jupyterlite", "lab", "index.html"));

  return (
    <main className="space-y-5">
      <nav aria-label="Điều hướng notebook" className="flex flex-wrap items-center gap-3 text-sm">
        <Link className="text-teal-800 underline" href={`/courses/${courseId}`}>← {course.title}</Link>
        <span aria-hidden="true">/</span>
        <span>Python Notebook</span>
      </nav>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{notebook.title}</h1>
        <p className="text-sm text-stone-700">
          Chạy Python trực tiếp trên trình duyệt bằng JupyterLite và Pyodide. Lần đầu có thể cần tải
          các thư viện; thay đổi của bạn được lưu tại trình duyệt đang dùng, không tự đồng bộ lên GitHub.
        </p>
        {notebook.preview && <p className="inline-block rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">Bài thực hành đọc trước – chưa học trên lớp</p>}
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        {isRuntimePublished && (
          <a className="rounded-lg bg-teal-800 px-4 py-2 font-medium text-white hover:bg-teal-900"
            href={labPath} target="_blank" rel="noopener noreferrer">
            Mở toàn màn hình ↗
          </a>
        )}
        <a className="rounded-lg border border-stone-300 px-4 py-2 text-teal-800 hover:bg-stone-50"
          href={`https://github.com/trilam1409/learning-hub/raw/refs/heads/main/content/data-analytics/notebooks/${notebook.file}`}>
          Tải file .ipynb
        </a>
      </div>

      {isRuntimePublished ? (
        <iframe
          title={`JupyterLite – ${notebook.title}`}
          src={labPath}
          loading="lazy"
          className="h-[75vh] min-h-[520px] w-full rounded-xl border border-stone-200 bg-white"
          allow="clipboard-read; clipboard-write"
        />
      ) : (
        <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          JupyterLite đang chờ xuất bản bộ tài nguyên tĩnh. Bạn vẫn có thể tải .ipynb để luyện tập.
          Việc chạy trực tiếp trên trang sẽ bật sau khi GitHub Actions hoàn tất build và Vercel triển khai lại.
        </div>
      )
      <p className="text-sm text-stone-600">
        Nếu trình duyệt không cho chạy kernel hoặc không hỗ trợ WebAssembly, hãy mở notebook trong
        JupyterLab trên máy hoặc dùng tệp .ipynb đã tải về. Chỉ nên chạy những đoạn code bạn hiểu và tin cậy.
      </p>
    </main>
  );
}
