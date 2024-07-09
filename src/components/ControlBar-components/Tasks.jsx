import { useState, useEffect } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { IconContext } from "react-icons";

import "../../styles/Tasks.css";

const categories = ["Important", "General", "Finish by Today"];

const Tasks = () => {
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const addTask = () => {
    if (newTask !== "") {
      setTasks([
        ...tasks,
        { title: newTask, completed: false, category: selectedCategory },
      ]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const getTasksByCategory = (category) => {
    return tasks.filter((task) => task.category === category);
  };

  return (
    <>
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            id="category-button"
            className={
              selectedCategory === category
                ? "active-button"
                : "category-button"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
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
        <select
          className="category-selector"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option
              className="category-options"
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
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
      {categories.map((category) => (
        <div
          key={category}
          className={`task-list ${
            selectedCategory === category ? "" : "hidden"
          }`}
        >
          <ul className="list">
            {getTasksByCategory(category).map((task, index) => (
              <li className="list-item " key={index}>
                {task.title} ({task.category}){" "}
                <IconContext.Provider
                  value={{
                    style: {
                      height: "25px",
                      backgroundColor: "#292b2f",
                      color: "#e5e7eb",
                      width: "25px",
                    },
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
      ))}
    </>
  );
};

export default Tasks;
