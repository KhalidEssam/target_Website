// Navbar.jsx
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice"; // Import the action
import React, { useState, useEffect } from "react";
import Login from "./handleLogin"

const Navbar = () => {

  const dispatch = useDispatch();
  let isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get the theme state from Redux
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle the theme globally
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    isDarkMode = !isDarkMode;

    document.body.classList.toggle('dark-mode', isDarkMode);
  };

  return (
     
    <nav
      className={`navbar container mt-4 navbar-expand-lg fixed-top  ${
        scrolled
          ? isDarkMode
            ? "bg-dark text-light"
            : "bg-light text-dark"
          : "bg-transparent"
      }`}
      style={{
        transition: "background-color 0.3s ease",
      }}
    >
      
      <div className="container-fluid ">
        <a className="navbar-brand nav-link p-3" href="/">Target for Engineering</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link p-3 " href="/about">About Us</a>
            </li>
            <li className="nav-item dropdown">
              <a 
                className="nav-link p-3  dropdown-toggle" 
                href="/" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
                Services
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/service1">Construction</a></li>
                <li><a className="dropdown-item" href="/service2">Engineering Consultancy</a></li>
                <li><a className="dropdown-item" href="/service3">Material Supplies</a></li>
                <li><a className="dropdown-item" href="/service4">Maintenance</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link p-3  " href="/projects">Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link p-3  " href="/contact">Contact</a>
            </li>

          
             

             {isLoggedIn ? (
        <p>
          hello, {userInfo.firstName} {userInfo.lastName} 
        </p>
      ) : () => {
        <Login />;
      }}
            
            
          </ul>
          <button className="btn btn-outline-secondary" onClick={handleThemeToggle}>
            {isDarkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
          <Login  /> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;