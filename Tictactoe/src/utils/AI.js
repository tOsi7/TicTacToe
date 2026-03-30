const aiMove = (newB) => {
    const empty = newB
      .map((val, idx) => (val === null ? idx : null))
      .filter((v) => v !== null);

    if (empty.length === 0) return;

    const move = empty[Math.floor(Math.random() * empty.length)];
    newBoard[move] = "O";
    return newBoard;
  };