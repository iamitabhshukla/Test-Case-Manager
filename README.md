# Full Stack Test Case Management System

A comprehensive application for managing test projects, suites, cases, and executions.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, Sequelize
- **Database**: PostgreSQL
- **Caching**: Redis (Optional)

## Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (running on port 5432)
- Redis (optional, on port 6379)

## Setup & Run Instructions

### 1. Database Setup
Ensure PostgreSQL is running. Then create the database:
```bash
cd server
npm install
node setup_db.js
```

### 2. Start Backend Server
```bash
cd server
# Creates a .env file if you haven't already (check .env for DB creds)
npm start
```
*Server runs on http://localhost:5000*

### 3. Start Frontend Client
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
*Client runs on http://localhost:5173*

## Verification
To run an automated test of the entire API flow:
```bash
node verify_system.js
```

## Default Credentials
Register a new user on the login page. The first user typically has full access in this demo environment.
