import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import ControlBar from "./components/ControlBar";
import Home from "./components/ControlBar-components/Home";
import Tasks from "./components/ControlBar-components/Tasks";
import Notes from "./components/ControlBar-components/Notes";
import "./App.css";

function App() {
  const [displayApp, setDisplayApp] = useState(false);
  const handleButtonClick = () => {
    setDisplayApp(true);
  };
  /*   useEffect(() => {
    const saveState = () => {
      localStorage.setItem("displayApp", displayApp);
    };
    [displayApp];

    return saveState;
  }, [displayApp]); */

  useEffect(() => {
    const displayState = localStorage.getItem("displayState");
    if (displayState === "true") {
      setDisplayApp(true);
    }
  }, []);

  const saveState = () => {
    localStorage.setItem("displayState", displayApp);
  };

  useEffect(() => {
    saveState();
  }, [displayApp]);
  return (
    <>
      {displayApp ? (
        <div className="main-components">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
          <ControlBar />
        </div>
      ) : (
        <LandingPage onButtonClick={handleButtonClick} />
      )}
    </>
  );
}

export default App;
