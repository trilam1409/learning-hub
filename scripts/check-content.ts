import { readCatalog } from "../lib/content/catalog.ts";

const courses = readCatalog();
const lessonCount = courses.reduce((total, course) => total + course.lessons.length, 0);
console.log(`Nội dung hợp lệ: ${courses.length} môn, ${lessonCount} bài học.`);
