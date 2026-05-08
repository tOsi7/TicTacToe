import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

const PORT = //process.env.PORT || 
              5000;

// in-memory leaderboard
let leaderboard = {
  Player: 0,
  AI: 0,
};

// GET leaderboard
app.get("/scores", (req, res) => {
  const formatted = Object.keys(leaderboard).map(key => ({
    player: key,
    score: leaderboard[key]
  }));

  res.json(formatted);
});

// POST = increment score
app.post("/scores", (req, res) => {
  const { player } = req.body;

  if (!leaderboard[player]) {
    leaderboard[player] = 0;
  }

  leaderboard[player] += 1;

  res.json({
    player,
    score: leaderboard[player]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});