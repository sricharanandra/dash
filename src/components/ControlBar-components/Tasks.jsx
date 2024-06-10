import { useState, useEffect } from "react";
import "/Web Dev/dash/src/styles/Tasks.css";

const Tasks = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="input-container">
        <input
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          value={newTask}
          className="input-box"
          type="text"
          id="inputtext"
          placeholder="Enter the Task"
        />
        <button className="submit-button" onClick={() => addTask()}>
          Add Task
        </button>
      </div>
      <div className="list-container">
        <ul className="list">
          {tasks.map((task, index) => (
            <li className="list-item " key={index}>
              {task}{" "}
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
