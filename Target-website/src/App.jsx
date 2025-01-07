import { useSelector } from "react-redux";
import "./App.css";
import {  LoginCallback } from "@okta/okta-react";
import { useOktaAuth } from '@okta/okta-react';



// Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import AboutUs from "./pages/Aboutus";
import Landing from "./pages/Landing";
import Projects from "./pages/Projects";

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  // const authState = useSelector((state) => state.user.authState);
  const { authState, oktaAuth } = useOktaAuth();

  // const userInfo = useSelector((state) => state.user.userInfo); // Get user info from Redux store

  const appStyle = {
    backgroundColor: isDarkMode ? "#121212" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#000000",
    transition: "all 0.3s ease",
  };

  return (
      <div style={appStyle}>
        <Navbar />
        {/* Routes for different pages */}
        <Routes>
          {authState?.isAuthenticated ? (
            <Route path="/" element={<Profile />} />
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path='/login/callback' Component={LoginCallback}  />
        </Routes>



        <Footer /> {/* Footer component */}
      </div>
      
  );
}

export default App;
