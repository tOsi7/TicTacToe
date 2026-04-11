import React, { useState, useEffect } from "react";
import Board from "../components/Board.jsx";
import { checkWin } from "../utils/Game.js";
import { aiRandomMove, getMediumMove, getBestMove } from "../utils/AI.js";

function Oneplayer() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  const [win, setWin] = useState(null);

  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);

  const [difficulty, setDifficulty] = useState("easy");
  const [scores, setScores] = useState([]);

  const [gameOver, setGameOver] = useState(false);

  // 🔥 fetch leaderboard
  const fetchScores = async () => {
    try {
      const res = await fetch("http://localhost:5000/scores");
      const data = await res.json();
      setScores(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  // 🔥 update backend
  const saveScore = async (player, score) => {
    try {
      await fetch("http://localhost:5000/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player, score })
      });

      fetchScores();
    } catch (err) {
      console.error(err);
    }
  };

  // 🎮 PLAYER MOVE
  const handleClick = (index) => {
    if (board[index] || win || !turn || gameOver) return;

    const newB = [...board];
    newB[index] = "X";
    setBoard(newB);

    const winner = checkWin(newB);

    if (winner) {
      setWin(winner);
      setGameOver(true);

      setPlayer1(p => {
        const newScore = p + 1;
        saveScore("Player", newScore);
        return newScore;
      });

      return;
    }

    setTurn(false);
    setTimeout(() => aiPlay(newB), 300);
  };

  // 🤖 AI MOVE
  const aiPlay = (currentB) => {
    if (win || gameOver) return;

    let move;

    if (difficulty === "easy") move = aiRandomMove(currentB);
    else if (difficulty === "medium") move = getMediumMove(currentB);
    else move = getBestMove(currentB);

    if (move === undefined) return;

    const newB = [...currentB];
    newB[move] = "O";
    setBoard(newB);

    const winner = checkWin(newB);

    if (winner) {
      setWin(winner);
      setGameOver(true);

      setPlayer2(p => {
        const newScore = p + 1;
        saveScore("AI", newScore);
        return newScore;
      });

      return;
    }

    setTurn(true);
  };

  // 🔄 RESET
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(true);
    setWin(null);
    setGameOver(false);
  };

  return (
    <div className="game">

      <h1>Player: {player1} | AI: {player2}</h1>

      {/* Difficulty */}
      <div className="difficulty">
        <button onClick={() => setDifficulty("easy")}>Easy</button>
        <button onClick={() => setDifficulty("medium")}>Medium</button>
        <button onClick={() => setDifficulty("hard")}>Hard</button>
      </div>

      {/* Board */}
      <Board board={board} onClick={handleClick} />

      {/* Status */}
      {win && <h2>{win === "X" ? "Player Wins" : "AI Wins"}</h2>}
      {!win && board.every(c => c !== null) && <h2>It's a tie</h2>}

      {/* Leaderboard */}
      <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {scores.map((s, i) => (
          <li key={i}>
            {s.player}: {s.score}
          </li>
        ))}
      </ul>
      </div>

      {/* Reset */}
      <button onClick={resetGame} className="reset">
        Reset
      </button>
    </div>
  );
}

export default Oneplayer;