import React, { useState } from "react";
function Login( {setLoggedIn, setMode} ){
    const [newUser, setNewUser] = useState(false)
    return(
        <>
        <div className = "newuserolduser">
        <button onClick={() => setNewUser(false)}>Login</button>
        <button onClick={() => setNewUser(true)}> Sign Up</button>
        </div>
        {newUser ? (
            <>
            <div className = "login">
            
            <h1>Sign Up</h1>
            <div className = "login-form">
                    <input type="text" placeholder="Username"/>
                    <input type = "password" placeholder="Password"/>
                    <input type = "Password" placeholder="Confirm Password"/>
                </div>
                <button onClick={() => { setLoggedIn(true); setMode("menu") }}>Create Account</button>
            </div>
            </>
        ) : (
        <>
            <div className = "login">
                
                <h1>Login</h1>
                <div className = "login-form">
                    <input type="text" placeholder="Username"/>
                    <input type = "password" placeholder="Password"/>
                </div>
                <button onClick={() => { setLoggedIn(true); setMode("menu") }}>Login</button>
                <h3>Don't want to create an account? Continue as a guest!</h3>

            </div>
            </>
        )
    }
    </>

    );
}

export default Login;