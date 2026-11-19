"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Entry = { id: string; title: string; order?: number; number?: number };
type Lesson = { id: string; title: string; summary: string; topicIds: string[]; sessionIds: string[] };

export function CourseCatalog({ courseId, topics, sessions, lessons }: {
  courseId: string;
  topics: Entry[];
  sessions: Entry[];
  lessons: Lesson[];
}) {
  const [view, setView] = useState<"topics" | "sessions">("topics");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("vi-VN");
  const filtered = useMemo(() =>
    lessons.filter((lesson) => !normalizedQuery ||
      (lesson.title + " " + lesson.summary).toLocaleLowerCase("vi-VN").includes(normalizedQuery)),
    [lessons, normalizedQuery]
  );
  const groups = view === "topics"
    ? topics.map((topic) => ({
        id: topic.id, title: topic.title,
        lessons: filtered.filter((lesson) => lesson.topicIds.includes(topic.id)),
      }))
    : [
        ...sessions.map((session) => ({
          id: session.id, title: session.title,
          lessons: filtered.filter((lesson) => lesson.sessionIds.includes(session.id)),
        })),
        {
          id: "preview", title: "Đọc trước – chưa học trên lớp",
          lessons: filtered.filter((lesson) => lesson.sessionIds.length === 0),
        },
      ];
  return (
    <section aria-label="Danh mục bài học" className="space-y-5">
      <div className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Chọn cách xem bài học" className="inline-flex rounded-lg bg-stone-100 p-1">
          <button
            type="button" role="tab" aria-selected={view === "topics"} aria-controls="course-lessons"
            onClick={() => setView("topics")}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${view === "topics" ? "bg-teal-800 text-white shadow" : "text-stone-700 hover:bg-white"}`}
          >Theo chủ đề</button>
          <button
            type="button" role="tab" aria-selected={view === "sessions"} aria-controls="course-lessons"
            onClick={() => setView("sessions")}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${view === "sessions" ? "bg-teal-800 text-white shadow" : "text-stone-700 hover:bg-white"}`}
          >Theo buổi học</button>
        </div>
        <label className="flex-1 text-sm sm:max-w-xs">
          <span className="sr-only">Tìm bài học</span>
          <input
            value={query} onChange={(event) => setQuery(event.target.value)} type="search"
            placeholder="Tìm bài học..."
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 focus:border-teal-700 focus:outline-none"
          />
        </label>
      </div>
      <p className="text-sm text-stone-600" aria-live="polite">
        {filtered.length} bài học · {view === "topics" ? "Nhóm theo kiến thức" : "Nhóm theo buổi và nội dung đọc trước"}
      </p>
      <div id="course-lessons" role="tabpanel" className="space-y-4">
        {groups.filter((group) => group.lessons.length).map((group) => (
          <section key={group.id} className="rounded-xl border border-stone-200 bg-white p-5">
            <h2 className="text-xl font-semibold">{group.title}</h2>
            <ul className="mt-3 divide-y divide-stone-100">
              {group.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    className="block rounded-lg px-2 py-3 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700"
                    href={`/courses/${courseId}/lessons/${lesson.id}`}
                  >
                    <span className="flex flex-wrap items-center gap-2 font-semibold text-teal-800">
                      {lesson.title}
                      {lesson.sessionIds.length === 0 && (
                        <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">Đọc trước</span>
                      )}
                    </span>
                    <span className="mt-1 block text-sm text-stone-600">{lesson.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {filtered.length === 0 && (
          <p className="rounded-xl border border-stone-200 bg-white p-5 text-stone-600">Không tìm thấy bài học phù hợp.</p>
        )}
      </div>
    </section>
  );
}
