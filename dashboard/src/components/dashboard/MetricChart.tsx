"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendPoint } from "@/types/server";

interface MetricChartProps {
  title: string;
  dataKey: "cpu" | "memory" | "disk";
  data: TrendPoint[];
}

function getLineColor(dataKey: "cpu" | "memory" | "disk") {
  if (dataKey === "cpu") return "#38bdf8"; // sky
  if (dataKey === "memory") return "#34d399"; // emerald
  return "#f59e0b"; // amber
}

export default function MetricChart({
  title,
  dataKey,
  data,
}: MetricChartProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="#94a3b8"
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={getLineColor(dataKey)}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
