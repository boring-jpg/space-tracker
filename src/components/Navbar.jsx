import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const getWindowSize = () => {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight}
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize())

  const CustomLink = ({href, children}) => {
    const path = window.location.pathname;

    return (
      <li className={path === href ? "active" : ""}>
        <a href={href}>{children}</a>
      </li>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    
    <nav className="nav">
      <a href="/" className="site-name">
        Space-Tracker
      </a>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}><i className={isOpen ? "fa-solid fa-x":"fa-solid fa-bars "}></i></button>
        <ul className={isOpen && windowSize.innerWidth <=767 ? "nav-list isOpen": "nav-list"}>
          <div className={windowSize.innerWidth <= 767 ? "mobile-nav" : ""}>
            <CustomLink href="/about">About</CustomLink>
          </div>
        </ul>
    </nav>
  );
}

Navbar.propTypes = {
  href: PropTypes.string,
  children: PropTypes.string,
};

export default Navbar;
