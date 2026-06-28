//App.jsx
import React, { useState } from "react";
import Menu from "./components/Menu.jsx"
import "./App.css";
import Oneplayer from "./pages/Oneplayer.jsx"
import Twoplayer from "./pages/Twoplayer.jsx"
import Login from "./pages/Login.jsx"
import Online from "./pages/Online.jsx"
function App(){
  const [mode, setMode] = useState("menu")
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
    return (
      <>{mode === "login" || user === null ? 
      <Login setLoggedIn={setLoggedIn} setMode={setMode} setUser={setUser} /> :  (
        <>
      {mode !== "menu" && (
      <button onClick={() => setMode("menu")}className="Backbutton">Back</button>
      )}
      
      {mode === "menu" && <Menu setMode={setMode} setLoggedIn={setLoggedIn} setUser={setUser} />}
      {mode === "1player" && <Oneplayer />}
      {mode === "2player" && <Twoplayer />}
      {mode === "Online" && <Online />} 
      </>
      ) 
    }
      </>
      
    );
  
}
export default App