"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";

type Miss = { lessonId: string; anchor: string; question: string };
type Progress = { lastLesson?: string; misses?: Miss[] };
const changeEvent = "learning-hub-progress";
const storageKey = (courseId: string) => `learning-hub:progress:${courseId}`;

function snapshot(courseId: string) {
  try {
    return localStorage.getItem(storageKey(courseId)) ?? "{}";
  } catch {
    return "{}";
  }
}

function readProgress(value: string): Progress {
  try {
    return JSON.parse(value) ?? {};
  } catch {
    return {};
  }
}

function updateProgress(courseId: string, update: (progress: Progress) => Progress) {
  try {
    const value = snapshot(courseId);
    const next = JSON.stringify(update(readProgress(value)));
    if (value === next) return;
    localStorage.setItem(storageKey(courseId), next);
    window.dispatchEvent(new Event(changeEvent));
  } catch {
    // Learning remains available when browser storage is disabled.
  }
}

function subscribe(listener: () => void) {
  window.addEventListener(changeEvent, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(changeEvent, listener);
    window.removeEventListener("storage", listener);
  };
}

export function RememberLesson({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  useEffect(() => {
    updateProgress(courseId, (progress) => ({ ...progress, lastLesson: lessonId }));
  }, [courseId, lessonId]);
  return null;
}

export function recordQuizAnswer(pathname: string, question: string, anchor: string, correct: boolean) {
  const match = /^\/courses\/([^/]+)\/lessons\/([^/]+)\/?$/.exec(pathname);
  if (!match) return;
  const [, courseId, lessonId] = match;
  updateProgress(courseId, (progress) => {
    const remaining = (progress.misses ?? []).filter((miss) => miss.lessonId !== lessonId || miss.anchor !== anchor);
    const misses = correct ? remaining : [{ lessonId, anchor, question }, ...remaining].slice(0, 20);
    return { ...progress, misses };
  });
}

export function StudyOverview({ courseId, lessons }: { courseId: string; lessons: { id: string; title: string }[] }) {
  const value = useSyncExternalStore(subscribe, () => snapshot(courseId), () => "{}");
  const progress = readProgress(value);
  const base = `/courses/${courseId}/lessons/`;
  const last = lessons.find((lesson) => lesson.id === progress.lastLesson);
  const misses = (progress.misses ?? []).filter(({ lessonId }) => lessons.some(({ id }) => id === lessonId));
  if (!last && misses.length === 0) return null;

  return (
    <section aria-label="Tiến độ của bạn" className="space-y-2 rounded-xl border border-teal-200 bg-teal-50 p-4">
      {last && <p><Link className="font-semibold text-teal-900 underline" href={base + last.id}>Tiếp tục học · {last.title}</Link></p>}
      {misses.length > 0 && (
        <details>
          <summary className="cursor-pointer text-sm font-medium text-teal-900">Ôn câu từng sai ({misses.length})</summary>
          <ul className="mt-2 space-y-2 text-sm">
            {misses.map(({ lessonId, anchor, question }) => (
              <li key={lessonId + anchor}><Link className="text-teal-800 underline" href={`${base}${lessonId}#${anchor}`}>{question}</Link></li>
            ))}
          </ul>
        </details>
      )}
      <p className="text-xs text-stone-600">Tiến độ chỉ lưu trên trình duyệt này.</p>
    </section>
  );
}
