import katex from "katex";
import "katex/dist/katex.min.css";

export function MathFormula({ latex }: { latex: string }) {
  const html = katex.renderToString(latex, { displayMode: true, throwOnError: true, trust: false });
  return <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />;
}
