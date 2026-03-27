import Board from "./Board.jsx"
import React, {useState} from "react"
import {checkWin} from "./Game.jsx"


function Oneplayer(){

  
    const [board, setBoard] = useState(Array(9).fill(null)); //initializes board
    const [turn, setTurn] = useState(true);
    const [win, setWin] = useState(null)
    const handleClick = (index) => {
        if(board[index]) return;

        const newB = [...board];
        newB[index] = "X";
        setBoard(newB);
        setTurn(!turn);

        const winner = checkWin(newB);
        if(winner){
            setWin(winner);
            return;
        }

        setTimeout(() => aiplay(newB), 300);

    
    }

    const resetGame = ()=>{
        setBoard(Array(9).fill(null));
        setTurn(true);
        setWin(null);
    }


    const aiplay = (currentB) =>{
        const emptyIndex = currentB
        .map((val,index) => (val === null ? index : null))
        .filter((v) => v !== null);

        if(emptyIndex.length === 0) return;

        const randomIndex = 
        emptyIndex[Math.floor(Math.random() * emptyIndex.length)];

        const newB = [...currentB];
        newB[randomIndex] = "O";
        setBoard(newB);
        setTurn(!turn);
        
        const winner = checkWin(newB);
        if(winner) setWin(winner);
        }

    


  return(
    <div>
        <Board board={board} onClick={handleClick}  />
        {win && <h2>{win} Wins </h2>}
        {!win && board.every(cell => cell != null) && (<h2>It's a tie</h2>)}
        <button onClick = {resetGame} className ="reset">Reset</button>

    </div>
  );

}

export default Oneplayer