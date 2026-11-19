import type { MDXComponents } from "mdx/types";
import { MathFormula } from "@/components/learning/math-formula";
import { MeanChart } from "@/components/learning/mean-chart";
import { Quiz } from "@/components/learning/quiz";
import { NormalizationExplorer } from "@/components/learning/normalization-explorer";
import { ChartTypeExplorer } from "@/components/learning/chart-type-explorer";

export function useMDXComponents(): MDXComponents {
  return { MathFormula, MeanChart, Quiz, NormalizationExplorer, ChartTypeExplorer };
}
