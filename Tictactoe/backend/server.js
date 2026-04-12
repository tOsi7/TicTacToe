import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ proper leaderboard (no duplicates)
let leaderboard = {
  Player: 0,
  AI: 0
};

app.get("/scores", (req, res) => {
  const formatted = Object.keys(leaderboard).map(key => ({
    player: key,
    score: leaderboard[key]
  }));
  res.json(formatted);
});

app.post("/scores", (req, res) => {
  const { player, score } = req.body;

  leaderboard[player] = score;

  res.json({ message: "Updated" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});