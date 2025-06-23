import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="custom-navbar">
      <div className="navbar-logo">
        <Link to="/" className="brand">
          ⚡CEUDify
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link
            to="/"
            className={`nav-link ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            📝 Create Post
          </Link>
        </li>
        <li>
          <Link
            to="/read"
            className={`nav-link ${
              location.pathname === "/read" ? "active" : ""
            }`}
          >
            📄 All Posts
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
