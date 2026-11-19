"use client";

import { useState } from "react";
import { Bar, BarChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function MeanChart() {
  const [lastValue, setLastValue] = useState(6);
  const values = [2, 4, lastValue];
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const formattedMean = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 2 }).format(mean);
  const data = values.map((value, i) => ({ label: `Giá trị ${i + 1}`, value }));

  return (
    <figure className="my-6 rounded-xl border border-stone-200 bg-white p-5">
      <figcaption className="font-semibold">Giá trị thay đổi, trung bình thay đổi thế nào?</figcaption>
      <label className="mt-4 block text-sm">
        Giá trị thứ ba: <strong>{lastValue}</strong>
        <input
          type="range"
          min={0}
          max={12}
          step={1}
          value={lastValue}
          onChange={(event) => setLastValue(event.currentTarget.valueAsNumber)}
          className="mt-2 block w-full accent-teal-700"
        />
      </label>
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 12, right: 16, bottom: 0, left: 0 }}>
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis width={34} domain={[0, 12]} allowDecimals={false} />
            <Tooltip />
            <Bar name="Giá trị" dataKey="value" fill="#0f766e" isAnimationActive={false} />
            <ReferenceLine y={mean} stroke="#9a3412" strokeWidth={2} strokeDasharray="5 3" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <output className="mt-2 block text-sm text-stone-700">
        Dữ liệu: {values.join(", ")}. Trung bình (đường nét đứt): <strong>{formattedMean}</strong>.
      </output>
    </figure>
  );
}
