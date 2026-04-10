# Task Manager (React + Express)

Simple task manager with in-memory storage to demonstrate full-stack CRUD.

## Prerequisites
- Node.js 18+ and npm

## Setup & Run
### Backend
```bash
cd server
npm install
npm run dev      # starts on http://localhost:4000
```

### Frontend
Create a `.env` (or `.env.local`) in `client` if you want to override the API base:
```
VITE_API_URL=http://localhost:4000
```
Then:
```bash
cd client
npm install
npm run dev      # starts on http://localhost:5173
```

## API
- `GET /tasks` - list tasks (newest first)
- `POST /tasks` - body `{ title }`
- `PATCH /tasks/:id` - body `{ completed }`
- `DELETE /tasks/:id`
Responses are JSON: `{ data: ... }` or `{ error: message }`.

## Data Storage
- No database is used.
- Tasks are stored in memory on the server.
- Data resets whenever the backend restarts.

## Manual Test Checklist
- Add a task (blank title rejected).
- Refresh list shows new task.
- Toggle complete updates status.
- Delete removes task; deleting again returns 404.
- Stop server and confirm frontend shows an error state.
