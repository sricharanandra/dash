import Header from "./components/Header";
import ControlBar from "./components/ControlBar";
import Display from "./components/Display";
import "./App.css";

function App() {
  return (
    <>
      <div className="main-components">
        <Header />
        <Display />
        <ControlBar />
      </div>
    </>
  );
}

export default App;
