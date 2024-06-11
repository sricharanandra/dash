import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import * as FaIcons from "react-icons/fa";

import "../styles/ControlBar.css";

function ControlBar() {
  return (
    <>
      <nav className="ControlBar">
        <Link to="/tasks" className="menu-bars">
          <FaIcons.FaTasks />
        </Link>
        <Link to="/">
          <ImHome />
        </Link>
      </nav>
    </>
  );
}

export default ControlBar;
