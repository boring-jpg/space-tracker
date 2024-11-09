import LaunchCards from "./pages/LaunchCards/LaunchCard.jsx";
import Navbar from "./Navbar.jsx";
import About from "./pages/about.jsx";
import LaunchDetails from "./pages/LaunchDetails.jsx";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<LaunchCards />} />
          <Route path="/launch/:id" element={<LaunchDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </>
  );
}

export default App;
