//Menu.jsx
import React, { useState } from "react";
function Menu({setMode, setUser}){
    return(
      <>
      
        <div className="container">
          <h1>Tic Tac Toe</h1>
          <button onClick={() => setMode("1player")}>1 Player (vs AI)</button>
          <button onClick={() => setMode("2player")}>2 Players</button>
          <button onClick={() => setMode("Online")}>Online</button>
        </div>
        <button className = "logout" onClick={() => setUser(null)}>
        Log Out
        </button>
      </>
    );
}
export default Menu