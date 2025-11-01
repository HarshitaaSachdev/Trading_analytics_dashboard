import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

export default function MetricCard({ metric, isDark }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const Icon = metric.icon;
  const isPositive = metric.trend === "up";
  const isProfitFactor = metric.title.toLowerCase() === "profit factor";

  // --- Profit Factor Logic ---
  const pfValue = parseFloat(metric.value) || 0;
  const normalizedPF = Math.min(pfValue / 3, 1); // Cap at 3 for visual clarity
  const greenPercent = normalizedPF * 100;
  const redPercent = 100 - greenPercent;

  // Create conic gradient: green to red split
  const ringStyle = {
    background: `conic-gradient(#10b981 ${greenPercent}%, #ef4444 ${greenPercent}% 100%)`,
  };

  return (
    <div
      className={`${
        isDark
          ? 'bg-slate-800/50 border-slate-700 hover:border-emerald-500/50'
          : 'bg-white border-gray-200 hover:border-emerald-500'
      } border rounded-xl p-5 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer group relative`}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 w-max mt-2 p-3 rounded-lg shadow-xl z-10 border text-xs ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-slate-300'
              : 'bg-white border-gray-200 text-gray-700'
          }`}
        >
          {metric.description}
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-2.5 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-300 ${
            isDark ? 'bg-slate-700/50' : 'bg-gray-100'
          }`}
        >
          <Icon
            className={`w-4 h-4 group-hover:text-emerald-400 transition-colors duration-300 ${
              isDark ? 'text-slate-300' : 'text-gray-600'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-medium uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-gray-500'
            }`}
          >
            {metric.title}
          </span>
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className={`p-1 rounded hover:bg-emerald-500/20 transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-emerald-400'
                : 'text-gray-400 hover:text-emerald-500'
            }`}
          >
            <Info className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <p
          className={`text-3xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {metric.value}
          {metric.suffix || ''}
        </p>

        {/* Profit Factor Ring */}
        {isProfitFactor ? (
          <div
            className="w-10 h-10 rounded-full p-[2px]"
            style={ringStyle}
          >
            <div
              className={`w-full h-full rounded-full ${
                isDark ? 'bg-slate-900' : 'bg-white'
              } flex items-center justify-center`}
            >
              <div
                className={`w-8 h-8 rounded-full ${
                  isDark ? 'bg-slate-800' : 'bg-gray-50'
                }`}
              />
            </div>
          </div>
        ) : (
          isPositive ? (
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )
        )}
      </div>
    </div>
  );
}
