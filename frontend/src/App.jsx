import LaunchCards from "./components/LaunchCard.jsx";
import Navbar from "./components/Navbar.jsx";
import About from "./components/about.jsx";
import { Login } from "./components/login.jsx";
import LaunchDetails from "./components/LaunchDetails.jsx";
import {Route, Routes} from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuth } from "./api/backend_calls.js";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
  
    const check = async () => {
      const authStatus = await isAuth();
      setIsLoggedIn(authStatus);
    };

    check();

  },[]);

  return (
    <>
      <Navbar loggedIn={isLoggedin} />
      <Routes>
        <Route path="/" element={<LaunchCards />} />
        <Route path="/launch/:id" element={<LaunchDetails />} />
        <Route path="/about" element={<About />} />
        <Route path={isLoggedin? "/" : "/login"} element={isLoggedin ? <LaunchCards /> : <Login setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </>
  );
}

export default App;
