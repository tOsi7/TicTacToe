Tic Tac Toe Full-Stack Game

A full-stack Tic Tac Toe web application with AI gameplay, user authentication, persistent user data, and a leaderboard system powered by a REST API and PostgreSQL database.

Features:
  User registration and login system (authentication with hashed passwords)
  Persistent user accounts stored in PostgreSQL
  Play Tic Tac Toe against AI
  Multiple AI difficulty levels (easy, medium, hard)
  Heuristic-based logic for lower levels
  Minimax algorithm for hard mode
  Game state tracking and score persistence per user
  REST API backend for all game and user operations
  Basic leaderboard system based on stored user stats
  Session persistence (users remain logged in on refresh using client-side storage)

AI Features:
  Easy/Medium: heuristic-based decision making
  Hard: Minimax algorithm for optimal play

Tech Stack:
  Frontend (vercel deployed)
  React
  JavaScript
  CSS
  Backend (EC2 deployed)
  FastAPI (Python)
  REST API architecture
  Amaozon RDS (PostgreSQL)
  bcrypt (password hashing)
  SQLAlchemy / SQLModel (ORM)
  

Authentication:
  User passwords are securely hashed using bcrypt
  Login verifies hashed passwords using secure comparison
  Session persistence handled via localStorage (client-side)

Database:
  Amazon RDS database stores:
    User accounts
    Password hashes
    Game statistics (wins, games played, time of account creation)
    Leaderboard data

    
Core Functionality:
  Create account and log in
  Play against AI
  Track wins/losses per user
  Persist user data across sessions
  Retrieve leaderboard data via API
  Maintain multiple versions of the project using Git
