import Link from "next/link";
import { readCatalog } from "@/lib/content/catalog";

export default function HomePage() {
  const courses = readCatalog();
  const semesters = [...new Set(courses.map((course) => course.semesterId))].sort().reverse();

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold tracking-tight">Môn học</h1>
      {semesters.map((semester) => (
        <section key={semester} className="space-y-4">
          <h2 className="text-xl font-semibold">Học kỳ {semester}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {courses.filter((course) => course.semesterId === semester).map((course) => (
              <li key={course.id}>
                <Link href={`/courses/${course.id}`} className="block rounded-xl border border-stone-200 bg-white p-5 hover:border-teal-600">
                  <h3 className="font-semibold text-teal-900">{course.title}</h3>
                  <p className="mt-2 text-sm text-stone-700">{course.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
