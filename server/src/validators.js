export function validateTitle(title) {
  if (typeof title !== "string") {
    return "title must be a string";
  }
  if (title.trim().length === 0) {
    return "title cannot be empty";
  }
  return null;
}

export function validateCompleted(completed) {
  if (typeof completed !== "boolean") {
    return "completed must be a boolean";
  }
  return null;
}
