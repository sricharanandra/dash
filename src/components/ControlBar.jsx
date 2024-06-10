import Tasks from "./ControlBar-components/Tasks";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

import "../styles/ControlBar.css";

function ControlBar() {
  return (
    <>
      <nav className="ControlBar">
        <Link to="/tasks" className="menu-bars">
          <FaIcons.FaTasks />
        </Link>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </>
  );
}

export default ControlBar;
