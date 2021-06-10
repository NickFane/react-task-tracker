export const deleteTask = (id, tasks) => {
    return tasks.filter((task) => task.id !== id)
};