import React, { useState } from 'react';
import { Info } from 'lucide-react';

export default function StatCard({ stat, isDark }) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Safety check
  if (!stat) return null;

  // Progress ring values
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(stat.progress || 0, 0), 1); // 0 to 1
  const offset = circumference - progress * circumference;

  return (
    <div
      className={`${
        isDark
          ? 'bg-slate-800/50 border-slate-700 hover:border-emerald-500/40'
          : 'bg-white border-gray-200 hover:border-emerald-500'
      } border rounded-xl p-4 hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-300 hover:scale-105 cursor-pointer relative`}
    >
      {/* Tooltip */}
      {showTooltip && stat.description && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2 rounded-lg shadow-xl z-10 border text-xs w-max max-w-xs animate-fadeIn ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-slate-300'
              : 'bg-white border-gray-200 text-gray-700'
          }`}
        >
          {stat.description}
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <p
              className={`text-xs uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-gray-500'
              }`}
            >
              {stat.label}
            </p>
            {stat.description && (
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
            )}
          </div>

          <p
            className={`text-2xl font-bold ${
              stat.positive === true
                ? 'text-emerald-400'
                : stat.positive === false
                ? 'text-red-400'
                : isDark
                ? 'text-white'
                : 'text-gray-900'
            }`}
          >
            {stat.value}
          </p>
        </div>

        {/* Circular profit ring */}
        {stat.showRing && (
          <svg
            width="48"
            height="48"
            viewBox="0 0 40 40"
            className="-mt-1"
          >
            {/* Background circle */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              fill="none"
              stroke={isDark ? '#334155' : '#e5e7eb'}
              strokeWidth="4"
            />
            {/* Progress circle */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              fill="none"
              stroke={progress >= 0.5 ? '#10b981' : '#ef4444'} // green if good, red if poor
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
            />
          </svg>
        )}
      </div>

      {/* Fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -2px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
