import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import { logout } from "../api/backend_calls";
import {Link, useNavigate} from "react-router-dom";
import React from "react";

const getWindowSize = () => {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
};

function Navbar({loggedIn, setIsLoggedIn}) {
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const navigate = useNavigate();

  const CustomLink = ({href, children}) => {
    const path = window.location.pathname;

    return (
      <li className={path === href ? "active" : ""}>
        <Link to={href} onClick={() => setIsOpen(!isOpen)}>
          {children}
        </Link>
      </li>
    );
  };

  const handleLogout = async() => {
    try{
      const response = await logout();
      if (await response.success === true){
        setIsLoggedIn(false);
        navigate(0);
      }
      if(response.success === false) {
        alert(response.error);
      }
    } catch (e){
      console.error(e);
      alert("An error occurred while logging out." + ` ${e}`);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="nav">
      <Link
        to="/"
        className="site-name"
        onClick={() => {
          isOpen ? setIsOpen(!isOpen) : "";
        }}
      >
        Space-Tracker
      </Link>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <i className={isOpen ? "fa-solid fa-x" : "fa-solid fa-bars "}></i>
      </button>
      <ul
        className={
          isOpen && windowSize.innerWidth <= 767 ? "nav-list isOpen" : "nav-list"
        }>
        <div className={windowSize.innerWidth <= 767 ? "mobile-nav" : "desktop-nav"}>
          <CustomLink href={loggedIn ? "/favorites" : "/login"}>
            {loggedIn ? "Favorites" : "Login"}
          </CustomLink>
          <CustomLink href="/about">About</CustomLink>
          {loggedIn ? (
            <li>
              <a className="logout" onClick={
                () => {
                  handleLogout();
                }
              }>Logout</a>
            </li>
          ) :
          ""}
        </div>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  href: PropTypes.string,
  children: PropTypes.string,
  loggedIn: PropTypes.bool,
  setIsLoggedIn: PropTypes.func
};

export default Navbar;
