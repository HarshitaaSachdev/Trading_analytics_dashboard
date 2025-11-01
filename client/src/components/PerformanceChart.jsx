

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceChart({ data, isDark }) {
  return (
    <div
      className={`${
        isDark
          ? "bg-slate-800/50 border-slate-700 hover:border-emerald-500/30"
          : "bg-white border-gray-200 hover:border-emerald-500"
      } border rounded-xl p-6 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300`}
    >
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Performance Chart</h2>
          <p
            className={`text-sm ${
              isDark ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Overview of stock results
          </p>
        </div>
      </div>

      {/* Line Chart Container */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          {/* ====== Chart Definitions ====== */}
          <defs>
            {/* Gradient for line color */}
            <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isDark ? "#34d399" : "#10b981"} // emerald green
                stopOpacity={0.9}
              />
              <stop
                offset="100%"
                stopColor={isDark ? "#34d399" : "#10b981"}
                stopOpacity={0.1}
              />
            </linearGradient>

            {/* Glow filter for line */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ====== Chart Layout ====== */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#334155" : "#e5e7eb"}
            vertical={false}
          />

          {/* X-Axis (Stock Symbols) */}
          <XAxis
            dataKey="symbol"
            stroke={isDark ? "#94a3b8" : "#6b7280"}
            style={{ fontSize: "12px", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y-Axis (Result %) */}
          <YAxis
            stroke={isDark ? "#94a3b8" : "#6b7280"}
            style={{ fontSize: "12px" }}
            axisLine={false}
            tickLine={false}
          />

          {/* ====== Custom Tooltip ====== */}
          <Tooltip
            cursor={false} // disable default hover line
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const value = payload[0].value;
                const isPositive = value >= 0;

                return (
                  <div
                    style={{
                      backgroundColor: isDark ? "#1e293b" : "#ffffff",
                      border: `1px solid ${
                        isDark ? "#475569" : "#e5e7eb"
                      }`,
                      borderRadius: "8px",
                      padding: "10px 14px",
                      fontSize: "12px",
                      color: isDark ? "#cbd5e1" : "#374151",
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
                    <p
                      style={{
                        margin: "4px 0 0",
                        color: isPositive ? "#34d399" : "#f87171", // green/red
                        fontWeight: 600,
                      }}
                    >
                      {isPositive ? "+" : ""}
                      {value}%
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          {/* ====== Line Style ====== */}
          <Line
            type="monotone" // smooth curve
            dataKey="result"
            stroke="url(#lineColor)" // gradient stroke
            strokeWidth={2.5}
            dot={false} // remove all dots
            activeDot={{
              // show a glowing dot on hover
              r: 6,
              fill: isDark ? "#34d399" : "#10b981",
              stroke: isDark ? "#1e293b" : "#ffffff",
              strokeWidth: 2,
            }}
            filter="url(#glow)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
