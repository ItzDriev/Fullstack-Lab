# Driev Coaching — Fullstack Lab

A fullstack web application built with React, Vite, TypeScript, TailwindCSS, Express, and MongoDB Atlas.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account with a cluster set up

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ItzDriev/Fullstack-Lab.git
cd Fullstack-Lab
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the project root with the following variables:

```env
MONGO_URI=mongodb+srv://<cluster>.mongodb.net/lab?appName=DrievDB
DB_USER=your_atlas_username
DB_PWD=your_atlas_password
PORT=5000
JWT_SECRET=your-secret-key-here
```

Replace the placeholder values with your actual MongoDB Atlas credentials. You can find your connection string in the Atlas dashboard under **Connect → Drivers**.

Make sure your IP address is whitelisted in Atlas under **Network Access** (use `0.0.0.0/0` for development to allow all IPs).

### 4. Running the Application

Run both the frontend and backend simultaneously:

```bash
npm run concurrent
```

Or run them separately in two terminals:

```bash
# Terminal 1 — Frontend
npm run dev

# Terminal 2 — Backend
npm run dev:backend
```

## API Endpoints

### Authentication

| Method | Endpoint                  | Description             | Auth Required |
| ------ | ------------------------- | ----------------------- | ------------- |
| POST   | /api/auth/register        | Register a new user     | No            |
| POST   | /api/auth/login           | Login with username     | No            |
| POST   | /api/auth/logout          | Logout and clear cookie | No            |
| GET    | /api/auth/me              | Get current user        | Yes           |
| GET    | /api/auth/profile         | Get full profile data   | Yes           |
| PUT    | /api/auth/profile/picture | Upload profile picture  | Yes           |

### Sessions

| Method | Endpoint               | Description            | Auth Required |
| ------ | ---------------------- | ---------------------- | ------------- |
| POST   | /api/sessions          | Purchase a session     | Yes           |
| GET    | /api/sessions          | Get all user sessions  | Yes           |
| GET    | /api/sessions/upcoming | Get upcoming sessions  | Yes           |
| GET    | /api/sessions/history  | Get completed sessions | Yes           |
