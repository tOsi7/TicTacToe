//App.jsx
import React, { useState } from "react";
import Menu from "./components/Menu.jsx"
import "./App.css";
import Oneplayer from "./pages/Oneplayer.jsx"
import Twoplayer from "./pages/Twoplayer.jsx"
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