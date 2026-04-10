import { TaskItem } from "./TaskItem.jsx";

export function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return <p className="muted">No tasks yet — add your first one.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
