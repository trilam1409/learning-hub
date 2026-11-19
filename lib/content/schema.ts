import { z } from "zod";

export const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const label = z.string().trim().min(1);
const order = z.number().int().positive();
const webUrl = z.url({ protocol: /^https?$/ });

export const courseSchema = z.strictObject({
  id: slug,
  title: label,
  semesterId: slug,
  description: label,
  chatgptProjectUrl: webUrl.optional(),
});

export const topicsSchema = z.array(z.strictObject({ id: slug, title: label, order }));
export const sessionsSchema = z.array(z.strictObject({
  id: slug,
  title: label,
  number: order,
  date: z.iso.date().optional(),
}));

export const sourcesSchema = z.array(z.strictObject({
  id: slug,
  title: label,
  kind: z.enum(["pdf", "vtt"]),
  url: webUrl.optional(),
}));

const pdfReference = z.strictObject({
  sourceId: slug,
  page: order,
});
const transcriptReference = z.strictObject({
  sourceId: slug,
  startSeconds: z.number().nonnegative(),
  endSeconds: z.number().nonnegative().optional(),
});

export const lessonSchema = z.strictObject({
  id: slug,
  title: label,
  summary: label,
  order,
  topicIds: z.array(slug).min(1),
  // An empty sessionIds marks a lesson for self-study before its class session exists.
  sessionIds: z.array(slug),
  relatedLessons: z.array(z.strictObject({ courseId: slug, lessonId: slug })).default([]),
  references: z.array(z.union([pdfReference, transcriptReference])).default([]),
});
