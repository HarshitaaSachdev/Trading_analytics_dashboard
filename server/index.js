import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 8081;

//function simulates trading analytics data
function generateAnalyticsData() {
  return {
    winRate: (Math.random() * 40 + 60).toFixed(1),
    profitFactor: (Math.random() * 2 + 1).toFixed(2),
    averageReturn: (Math.random() * 4 - 2).toFixed(2),
    maxDrawdown: (Math.random() * 15).toFixed(2),
    totalTrades: Math.floor(Math.random() * 200 + 50),
    winningTrades: Math.floor(Math.random() * 100 + 30),
    losingTrades: Math.floor(Math.random() * 50 + 10),
    longestWinStreak: Math.floor(Math.random() * 8 + 1),
    longestLossStreak: Math.floor(Math.random() * 4 + 1),
    sharpeRatio: (Math.random() * 1.5 + 0.5).toFixed(2),
    plBreakdown: {
      profit: Math.floor(Math.random() * 10000 - 2000),
      percent: (Math.random() * 20 - 5).toFixed(2),
    },
    recentTrades: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      symbol: ["AAPL", "TSLA", "GOOG", "AMZN", "NFLX"][
        Math.floor(Math.random() * 5)
      ],
      result: parseFloat((Math.random() * 4 - 2).toFixed(2)),
    })),
  };
}

// Root route
app.get("/", (req, res) => {
  try {
    res.status(200).send("Server is running");
  } catch (error) {
    console.error("Error handling root route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Analytics route
app.get("/analytics", (req, res) => {
  try {
    const data = generateAnalyticsData();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error generating analytics data:", error.message);
    res.status(500).json({ error: "Failed to generate analytics data" });
  }
});

// Global error handler (for unhandled errors)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${PORT}`);
});
