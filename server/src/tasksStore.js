import { v4 as uuid } from "uuid";

const tasks = [];

export function getAllTasks() {
  // newest first
  return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addTask(title) {
  const task = {
    id: uuid(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export function updateTaskCompleted(id, completed) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  task.completed = completed;
  return task;
}

export function deleteTask(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}
