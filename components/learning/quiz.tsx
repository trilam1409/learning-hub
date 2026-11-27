"use client";

import { usePathname } from "next/navigation";
import { recordQuizAnswer } from "./study-progress";
import { useId, useState } from "react";

type QuizProps = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export function Quiz({ question, options, correctIndex, explanation }: QuizProps) {
  const group = useId();
  const pathname = usePathname();
  const anchor = "cau-hoi-" + Array.from(question).reduce((hash, char) =>
    (Math.imul(hash, 31) + char.codePointAt(0)!) >>> 0, 0).toString(36);
  const [selected, setSelected] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const correct = selected === correctIndex;

  return (
    <form
      id={anchor}
      className="my-6 scroll-mt-6 rounded-xl border border-stone-200 bg-white p-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (selected !== undefined && !submitted) {
          setSubmitted(true);
          recordQuizAnswer(pathname, question, anchor, correct);
        }
      }}
    >
      <fieldset className="space-y-2">
        <legend className="mb-3 font-semibold">{question}</legend>
        {options.map((option, index) => (
          <label key={option} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-stone-200 px-3 py-2 has-checked:border-teal-700 has-checked:bg-teal-50 has-focus-visible:outline-2 has-focus-visible:outline-teal-700">
            <input
              className="size-4 shrink-0 accent-teal-700"
              type="radio"
              name={group}
              value={index}
              checked={selected === index}
              onChange={() => {
                setSelected(index);
                setSubmitted(false);
              }}
            />
            {option}
          </label>
        ))}
      </fieldset>
      <button
        type="submit"
        disabled={selected === undefined || submitted}
        className="mt-4 rounded-lg bg-teal-800 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        Kiểm tra đáp án
      </button>
      <div aria-live="polite">
        {submitted && (
          <div className={`mt-4 rounded-lg p-3 text-sm ${correct ? "bg-teal-50 text-teal-950" : "bg-amber-50 text-amber-950"}`}>
            <strong>{correct ? "✓ Chính xác." : `✕ Chưa đúng. Đáp án: ${options[correctIndex]}.`}</strong>{" "}
            {explanation}
          </div>
        )}
      </div>
    </form>
  );
}
