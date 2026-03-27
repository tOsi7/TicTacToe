import React, { useState } from "react";
import Menu from "./Menu.jsx"
import "./App.css";
import Oneplayer from "./Oneplayer.jsx"
import Twoplayer from "./Twoplayer.jsx"
function App(){
  const [mode, setMode] = useState("menu")
    return (
      <>{mode !== "menu" && (
      <button onClick={() => setMode("menu")}className="Backbutton">Back</button>
      )}
      {mode === "menu" && <Menu setMode={setMode}/>}
      {mode === "1player" && <Oneplayer />}
      {mode === "2player" && <Twoplayer />}
      </>
      
    );
  
}
export default App