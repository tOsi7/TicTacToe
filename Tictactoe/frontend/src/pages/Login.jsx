import React, { useState } from "react";

function Login( {setLoggedIn, setMode} ){
    const [newUser, setNewUser] = useState(false)
    const [userN, setUserN] = useState("")
    const [password, setPassword] = useState("")

    function handleSignUp(){

    }
    function checkLogin(){
        if(userN.length < 5)
            return false;
        else if(password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password))
            return false;
        return true;

    }
    function handleLogin(){
        if(checkLogin()){
            setLoggedIn(true);
            setMode("menu");
        }
        else{
            alert("Invalid username or password. Username must be at least 5 characters long. Password must be at least 8 characters long and contain at least one number and one special character.");
        }

    }
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
                    <input type="text" placeholder="Username" onChange={(e) => {setUserN(e.target.value);}}/>
                    <input type = "password" placeholder="Password" onChange={(e) => {setPassword(e.target.value);}}/>
                </div>
                <button onClick={handleLogin}>Login</button>
                <h3>Don't want to create an account? Continue as a guest!</h3>

            </div>
            </>
        )
    }
    </>

    );
}

export default Login;