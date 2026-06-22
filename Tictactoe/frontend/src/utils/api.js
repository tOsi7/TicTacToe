//utils/api.js
const BASE_URL = "http://127.0.0.1:8000";

export async function registerUser(username, password) {
    const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),

    });

    if (!res.ok) throw new Error("Failed to register user");
    return res.json();
}

export async function getUsers() {
    const res = await fetch(`${BASE_URL}/users/`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}

export async function loginUser(username, password){
    const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Failed to login user");
    return res.json();
}