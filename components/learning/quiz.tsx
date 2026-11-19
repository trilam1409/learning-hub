"use client";

import { useId, useState } from "react";

type QuizProps = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export function Quiz({ question, options, correctIndex, explanation }: QuizProps) {
  const group = useId();
  const [selected, setSelected] = useState<number>();
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="my-6 rounded-xl border border-stone-200 bg-white p-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (selected !== undefined) setSubmitted(true);
      }}
    >
      <fieldset className="space-y-2">
        <legend className="mb-3 font-semibold">{question}</legend>
        {options.map((option, index) => (
          <label key={option} className="flex cursor-pointer items-center gap-2">
            <input
              className="accent-teal-700"
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
          <div className="mt-4 rounded-lg bg-stone-100 p-3 text-sm text-stone-800">
            <strong>{selected === correctIndex ? "Chính xác." : `Đáp án đúng: ${options[correctIndex]}.`}</strong>{" "}
            {explanation}
          </div>
        )}
      </div>
    </form>
  );
}
