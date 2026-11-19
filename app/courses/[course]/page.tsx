import Link from "next/link";
import { notFound } from "next/navigation";
import { readCatalog } from "@/lib/content/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return readCatalog().map(({ id }) => ({ course: id }));
}

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const { course: courseId } = await params;
  const course = readCatalog().find(({ id }) => id === courseId);
  if (!course) notFound();

  const sections = [
    {
      id: "chu-de",
      title: "Theo chủ đề",
      groups: course.topics.map((topic) => ({
        ...topic,
        lessons: course.lessons.filter((lesson) => lesson.topicIds.includes(topic.id)),
      })),
    },
    {
      id: "buoi-hoc",
      title: "Theo buổi học",
      groups: course.sessions.map((session) => ({
        ...session,
        lessons: course.lessons.filter((lesson) => lesson.sessionIds.includes(session.id)),
      })),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Link className="text-sm text-teal-800 underline" href="/">Môn học</Link>
        <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
        <p className="text-stone-700">{course.description}</p>
        {course.chatgptProjectUrl && (
          <Link className="text-teal-800 underline" href={course.chatgptProjectUrl}>Mở ChatGPT Project</Link>
        )}
      </div>
      <nav aria-label="Cách duyệt bài học" className="flex flex-wrap gap-4 border-b border-stone-200 pb-4">
        {sections.map((section) => (
          <a key={section.id} className="font-medium text-teal-800 underline" href={`#${section.id}`}>{section.title}</a>
        ))}
      </nav>
      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <section id={section.id} key={section.id} className="rounded-xl border border-stone-200 bg-white p-5">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            {section.groups.map((group) => (
              <div key={group.id} className="mt-5 space-y-2">
                <h3 className="font-medium">{group.title}</h3>
                <ul className="space-y-1">
                  {group.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link className="text-teal-800 underline" href={`/courses/${course.id}/lessons/${lesson.id}`}>
                        {lesson.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
