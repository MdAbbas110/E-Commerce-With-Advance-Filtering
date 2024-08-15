import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import CountdownTimer from "./components/Timer";
function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* <Sidebar /> */}
        {/* <div className="w-full flex-wrap justify-between rounded">
          <Routes>
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div> */}
        <CountdownTimer />
      </div>
    </Router>
  );
}

export default App;
