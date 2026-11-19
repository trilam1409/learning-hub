import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import type { ZodType } from "zod";
import { courseSchema, lessonSchema, sessionsSchema, sourcesSchema, topicsSchema } from "./schema.ts";

function parseMetadata<T>(source: string, file: string, schema: ZodType<T>): T {
  try {
    return schema.parse(parse(source));
  } catch (error) {
    throw new Error(`${file}: ${String(error)}`, { cause: error });
  }
}

function readMetadata<T>(directory: string, name: string, schema: ZodType<T>): T {
  const file = path.join(directory, name);
  return parseMetadata(readFileSync(file, "utf8"), file, schema);
}

function indexById<T extends { id: string }>(items: T[], location: string) {
  const index = new Map<string, T>();
  for (const item of items) {
    if (index.has(item.id)) throw new Error(`${location}: ID trùng "${item.id}"`);
    index.set(item.id, item);
  }
  return index;
}

function readCourse(directory: string) {
  const course = readMetadata(directory, "course.yml", courseSchema);
  if (course.id !== path.basename(directory)) {
    throw new Error(`${directory}: ID của môn phải khớp tên thư mục`);
  }

  const topics = readMetadata(directory, "topics.yml", topicsSchema).sort((a, b) => a.order - b.order);
  const sessions = readMetadata(directory, "sessions.yml", sessionsSchema).sort((a, b) => a.number - b.number);
  const sources = readMetadata(directory, "sources.yml", sourcesSchema);
  const topicsById = indexById(topics, directory);
  const sessionsById = indexById(sessions, directory);
  const sourcesById = indexById(sources, directory);
  const lessonDirectory = path.join(directory, "lessons");

  const lessons = readdirSync(lessonDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map(({ name }) => {
      const file = path.join(lessonDirectory, name);
      const document = readFileSync(file, "utf8");
      const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(document);
      if (!frontmatter) throw new Error(`${file}: thiếu YAML frontmatter`);

      const lesson = parseMetadata(frontmatter[1], file, lessonSchema);
      if (`${lesson.id}.mdx` !== name) throw new Error(`${file}: ID bài học phải khớp tên tệp`);
      for (const id of lesson.topicIds) {
        if (!topicsById.has(id)) throw new Error(`${file}: chủ đề "${id}" không tồn tại`);
      }
      for (const id of lesson.sessionIds) {
        if (!sessionsById.has(id)) throw new Error(`${file}: buổi học "${id}" không tồn tại`);
      }
      for (const reference of lesson.references) {
        const expectedKind = "page" in reference ? "pdf" : "vtt";
        if (sourcesById.get(reference.sourceId)?.kind !== expectedKind) {
          throw new Error(`${file}: nguồn "${reference.sourceId}" phải có loại ${expectedKind}`);
        }
        if ("startSeconds" in reference && reference.endSeconds !== undefined &&
            reference.endSeconds <= reference.startSeconds) {
          throw new Error(`${file}: mốc kết thúc VTT phải đứng sau mốc bắt đầu`);
        }
      }
      return lesson;
    })
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));

  indexById(lessons, lessonDirectory);
  return { ...course, topics, sessions, sources, lessons };
}

export function readCatalog(root = path.join(process.cwd(), "content")) {
  const courses = readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map(({ name }) => readCourse(path.join(root, name)))
    .sort((a, b) => a.title.localeCompare(b.title, "vi"));
  const coursesById = indexById(courses, root);
  for (const course of courses) {
    for (const lesson of course.lessons) {
      for (const related of lesson.relatedLessons) {
        if (!coursesById.get(related.courseId)?.lessons.some(({ id }) => id === related.lessonId)) {
          throw new Error(`${course.id}/${lesson.id}: bài liên quan "${related.courseId}/${related.lessonId}" không tồn tại`);
        }
      }
    }
  }
  return courses;
}
