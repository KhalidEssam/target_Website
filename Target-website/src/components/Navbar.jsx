import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/features/themeSlice"; // Import the action
import React, { useState, useEffect } from "react";
import Login from "./handleLogin";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "../hooks/useTranslation"; 

const Navbar = () => {
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);
  const { translate:t } = useTranslation();

  

  return (
    <>
      <nav className="fixed-top bg-dark text-light">
        <div className="container-fluid d-flex justify-content-between">
          {isLoggedIn ? (
            <p className="m-2">
             <a rel="icon" type="image/svg+xml" href="/" >
                <img src="/logo_target-.svg" alt="logo" style={{width:"50px", height:"50px"}} />
            </a>
               <a href="/profile" className="text-light">
                 {t("common.navbar.helloUser" ) + userInfo.name }
               </a>
            </p>
          ) : (
            <>
            <a rel="icon" type="image/svg+xml" href="/" >
                <img src="/logo_target-.svg" alt="logo" style={{width:"50px", height:"50px"}} />
            </a>
             <p className="m-2">{t("common.navbar.helloGuest")}</p>
            </>
          )}
          <Login />
        </div>
      </nav>
      <ExpandableNavbar className=""/>
    </>
  );
};

const ExpandableNavbar = () => {
  const { translate: t } = useTranslation();

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
        <div className="container-fluid">



          <a className={`navbar-brand nav-link p-3 ${navLinkClass}`} href="/">
            {t("common.navbar.targetForEngineering")}
         
          </a>
          <button
            className="navbar-toggler border-3 bg-secondary"
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
                {t("common.navbar.aboutUs")}
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
                  {t("common.navbar.services")}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/services/Construction">
                      {t("common.navbar.construction")}
                    </a>
                  </li>
                  {/* <li>
                    <a className="dropdown-item" href="/services/Consultancy">
                      Engineering Consultancy
                    </a>
                  </li> */}
                  <li>
                    <a className="dropdown-item" href="/services/Supplies">
                      {t("common.navbar.materialSupplies")}
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/services/Maintenance">
                      {t("common.navbar.maintenance")}
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className={`nav-link p-3 ${navLinkClass}`} href="/projects">
                  {t("common.navbar.projects")}
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link p-3 ${navLinkClass}`} href="/contact">
                  {t("common.navbar.contact")}
                </a>
              </li>
            </ul>
            <button
              className="btn btn-outline-secondary m-2"
              onClick={handleThemeToggle}
            >
              {isDarkMode ? t("common.navbar.darkMode") : t("common.navbar.lightMode")}
            </button>
            <LanguageToggle />
          </div>
        </div>
      </nav>
  );
}

export default Navbar;

