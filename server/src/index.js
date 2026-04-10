import express from "express";
import cors from "cors";
import {
  addTask,
  deleteTask,
  getAllTasks,
  updateTaskCompleted,
} from "./tasksStore.js";
import { validateCompleted, validateTitle } from "./validators.js";

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);
app.use(express.json());

// Helpers to standardize responses
const ok = (res, data) => res.json({ data });
const badRequest = (res, message) => res.status(400).json({ error: message });
const notFound = (res) => res.status(404).json({ error: "task not found" });

app.get("/tasks", (_req, res) => {
  ok(res, getAllTasks());
});

app.post("/tasks", (req, res) => {
  const { title } = req.body ?? {};
  const error = validateTitle(title);
  if (error) return badRequest(res, error);
  const task = addTask(title);
  ok(res.status(201), task);
});

app.patch("/tasks/:id", (req, res) => {
  const { completed } = req.body ?? {};
  const error = validateCompleted(completed);
  if (error) return badRequest(res, error);
  const task = updateTaskCompleted(req.params.id, completed);
  if (!task) return notFound(res);
  ok(res, task);
});

app.delete("/tasks/:id", (req, res) => {
  const removed = deleteTask(req.params.id);
  if (!removed) return notFound(res);
  return res.status(204).end();
});

// Basic error handler fallback
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
