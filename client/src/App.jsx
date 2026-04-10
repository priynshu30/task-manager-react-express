import { useEffect, useState } from "react";
import { api } from "./api";
import { TaskForm } from "./components/TaskForm.jsx";
import { TaskList } from "./components/TaskList.jsx";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      setError("");
      try {
        const res = await api.get("/tasks");
        setTasks(res.data.data);
      } catch (err) {
        setError("Could not load tasks. Is the API running?");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAdd = async (title) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await api.post("/tasks", { title });
      setTasks((prev) => [res.data.data, ...prev]);
    } catch (err) {
      const message =
        err.response?.data?.error || "Could not add task. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id, completed) => {
    setError("");
    try {
      const res = await api.patch(`/tasks/${id}`, { completed });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...res.data.data } : t))
      );
    } catch (err) {
      setError("Could not update task.");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError("Could not delete task.");
    }
  };

  return (
    <main className="page">
      <header>
        <p className="eyebrow">Task Manager</p>
        <h1>Stay on top of the small stuff</h1>
        <p className="muted">
          Add tasks, mark them done, and clear them when you’re finished.
        </p>
      </header>

      <TaskForm onAdd={handleAdd} submitting={submitting} />

      {error && <div className="alert">{error}</div>}

      {loading ? (
        <p className="muted">Loading tasks…</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}

export default App;
