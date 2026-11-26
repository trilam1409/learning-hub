import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { readCatalog } from "../lib/content/catalog.ts";
import { courseDocuments } from "../lib/content/documents.ts";

const course = readCatalog().find(({ id }) => id === "information-security")!;
const root = path.join(process.cwd(), "content", course.id);
const original = path.join(root, "original");
const base = `/courses/${course.id}`;
const documents = { "README.md": "guide", "TOC.md": "contents", "SOURCES.md": "sources", "SOURCE_COVERAGE.md": "source-coverage" };
const routes = new Map(Object.entries(documents).map(([file, id]) => [file, `${base}/documents/${id}`]));
const lessonFiles = readdirSync(original).filter((name) => name.startsWith("session-")).sort()
  .flatMap((directory) => readdirSync(path.join(original, directory)).sort().map((file) => `${directory}/${file}`));
for (const file of lessonFiles) routes.set(file, `${base}/lessons/${path.dirname(file)}-${path.basename(file, ".md")}`);

function read(file: string) { return readFileSync(file, "utf8"); }
function canonical(text: string) { return text.replaceAll("&lt;", "<").replaceAll("&#123;", "{").replaceAll("&#125;", "}").replace(/\s+/g, " ").trim(); }
function rewriteLinks(text: string, file: string) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, target: string) => {
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), target));
    assert(routes.has(resolved), `Broken source link: ${file} -> ${target}`);
    return `[${label}](${routes.get(resolved)})`;
  });
}
assert.equal(course.sessions.length, 5);
assert.equal(course.lessons.length, 21);
assert.deepEqual(course.sessions.map(({ number }) => number), [1, 2, 3, 4, 5]);
assert.deepEqual(course.sessions.map(({ id }) => course.lessons.filter(({ sessionIds }) => sessionIds.includes(id)).length), [4, 4, 5, 3, 5]);
assert.equal(courseDocuments[course.id].length, 4);
let questionCount = 0;
for (const [index, file] of lessonFiles.entries()) {
  const source = read(path.join(original, file));
  const lesson = course.lessons[index];
  assert.equal(lesson.id, `${path.dirname(file)}-${path.basename(file, ".md")}`);
  assert.equal(lesson.title, source.split("\n")[0].slice(2));
  assert.equal(lesson.summary, source.split("\n")[2]);
  const rendered = read(path.join(root, "lessons", `${lesson.id}.mdx`)).replace(/^---\n[\s\S]*?\n---\n/, "");
  const quizzes = [...rendered.matchAll(/<Quiz question=\{("(?:[^"\\]|\\.)*")\} options=\{(\[[^\n]*\])\} correctIndex=\{(\d)\} explanation=\{("(?:[^"\\]|\\.)*")\} \/>/g)];
  const questions = [...source.matchAll(/### Câu (\d+)\n\n([\s\S]*?)\n\n((?:- [A-D]\. [^\n]*\n){4})\n\*\*Đáp án ([A-D])\.\*\* ([\s\S]*?)(?=\n\n### Câu|\n\n## Nguồn)/g)];
  assert.equal(quizzes.length, 3, file);
  assert.equal(questions.length, 3, file);
  for (let n = 0; n < 3; n++) {
    const question = questions[n], quiz = quizzes[n];
    assert.equal(JSON.parse(quiz[1]), `Câu ${question[1]}. ${question[2]}`);
    assert.deepEqual(JSON.parse(quiz[2]), question[3].trim().split("\n").map((line) => line.slice(2)));
    assert.equal(Number(quiz[3]), question[4].charCodeAt(0) - 65);
    assert.equal(JSON.parse(quiz[4]), `Đáp án ${question[4]}. ${question[5].replaceAll("**", "")}`);
  }
  // Compare all prose, examples, formulas, tables and citations outside the transformed quizzes.
  let sourceBody = source.split("\n").slice(3).join("\n");
  let renderedBody = rendered;
  for (const question of questions) sourceBody = sourceBody.replace(question[0], "QUIZ");
  for (const quiz of quizzes) renderedBody = renderedBody.replace(quiz[0], "QUIZ");
  assert.equal(canonical(renderedBody), canonical(rewriteLinks(sourceBody, file)), file);
  questionCount += quizzes.length;
}
for (const [file, id] of Object.entries(documents)) {
  assert.equal(canonical(read(path.join(root, "documents", `${id}.mdx`))), canonical(rewriteLinks(read(path.join(original, file)), file)), file);
}
assert.equal(questionCount, 63);
console.log("Đối chiếu gói nhập đạt: 5 buổi, 21 bài, 63 quiz, 4 tài liệu; nguyên vẹn nội dung và liên kết.");
