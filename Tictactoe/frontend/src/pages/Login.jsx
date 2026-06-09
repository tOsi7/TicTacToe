import React, { useState } from "react";
import { registerUser, loginUser } from "../utils/api.js";


function Login( {setLoggedIn, setMode} ){
    const [newUser, setNewUser] = useState(false)
    const [userN, setUserN] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    async function handleSignUp(){
            try{
                if (checkLogin() && password === confirmPassword) {
                    const user = await registerUser(userN, password);
                    console.log("Registered user:");
                    setLoggedIn(true);
                    setMode("menu");
                }
                else{
                    alert("Invalid username or password. Username must be at least 5 characters long. Password must be at least 8 characters long and contain at least one number and one special character. Passwords must match.");
                    console.error("Invalid username or password. Username must be at least 5 characters long. Password must be at least 8 characters long and contain at least one number and one special character. Passwords must match.");
                }
                
            } catch (error) {
                console.error(error)
               alert("Registration failed. Username may already be taken.");
                }
    
}
    function checkLogin(){
        if(userN.length < 5)
            return false;
        else if(password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password))
            return false;
        return true;

    }
    async function handleLogin(){
        try{
            if(checkLogin()){
                const user = await loginUser(userN, password);
                console.log("Log in successful:");
                setLoggedIn(true);
                setMode("menu");
            }
            else{
                alert("Invalid username or password. Username must be at least 5 characters long. Password must be at least 8 characters long and contain at least one number and one special character.");
                console.error("Invalid username or password. Username must be at least 5 characters long. Password must be at least 8 characters long and contain at least one number and one special character.");
            }
        } catch (error) {
            console.error(error);
            alert("Login failed.");
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
                    <input type="text" placeholder="Username" onChange={(e) => {setUserN(e.target.value);}}/>
                    <input type = "password" placeholder="Password" onChange={(e) => {setPassword(e.target.value);}}/>
                    <input type = "password" placeholder="Confirm Password" onChange={(e) => {setConfirmPassword(e.target.value);}}/>
                </div>
                <button onClick={handleSignUp}>Create Account</button>
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
                <h3 onClick={() => { setLoggedIn(true); setMode("menu") }}>Don't want to create an account? Continue as a guest!</h3>

            </div>
            </>
        )
    }
    </>

    );
}

export default Login;