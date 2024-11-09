import LaunchCards from "./components/LaunchCards/LaunchCard.jsx";
import Navbar from "./components/Navbar.jsx";
import About from "./components/about.jsx";
import LaunchDetails from "./components/LaunchDetails.jsx";
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
