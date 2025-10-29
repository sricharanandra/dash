import { Link, useLocation } from "react-router-dom";
import { ImHome } from "react-icons/im";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";

function ControlBar() {
    const location = useLocation();
    
    return (
        <>
            <nav className="flex justify-evenly items-center h-[60px] w-full border-[3px] border-solid rounded-[5px] border-light-text bg-dark-bg">
                <Link 
                    to="/tasks" 
                    className={`p-3 rounded-lg transition-colors ${
                        location.pathname === '/tasks' 
                            ? 'bg-blue-600' 
                            : 'hover:bg-dark-secondary'
                    }`}
                >
                    <IconContext.Provider
                        value={{
                            style: { height: "25px", color: "white", width: "25px" },
                        }}
                    >
                        <FaIcons.FaTasks />
                    </IconContext.Provider>
                </Link>

                <Link 
                    to="/"
                    className={`p-3 rounded-lg transition-colors ${
                        location.pathname === '/' 
                            ? 'bg-blue-600' 
                            : 'hover:bg-dark-secondary'
                    }`}
                >
                    <IconContext.Provider
                        value={{
                            style: { height: "25px", color: "white", width: "25px" },
                        }}
                    >
                        <ImHome />
                    </IconContext.Provider>
                </Link>
            </nav>
        </>
    );
}

export default ControlBar;
