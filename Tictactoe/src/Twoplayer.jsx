import Board from "./Board.jsx"
import React, {useState} from "react"
import {checkWin} from "./Game.jsx"


function Twoplayer(){
    const [board, setBoard] = useState(Array(9).fill(null)); //initializes board
    const [turn, setTurn] = useState(true);
    const [win, setWin] = useState(null);

    const handleClick = (index) => {
        if(board[index] || win) return;

        const newB = [...board];
        newB[index] = turn ? "X" : "O";
        setBoard(newB);
        setTurn(!turn);

        const winner = checkWin(newB);
        if(winner){
            setWin(winner);
            return;
        }
    }

  const resetGame = ()=>{
        setBoard(Array(9).fill(null));
        setTurn(true);
        setWin(null)
    }

  return(
    <div>
        <Board board={board} onClick={handleClick}  />
        {win && <h2>{win} Wins </h2>}
        {!win && board.every(cell => cell != null) && (<h2>It's a tie</h2>)}
        <button onClick = {resetGame} className = "reset">Reset</button>


    </div>
  );

}

export default Twoplayer