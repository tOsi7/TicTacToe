import Board from "../components/Board.jsx";
import React, { useState } from "react";
import { checkWin } from "../utils/Game.js";

function Twoplayer() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  const [win, setWin] = useState(null);
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);

  const handleClick = (index) => {
    if (board[index] || win) return;

    const newB = [...board];
    newB[index] = turn ? "X" : "O";
    setBoard(newB);

    const winner = checkWin(newB);
    if (winner) {
      setWin(winner);
      turn ? setPlayer1(p => p + 1) : setPlayer2(p => p + 1);
      return;
    }

    setTurn(!turn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(true);
    setWin(null);
  };

  return (
    <div className="game">
      <h1>P1: {player1} | P2: {player2}</h1>

      <Board board={board} onClick={handleClick} />

      {win && <h2>{win} Wins</h2>}
      {!win && board.every(c => c !== null) && <h2>It's a tie</h2>}

      <button onClick={resetGame} className="reset">
        Reset
      </button>
    </div>
  );
}

export default Twoplayer;