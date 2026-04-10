export function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task">
      <label className="task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggle(task.id, e.target.checked)}
        />
        <span className={task.completed ? "done" : ""}>{task.title}</span>
      </label>
      <div className="task-meta">
        <time>{new Date(task.createdAt).toLocaleString()}</time>
        <button className="ghost" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
