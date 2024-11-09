import PropTypes from "prop-types";

function Navbar() {
  const CustomLink = ({href, children}) => {
    const path = window.location.pathname;

    return (
      <li className={path === href ? "active" : ""}>
        <a href={href}>{children}</a>
      </li>
    );
  };

  return (
    <nav className="nav">
      <a href="/" className="site-name">
        Space-Tracker
      </a>
      <ul>
        <CustomLink href="/about/">About</CustomLink>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  href: PropTypes.string,
  children: PropTypes.string,
};

export default Navbar;
