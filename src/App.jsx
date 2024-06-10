import Header from "./components/Header";
import ControlBar from "./components/ControlBar";
import Display from "./components/Display";
import "./App.css";

function App() {
  return (
    <>
      <div className="stuff">
        <Header />
        <Display />
        <ControlBar />
      </div>
    </>
  );
}

export default App;
