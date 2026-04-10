import { useState } from "react";

export function TaskForm({ onAdd, submitting }) {
  const [title, setTitle] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (!title.trim()) {
      setLocalError("Title is required");
      return;
    }
    await onAdd(title.trim());
    setTitle("");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label className="label" htmlFor="taskTitle">
        New Task
      </label>
      <div className="form-row">
        <input
          id="taskTitle"
          type="text"
          placeholder="e.g. Ship the demo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add"}
        </button>
      </div>
      {localError && <p className="error">{localError}</p>}
    </form>
  );
}
