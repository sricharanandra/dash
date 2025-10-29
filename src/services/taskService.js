import api from './api';

// Get all tasks for current user
export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return { success: true, data: response.data.tasks };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch tasks',
    };
  }
};

// Create new task
export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return { success: true, data: response.data.task };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || error.response?.data?.errors || 'Failed to create task',
    };
  }
};

// Update task
export const updateTask = async (taskId, updates) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, updates);
    return { success: true, data: response.data.task };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to update task',
    };
  }
};

// Delete task
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return { success: true, data: response.data.task };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to delete task',
    };
  }
};
