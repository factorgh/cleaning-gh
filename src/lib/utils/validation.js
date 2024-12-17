export function formatValidationError(error) {
  return error.errors
    .map((err) => `${err.path.join(".")}: ${err.message}`)
    .join(", ");
}

export function formatDatabaseError(error) {
  if (error.message.includes("UNIQUE constraint failed")) {
    return "A record with this information already exists";
  }
  return "An unexpected error occurred";
}
