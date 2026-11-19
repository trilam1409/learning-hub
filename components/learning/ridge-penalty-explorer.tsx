"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, ComposedChart, Line, ResponsiveContainer, Scatter, Tooltip, XAxis, YAxis } from "recharts";

const observations = [
  { x: 0, y: 1.0 }, { x: 1, y: 2.3 }, { x: 2, y: 2.2 },
  { x: 3, y: 3.7 }, { x: 4, y: 3.9 }, { x: 5, y: 5.1 },
];

export function RidgePenaltyExplorer() {
  const [alpha, setAlpha] = useState(0);
  const { slope, intercept, predicted } = useMemo(() => {
    const meanX = observations.reduce((s, v) => s + v.x, 0) / observations.length;
    const meanY = observations.reduce((s, v) => s + v.y, 0) / observations.length;
    const numerator = observations.reduce((s, v) => s + (v.x - meanX) * (v.y - meanY), 0);
    const denominator = observations.reduce((s, v) => s + (v.x - meanX) ** 2, 0);
    // Analytical 1D Ridge regression with an unpenalized intercept.
    const slope = numerator / (denominator + alpha);
    const intercept = meanY - slope * meanX;
    return { slope, intercept, predicted: observations.map((v) => ({ ...v, fit: intercept + slope * v.x })) };
  }, [alpha]);

  return (
    <figure className="my-6 rounded-xl border border-stone-200 bg-white p-5">
      <figcaption className="font-semibold">Ridge: điều gì xảy ra khi tăng alpha?</figcaption>
      <p className="mt-2 text-sm text-stone-600">Dữ liệu đơn biến do Learning Hub tạo để minh họa hệ số co lại khi tăng regularization. Không phải bộ dữ liệu xe của slide.</p>
      <label htmlFor="ridge-alpha" className="mt-4 block text-sm font-medium">Hệ số alpha: {alpha}</label>
      <input
        id="ridge-alpha" type="range" min="0" max="100" step="1"
        value={alpha} onChange={(event) => setAlpha(event.currentTarget.valueAsNumber)}
        className="mt-2 w-full accent-teal-700"
      />
      <p className="mt-3 rounded-lg bg-teal-50 p-3 text-sm">
        Dự đoán: y = {intercept.toFixed(2)} + ({slope.toFixed(2)})x
      </p>
      <div role="img" aria-label="Đường hồi quy Ridge thay đổi khi chỉnh alpha" className="mt-4">
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={predicted} margin={{ left: 0, right: 16 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" domain={[0, 5]} />
            <YAxis type="number" domain={[0, 6]} width={38} />
            <Tooltip />
            <Line type="linear" dataKey="fit" name="Dự đoán Ridge" stroke="#0f766e" dot={false} strokeWidth={2} isAnimationActive={false} />
            <Scatter dataKey="y" name="Giá trị thực" fill="#b45309" isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-stone-600">Alpha cao hơn làm hệ số dốc nhỏ hơn trong ví dụ đơn biến đã căn giữa. Bài toán nhiều biến cần chuẩn hóa phù hợp và kiểm chứng chéo.</p>
    </figure>
  );
}
