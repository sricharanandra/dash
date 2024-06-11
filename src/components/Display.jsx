import { Routes, Route } from "react-router-dom";
import Home from "./ControlBar-components/Home";
import Tasks from "./ControlBar-components/Tasks";

function Display() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}

export default Display;
