import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/features/themeSlice"; // Import the action
import React, { useState, useEffect } from "react";
import Login from "./handleLogin";

const Navbar = () => {
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);

  

  return (
    <>
      <nav className="fixed-top bg-dark text-light">
        <div className="container-fluid d-flex justify-content-between">
          {isLoggedIn ? (
            <p className="m-2">
              <a href="/profile" className="text-light">
              {/* {console.log(userInfo)} */}
                hello, {userInfo.name}
              </a>
            </p>
          ) : (
            <p className="m-2">hello, Guest</p>
          )}
          <Login />
        </div>
      </nav>
      <ExpandableNavbar className=""/>
    </>
  );
};

const ExpandableNavbar = () => {
  const dispatch = useDispatch();

  const [scrolled, setScrolled] = useState(false);
  let isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get the theme state from Redux
  // Toggle the theme globally
  const handleThemeToggle = () => {
    const body = document.body;
    if (!isDarkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
    dispatch(toggleTheme());
  };



  
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
  const navLinkClass = isDarkMode ? "text-light" : "text-dark";


  

  return (
    <nav
        className={`navbar fixed-top container navbar-expand-md 
        ${
          !scrolled
            ? isDarkMode
              ? "bg-dark"
              : "bg-light"
            : "bg-tranparent "
        }
      `}
        style={{
          marginTop: "56px", // Adjusts the margin-top to the height of the first navbar
          transition: "background-color 0.3s ease",
        }}
      >
        <div className="container-fluid navat">
          <a className={`navbar-brand nav-link p-3 ${navLinkClass}`} href="/">
            Target for Engineering
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse `} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={`nav-link p-3 ${navLinkClass}`} href="/about">
                  About Us
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className={`nav-link p-3 dropdown-toggle ${navLinkClass}`}
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/services/Construction">
                      Construction
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/services/Consultancy">
                      Engineering Consultancy
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/services/Supplies">
                      Material Supplies
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/services/Maintenance">
                      Maintenance
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className={`nav-link p-3 ${navLinkClass}`} href="/projects">
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link p-3 ${navLinkClass}`} href="/contact">
                  Contact
                </a>
              </li>
            </ul>
            <button
              className="btn btn-outline-secondary m-2"
              onClick={handleThemeToggle}
            >
              {isDarkMode ? " Dark" : " Light"}
            </button>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;

