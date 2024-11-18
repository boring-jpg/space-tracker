import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import React from "react";

const getWindowSize = () => {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
};

function Navbar({loggedIn}) {
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());

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
        }
      >
        <div className={windowSize.innerWidth <= 767 ? "mobile-nav" : "desktop-nav"}>
          <CustomLink href={loggedIn ? "/favorites" : "/login"}>
            {loggedIn ? "Favorites" : "Login"}
          </CustomLink>
          <CustomLink href="/about">About</CustomLink>
        </div>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  href: PropTypes.string,
  children: PropTypes.string,
  loggedIn: PropTypes.bool,
};

export default Navbar;
