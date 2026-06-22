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
                    localStorage.setItem("user", JSON.stringify(user));
                    setLoggedIn(true);
                    setMode("menu");
                }
                else{
                    alert("Sign Up Credentials incorrect. Please check your inputs and try again.");
                    console.error("Sign Up Credentials incorrect.");
                }
                
            } catch (error) {
                console.error("Registration failed:", error);
                alert("Registration failed. Some bs error occurred .");
                }
    
}  
    function checkLogin(){
        if(userN.length < 5){
            alert("Username must be at least 5 characters long.");
            console.error("Username.");
            return false;
        }
        else if(password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)){
            alert("Password must be at least 8 characters long and contain at least one number and one special character.");
            console.error("Password.");
            return false;
    }

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
            
                console.error("Login Credentials incorrect.");
            }
        } catch (error) {
            console.error("Login failed:", error);
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