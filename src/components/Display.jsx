import { Routes, Route } from "react-router-dom";
import Home from "./ControlBar-components/Home";
import Tasks from "./ControlBar-components/Tasks";
import Notes from "./ControlBar-components/Notes";

function Display() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/notes" element={<Notes />} />
    </Routes>
  );
}

export default Display;
