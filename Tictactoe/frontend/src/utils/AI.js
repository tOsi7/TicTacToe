import { checkWin } from "./Game.js";

export function aiRandomMove(board) {
  const empty = board
    .map((v, i) => (v === null ? i : null))
    .filter(v => v !== null);

  return empty[Math.floor(Math.random() * empty.length)];
}

function findWinningMove(board, player) {
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      const copy = [...board];
      copy[i] = player;
      if (checkWin(copy)) return i;
    }
  }
  return null;
}

export function getMediumMove(board) {
  return (
    findWinningMove(board, "O") ??
    findWinningMove(board, "X") ??
    aiRandomMove(board)
  );
}

function minimax(board, isMax) {
  const winner = checkWin(board);

  if (winner === "O") return 1;
  if (winner === "X") return -1;
  if (board.every(c => c !== null)) return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        best = Math.max(best, minimax(board, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        best = Math.min(best, minimax(board, true));
        board[i] = null;
      }
    }
    return best;
  }
}

export function getBestMove(board) {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O";
      let score = minimax(board, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}