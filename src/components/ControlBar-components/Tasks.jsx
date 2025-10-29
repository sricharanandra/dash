import { useState, useEffect } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { IconContext } from "react-icons";
import { getTasks, createTask, deleteTask as deleteTaskAPI } from "../../services/taskService";

const categories = ["Important", "General", "Finish by Today"];

const Tasks = () => {
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch tasks from API on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const result = await getTasks();
    
    if (result.success) {
      setTasks(result.data);
      setError("");
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const addTask = async () => {
    if (newTask.trim() !== "") {
      const taskData = {
        title: newTask,
        category: selectedCategory,
      };

      const result = await createTask(taskData);
      
      if (result.success) {
        setTasks([result.data, ...tasks]);
        setNewTask("");
        setError("");
      } else {
        setError(result.error);
      }
    }
  };

  const deleteTask = async (taskId) => {
    const result = await deleteTaskAPI(taskId);
    
    if (result.success) {
      setTasks(tasks.filter((task) => task.id !== taskId));
      setError("");
    } else {
      setError(result.error);
    }
  };

  const getTasksByCategory = (category) => {
    let filtered = tasks.filter((task) => task.category === category);
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="mt-2 text-light-text">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 max-w-4xl mx-auto">
      {error && (
        <div className="bg-red-900 bg-opacity-50 border border-red-500 text-red-200 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
          className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-light-text focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white border-2 border-blue-500'
                : 'bg-dark-secondary text-light-text border-2 border-gray-600 hover:border-gray-500 hover:bg-opacity-80'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Add Task Input Container */}
      <div className="flex gap-2 mb-6 items-center">
        <input
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          value={newTask}
          className="flex-1 py-3 px-4 bg-dark-secondary border border-gray-600 rounded-lg text-light-text focus:outline-none focus:border-blue-500 transition-colors"
          type="text"
          placeholder="Enter the Task"
        />
        <select
          className="px-3 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-light-text focus:outline-none focus:border-blue-500"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option
              className="bg-dark-secondary"
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
        <button 
          className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          onClick={() => addTask()}
        >
          <IconContext.Provider
            value={{
              style: { height: "20px", color: "white", width: "20px" },
            }}
          >
            <MdOutlineAddCircleOutline />
          </IconContext.Provider>
        </button>
      </div>

      {/* Task Lists by Category */}
      <div className="flex-1 overflow-hidden">
        {categories.map((category) => (
          <div
            key={category}
            className={`h-full overflow-y-auto ${
              selectedCategory === category ? "block" : "hidden"
            }`}
          >
            {getTasksByCategory(category).length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p className="text-lg">{searchQuery ? "No matching tasks" : "No tasks yet"}</p>
                <p className="text-sm mt-2">
                  {searchQuery ? "Try a different search term" : "Add a task to get started"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {getTasksByCategory(category).map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-dark-secondary border border-gray-600 rounded-lg hover:border-gray-500 transition-colors group"
                  >
                    <span className="flex-1 text-light-text">{task.title}</span>
                    <button
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900 hover:bg-opacity-20 rounded transition-all"
                      onClick={() => deleteTask(task.id)}
                      title="Delete task"
                    >
                      <IconContext.Provider
                        value={{
                          style: { height: "18px", width: "18px" },
                        }}
                      >
                        <HiOutlineTrash />
                      </IconContext.Provider>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
