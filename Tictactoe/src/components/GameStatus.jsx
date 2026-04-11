function GameStatus({ win, board }) {
  if (win) return <h2>{win} Wins</h2>;
  if (board.every(cell => cell !== null)) return <h2>It's a tie</h2>;
  return null;
}

export default GameStatus;