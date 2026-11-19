import type { MDXComponents } from "mdx/types";
import { MathFormula } from "@/components/learning/math-formula";
import { MeanChart } from "@/components/learning/mean-chart";
import { Quiz } from "@/components/learning/quiz";

export function useMDXComponents(): MDXComponents {
  return { MathFormula, MeanChart, Quiz };
}
