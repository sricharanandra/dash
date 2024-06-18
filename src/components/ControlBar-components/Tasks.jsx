import { useState, useEffect } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { IconContext } from "react-icons";

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
    <>
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
        <IconContext.Provider
          value={{
            style: { height: "25px", color: "#e5e7eb", width: "25px" },
            className: "global-class-name",
          }}
        >
          <button className="submit-button" onClick={() => addTask()}>
            <MdOutlineAddCircleOutline />
          </button>
        </IconContext.Provider>
      </div>
      <div className="list-container">
        <ul className="list">
          {tasks.map((task, index) => (
            <li className="list-item " key={index}>
              {task}{" "}
              <IconContext.Provider
                value={{
                  style: { height: "25px", color: "#e5e7eb", width: "25px" },
                  className: "global-class-name",
                }}
              >
                <button
                  className="task-delete-button"
                  onClick={() => deleteTask(index)}
                >
                  <HiOutlineTrash />
                </button>
              </IconContext.Provider>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Tasks;
