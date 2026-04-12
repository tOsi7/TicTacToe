import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "*" // later you can restrict to your Vercel URL
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ backend owns score logic (IMPORTANT)
let leaderboard = {
  Player: 0,
  AI: 0
};

// GET leaderboard
app.get("/scores", (req, res) => {
  const formatted = Object.keys(leaderboard).map(key => ({
    player: key,
    score: leaderboard[key]
  }));

  res.json(formatted);
});

// POST score update (increment)
app.post("/scores", (req, res) => {
  const { player } = req.body;

  if (!player) {
    return res.status(400).json({ error: "Player required" });
  }

  leaderboard[player] = (leaderboard[player] || 0) + 1;

  res.json({
    message: "Updated",
    leaderboard
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});