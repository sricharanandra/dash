import Tasks from "./sidebar-components/Tasks";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <Link to="#" className="menu-bars"></Link>
      </div>
    </>
  );
}

export default Sidebar;
