"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Mode = "minmax" | "zscore";

const source = [20, 40, 60, 80, 100];

export function NormalizationExplorer({ mode = "minmax" }: { mode?: Mode }) {
  const [value, setValue] = useState(60);
  const mean = source.reduce((sum, next) => sum + next, 0) / source.length;
  const variance = source.reduce((sum, next) => sum + (next - mean) ** 2, 0) / source.length;
  const standardDeviation = Math.sqrt(variance);
  const result = mode === "minmax"
    ? (value - Math.min(...source)) / (Math.max(...source) - Math.min(...source))
    : (value - mean) / standardDeviation;
  const normalizedValues = source.map((raw) => ({
    name: String(raw),
    normalized: mode === "minmax" ? (raw - 20) / 80 : (raw - mean) / standardDeviation,
  }));

  return (
    <figure className="my-6 rounded-xl border border-stone-200 bg-white p-5">
      <figcaption className="text-lg font-semibold">
        {mode === "minmax" ? "Thử thay đổi một giá trị với Min-Max" : "Khám phá độ lệch chuẩn bằng Z-score"}
      </figcaption>
      <p className="mt-2 text-sm text-stone-600">
        Bộ dữ liệu cố định: [20, 40, 60, 80, 100]. Kéo thanh trượt để chọn một giá trị cần chuyển đổi.
        Giá trị min, max, trung bình và độ lệch chuẩn được tính từ bộ dữ liệu cố định.
      </p>
      <label className="mt-4 block text-sm font-medium" htmlFor={`normalization-${mode}`}>
        Giá trị đang xem: <strong>{value}</strong>
      </label>
      <input
        id={`normalization-${mode}`}
        type="range" min={20} max={100} step={5} value={value}
        onChange={(event) => setValue(event.currentTarget.valueAsNumber)}
        className="mt-2 w-full accent-teal-700"
      />
      <output className="mt-3 block rounded-lg bg-teal-50 p-3 text-teal-950" aria-live="polite">
        Kết quả: <strong>{result.toFixed(3)}</strong>
        <span className="mt-1 block text-xs">
          {mode === "minmax"
            ? `(${value} - 20) / (100 - 20)`
            : `(${value} - ${mean}) / ${standardDeviation.toFixed(3)}`}
        </span>
      </output>
      <div className="mt-4" role="img" aria-label="Biểu đồ các giá trị của bộ dữ liệu mẫu sau khi chuẩn hóa">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={normalizedValues} margin={{ left: 0, right: 8 }}>
            <XAxis dataKey="name" />
            <YAxis width={45} domain={mode === "minmax" ? [0, 1] : ["auto", "auto"]} />
            <Tooltip formatter={(number) => Number(number).toFixed(3)} />
            <Bar dataKey="normalized" name="Giá trị chuẩn hóa" fill="#0f766e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-stone-600">
        Biểu đồ hiển thị bộ dữ liệu đã chuẩn hóa cố định; thanh trượt chỉ thay đổi giá trị được tính thử.
        Các số liệu hoàn toàn là ví dụ biên soạn để thực hành.
      </p>
    </figure>
  );
}
