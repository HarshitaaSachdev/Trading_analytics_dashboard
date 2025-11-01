
import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Target,
  Award,
  AlertCircle,
} from "lucide-react";

import MetricCard from "./components/MetricCard";
import StatCard from "./components/StatCard";
import ThemeToggle from "./components/ThemeToggle";
import PerformanceChart from "./components/PerformanceChart";

export default function Dashboard() {
  // State Variables
  const [data, setData] = useState(null); // Stores fetched analytics data
  const [error, setError] = useState(null); // Stores API errors if any
  const [isDark, setIsDark] = useState(true); // Dark mode toggle state


  // Fetch Analytics Data

  useEffect(() => {
    fetch("http://localhost:8081/analytics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((fetchedData) => {
        console.log("Fetched data:", fetchedData); // Debugging log
        setData(fetchedData);
      })
      .catch((err) => {
        console.error("Error fetching analytics:", err);
        setError(err.message);
      });
  }, []);

  // Toggle dark/light theme
  const toggleTheme = () => setIsDark(!isDark);


  // Error State UI
  
  if (error) {
    return (
      <div
        className={`min-h-screen p-6 flex items-center justify-center ${
          isDark ? "bg-slate-900" : "bg-gray-50"
        }`}
      >
        <div className="bg-red-950/30 backdrop-blur-sm border border-red-900/50 text-red-400 px-8 py-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5" />
            <p className="font-semibold">Failed to load analytics</p>
          </div>
          <p className="text-sm text-red-400/70">{error}</p>
        </div>
      </div>
    );
  }

  // Loading State UI
  if (!data) {
    return (
      <div
        className={`min-h-screen p-6 flex items-center justify-center ${
          isDark ? "bg-slate-900" : "bg-gray-50"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-12 h-12 border-2 border-t-emerald-500 rounded-full animate-spin ${
              isDark ? "border-slate-700" : "border-gray-300"
            }`}
          ></div>
          <p
            className={`text-sm font-medium ${
              isDark ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  // Metrics Definitions
  const primaryMetrics = [
    {
      title: "Win Rate",
      value: data.winRate,
      suffix: "%",
      icon: Target,
      trend: "up",
      description:
        "Percentage of profitable trades out of total trades executed",
    },
    {
      title: "Profit Factor",
      value: data.profitFactor,
      icon: Award,
      trend: "up",
      description:
        "Ratio of gross profit to gross loss. Values > 1 indicate profitability",
    },
    {
      title: "Sharpe Ratio",
      value: data.sharpeRatio,
      icon: Activity,
      trend: "up",
      description:
        "Risk-adjusted return metric. Higher values indicate better risk-adjusted performance",
    },
    {
      title: "Max Drawdown",
      value: Math.abs(data.maxDrawdown),
      suffix: "%",
      icon: TrendingDown,
      trend: "down",
      description:
        "Largest peak-to-trough decline in portfolio value. Lower is better",
    },
  ];

  const secondaryStats = [
    {
      label: "Total Trades",
      value: data.totalTrades,
      description: "Total number of trades executed in the period",
    },
    {
      label: "Winning",
      value: data.winningTrades,
      positive: true,
      description: "Number of trades that resulted in profit",
    },
    {
      label: "Losing",
      value: data.losingTrades,
      positive: false,
      description: "Number of trades that resulted in loss",
    },
    {
      label: "Avg Return",
      value: `${data.averageReturn}%`,
      positive: data.averageReturn > 0,
      description: "Average percentage return per trade",
    },
    {
      label: "Win Streak",
      value: data.longestWinStreak,
      description: "Maximum consecutive winning trades",
    },
    {
      label: "Loss Streak",
      value: data.longestLossStreak,
      description: "Maximum consecutive losing trades",
    },
  ];

  // Render Dashboard
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* 
          Header Section
       */}
      <div
        className={`border-b backdrop-blur-sm ${
          isDark 
            ? "border-slate-800 bg-slate-900/50" 
            : "border-gray-200 bg-white/50"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            {/* Title and subtitle with enhanced styling */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${
                  isDark 
                    ? "from-emerald-400 to-emerald-600" 
                    : "from-emerald-500 to-emerald-700"
                }`}></div>
                <h1 className={`text-4xl font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent ${
                  isDark
                    ? "from-white via-slate-100 to-slate-300"
                    : "from-gray-900 via-gray-800 to-gray-700"
                }`}>
                  Trading Analytics
                </h1>
              </div>
              <p
                className={`text-sm font-medium ml-7 ${
                  isDark ? "text-slate-400" : "text-gray-500"
                }`}
              >
                Performance overview and real-time metrics
              </p>
            </div>

            {/* Theme toggle + Live indicator */}
            <div className="flex items-center gap-4">
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
              <div
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border shadow-sm ${
                  isDark
                    ? "bg-slate-800/80 border-slate-700/50 shadow-emerald-500/5"
                    : "bg-white border-gray-200 shadow-emerald-500/10"
                }`}
              >
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span
                  className={`text-xs font-semibold tracking-wide ${
                    isDark ? "text-emerald-400" : "text-emerald-600"
                  }`}
                >
                  LIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
          Main Content Section
       */}
      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
        {/* ---- Primary Metrics ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {primaryMetrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} isDark={isDark} />
          ))}
        </div>

        {/* ---- Profit & Loss Section ---- */}
        <div
          className={`${
            isDark
              ? "bg-slate-800/50 border-slate-700 hover:border-emerald-500/30"
              : "bg-white border-gray-200 hover:border-emerald-500"
          } border rounded-xl p-6 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 cursor-pointer`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-slate-700/50" : "bg-gray-100"
              }`}
            >
              <DollarSign
                className={`w-5 h-5 ${
                  isDark ? "text-slate-300" : "text-gray-600"
                }`}
              />
            </div>
            <h2 className="text-lg font-semibold">Profit & Loss</h2>
          </div>

          {/* Total Profit/Loss Summary */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p
                className={`text-sm mb-2 ${
                  isDark ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Total P/L
              </p>
              <p
                className={`text-4xl font-bold tracking-tight ${
                  data.plBreakdown.profit >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                ${Math.abs(data.plBreakdown.profit).toLocaleString()}
              </p>
            </div>

            {/* Percentage Change Indicator */}
            <div className="flex items-end justify-end">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                  data.plBreakdown.percent > 0
                    ? "bg-emerald-500/20 border border-emerald-500/30"
                    : "bg-red-500/20 border border-red-500/30"
                }`}
              >
                {data.plBreakdown.percent > 0 ? (
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span
                  className={`text-xl font-bold ${
                    data.plBreakdown.percent > 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {data.plBreakdown.percent > 0 ? "+" : ""}
                  {data.plBreakdown.percent}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Secondary Stats ---- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {secondaryStats.map((stat, i) =>
            stat ? <StatCard key={i} stat={stat} isDark={isDark} /> : null
          )}
        </div>

        {/* ---- Recent Performance Chart ---- */}
        <div
          className={`${
            isDark
              ? "bg-slate-800/50 border-slate-700 hover:border-emerald-500/30"
              : "bg-white border-gray-200 hover:border-emerald-500"
          } border rounded-xl p-6 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-1">Recent Performance</h2>
              <p
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Last 10 trades analysis
              </p>
            </div>
          </div>

          {/* Performance Line Chart */}
          <PerformanceChart data={data.recentTrades} isDark={isDark} />
        </div>
      </div>
    </div>
  );
}
