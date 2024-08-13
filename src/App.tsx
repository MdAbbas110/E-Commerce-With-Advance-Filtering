import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-neutral-500">
        <Sidebar />
      </div>
    </Router>
  );
}

export default App;
