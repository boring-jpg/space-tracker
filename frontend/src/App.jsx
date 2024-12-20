import LaunchCards from "./components/LaunchCard.jsx";
import Navbar from "./components/Navbar.jsx";
import About from "./components/about.jsx";
import Loading from "./components/utility/loading.jsx";
import {Login} from "./components/login.jsx";
import LaunchDetails from "./components/LaunchDetails.jsx";
import {Route, Routes} from "react-router-dom";
import {useState, useEffect} from "react";
import {isAuth} from "./api/backend_calls.js";
import Favorites from "./components/favorites.jsx";
import {NotFound} from "./components/Notfound.jsx";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const authStatus = await isAuth();
        setIsLoggedIn(authStatus);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    check();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar loggedIn={isLoggedin} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<LaunchCards />} />
        <Route path="/launch/:id" element={<LaunchDetails />} />
        <Route path="/about" element={<About />} />
        {isLoggedin ? (
          <Route path="/favorites" element={<Favorites />} />
        ) : (
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
