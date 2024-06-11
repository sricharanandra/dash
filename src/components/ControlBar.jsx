import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";

import "../styles/ControlBar.css";

function ControlBar() {
  return (
    <>
      <nav className="ControlBar">
        <IconContext.Provider
          value={{
            style: { height: "25px", color: "white", width: "25px" },
            className: "global-class-name",
          }}
        >
          <Link to="/tasks" className="menu-bars">
            <FaIcons.FaTasks />
          </Link>
        </IconContext.Provider>

        <IconContext.Provider
          value={{
            style: { height: "25px", color: "white", width: "25px" },
            className: "global-class-name",
          }}
        >
          <Link to="/">
            <ImHome />
          </Link>
        </IconContext.Provider>
      </nav>
    </>
  );
}

export default ControlBar;
