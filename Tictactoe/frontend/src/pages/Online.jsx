//pages/Online.jsx
import { getUsers } from "../utils/api.js";
import React, { useState, useEffect } from "react";
function Online() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        getUsers().then(setLeaderboard);

    }, []);

    return (
        <div className="online-container">
            <h1>Online Mode</h1>
            <p>Online mode is currently under development. Please check back later!</p>
            <button>Find a Game</button>
            <div className="online-placeholder">
                <h2>Leaderboard</h2>
                <table className = "leaderboard-table">
                    <thead className = "leaderboard-header">
                        <tr>
                            <th>Username</th>
                            <th>Games Won</th>
                            <th>Games Played</th>
                            <th>Win Rate</th>
                        </tr>
                    </thead>
                    <tbody className = "leaderboard-body">
                        {leaderboard.map(user => (
                        <tr>
                            <td>{user.username}</td>
                            <td>{user.games_won}</td>
                            <td>{user.games_played}</td>
                            <td>{user.games_played > 0 ? ((user.games_won / user.games_played) * 100).toFixed(1) : 0}%</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Online