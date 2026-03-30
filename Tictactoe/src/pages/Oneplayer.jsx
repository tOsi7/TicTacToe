import Board from "../components/Board.jsx"
import React, {useState} from "react"
import {checkWin} from "../utils/Game.js"



function Oneplayer(){

  
    const [board, setBoard] = useState(Array(9).fill(null)); //initializes board
    const [turn, setTurn] = useState(true);
    const [win, setWin] = useState(null);
    const [player1, setPlayer1] = useState(0);
    const [player2, setPlayer2] = useState(0);
    const handleClick = (index) => {
        if(board[index]) return;
        if(turn == false) setTimeout(() => aiplay(newB), 400);

        const newB = [...board];
        newB[index] = "X";
        setBoard(newB);
        const winner = checkWin(newB);
        if(winner){
            setWin(winner);
            pointsys(turn);
            return;
        }
        setTurn(!turn);
    

        setTimeout(() => aiplay(newB), 400);

    
    }

    const resetGame = ()=>{
        setBoard(Array(9).fill(null));
        setTurn(!turn);
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
        const winner = checkWin(newB);
        if(winner){
            setWin(winner);
            pointsys(turn);
        }
        setTurn(!turn);
    }
        const pointsys = (turn)=>{
            if(turn==true){
                setPlayer1(prev => prev + 1);
            } 
            else {
                setPlayer2(prev => prev + 1);
             }
        }

    


  return(
    <div>
        <h1>Player 1: {player1}</h1>
        <h1>Player 2: {player2}</h1>
        <Board board={board} onClick={handleClick}  />
        {win && <h2>{win} Wins </h2>}
        {!win && board.every(cell => cell != null) && (<h2>It's a tie</h2>)}
        <button onClick = {resetGame} className ="reset">Reset</button>

    </div>
  );

}

export default Oneplayer