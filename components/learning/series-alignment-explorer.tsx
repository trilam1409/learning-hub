"use client";

import { useState } from "react";

type Arrangement = "aligned" | "partial" | "disjoint";
const cases: Record<Arrangement, { left: Array<[string, number]>; right: Array<[string, number]>; description: string }> = {
  aligned: {
    left: [["a", 10], ["b", 20]],
    right: [["a", 1], ["b", 2]],
    description: "Cùng index: mỗi giá trị cộng với phần tử có nhãn tương ứng.",
  },
  partial: {
    left: [["a", 10], ["b", 20]],
    right: [["b", 1], ["c", 2]],
    description: "Khớp một nhãn b; các nhãn chỉ xuất hiện ở một bên cho kết quả NaN.",
  },
  disjoint: {
    left: [["a", 10], ["b", 20]],
    right: [["c", 1], ["d", 2]],
    description: "Không có nhãn chung: tất cả kết quả đều NaN.",
  },
};

export function SeriesAlignmentExplorer() {
  const [arrangement, setArrangement] = useState<Arrangement>("partial");
  const entry = cases[arrangement];
  const left = new Map(entry.left);
  const right = new Map(entry.right);
  const labels = [...new Set([...left.keys(), ...right.keys()])].sort();
  return (
    <div className="my-6 rounded-xl border border-stone-200 bg-white p-5">
      <h3 className="font-semibold">Thử phép cộng giữa hai Series</h3>
      <label htmlFor="series-case" className="mt-3 block text-sm">
        Chọn cách sắp xếp index
      </label>
      <select
        id="series-case" value={arrangement}
        onChange={(event) => setArrangement(event.currentTarget.value as Arrangement)}
        className="mt-2 w-full rounded-lg border border-stone-300 bg-white p-2"
      >
        <option value="aligned">Hai Series cùng index</option>
        <option value="partial">Hai Series có một index chung</option>
        <option value="disjoint">Hai Series hoàn toàn khác index</option>
      </select>
      <p className="mt-2 text-sm text-stone-600">{entry.description}</p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead><tr>
            {["index", "Series A", "Series B", "A + B"].map((label) => <th key={label} scope="col" className="border-b border-stone-200 px-3 py-2">{label}</th>)}
          </tr></thead>
          <tbody>
            {labels.map((label) => {
              const a = left.get(label);
              const b = right.get(label);
              return (
                <tr key={label}>
                  <th scope="row" className="border-b border-stone-100 px-3 py-2">{label}</th>
                  <td className="border-b border-stone-100 px-3 py-2">{a ?? "—"}</td>
                  <td className="border-b border-stone-100 px-3 py-2">{b ?? "—"}</td>
                  <td className="border-b border-stone-100 px-3 py-2 font-medium">{a === undefined || b === undefined ? "NaN" : a + b}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-stone-600">Đây là dữ liệu mô phỏng để minh họa Pandas; không chạy Python trong thành phần này.</p>
    </div>
  );
}
