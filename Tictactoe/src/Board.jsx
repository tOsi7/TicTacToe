function Board({board, onClick}){
    const checkWin = (board)
    return(
        <div className = "grid">
            {board.map((cell, i) =>(
                <button key = {i} className = "cell" 
                onClick={() =>onClick(i)}>
                {cell}
                </button>
            ))}
        </div>
    )
}


export default Board
