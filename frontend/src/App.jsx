import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Captains from "./pages/Captains";
import PressureAnalysis from "./pages/PressureAnalysis";
import TacticalAnalysis from "./pages/TacticalAnalysis";
import MatchCenter from "./pages/MatchCenter";
import About from "./pages/About";

function App() {

  return (

    <BrowserRouter>

      <div
        className="
          min-h-screen
          bg-[#04130d]
        "
      >

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/captains"
            element={<Captains />}
          />

          <Route
            path="/pressure"
            element={<PressureAnalysis />}
          />

          <Route
            path="/tactical"
            element={<TacticalAnalysis />}
          />

          <Route
            path="/match-center"
            element={<MatchCenter />}
          />

          <Route
            path="/about"
            element={<About />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;