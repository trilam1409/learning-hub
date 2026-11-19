"use client";

import { useState } from "react";
import {
  Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer,
  Scatter, ScatterChart, Tooltip, XAxis, YAxis,
} from "recharts";

type ChartGoal = "trend" | "compare" | "relationship";
const goals: { id: ChartGoal; label: string; reason: string }[] = [
  { id: "trend", label: "Xu hướng theo năm", reason: "Line chart phù hợp cho một đại lượng thay đổi theo thời gian." },
  { id: "compare", label: "So sánh nhóm", reason: "Bar chart giúp nhìn độ lớn giữa các nhóm phân loại." },
  { id: "relationship", label: "Quan sát mối liên hệ", reason: "Scatter plot giúp quan sát hai biến số cùng thay đổi ra sao; tương quan không chứng minh nhân quả." },
];
const temporal = [{ x: 2021, y: 10 }, { x: 2022, y: 15 }, { x: 2023, y: 12 }, { x: 2024, y: 21 }];
const groups = [{ x: "A", y: 10 }, { x: "B", y: 16 }, { x: "C", y: 8 }, { x: "D", y: 18 }];
const pairs = [{ x: 1, y: 2 }, { x: 2, y: 2.8 }, { x: 3, y: 5 }, { x: 4, y: 3.6 }, { x: 5, y: 6.5 }];

export function ChartTypeExplorer() {
  const [goal, setGoal] = useState<ChartGoal>("trend");
  const current = goals.find((item) => item.id === goal)!;
  return (
    <section className="my-6 rounded-xl border border-stone-200 bg-white p-5">
      <h3 className="font-semibold">Chọn câu hỏi, quan sát biểu đồ phù hợp</h3>
      <label htmlFor="chart-goal" className="mt-3 block text-sm">Mục đích trực quan hóa</label>
      <select
        id="chart-goal" value={goal}
        onChange={(event) => setGoal(event.currentTarget.value as ChartGoal)}
        className="mt-2 w-full rounded-lg border border-stone-300 bg-white p-2"
      >
        {goals.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
      <p className="my-3 text-sm text-stone-700">{current.reason}</p>
      <div role="img" aria-label={`Biểu đồ minh họa: ${current.label}`}>
        <ResponsiveContainer width="100%" height={245}>
          {goal === "trend" ? (
            <LineChart data={temporal} margin={{ left: 0, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" /><YAxis width={36} /><Tooltip />
              <Line dataKey="y" name="Số lượng" stroke="#0f766e" strokeWidth={2} />
            </LineChart>
          ) : goal === "compare" ? (
            <BarChart data={groups} margin={{ left: 0, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" /><YAxis width={36} /><Tooltip />
              <Bar dataKey="y" name="Số lượng" fill="#0f766e" />
            </BarChart>
          ) : (
            <ScatterChart margin={{ left: 0, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="Biến X" /><YAxis type="number" dataKey="y" name="Biến Y" width={36} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Quan sát" data={pairs} fill="#0f766e" />
            </ScatterChart>
          )}
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-stone-600">Dữ liệu minh họa tự tạo, không phải kết quả phân tích trong tài liệu của giảng viên.</p>
    </section>
  );
}
