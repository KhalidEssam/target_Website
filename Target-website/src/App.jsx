import { useSelector } from "react-redux";
import "./App.css";
import { LoginCallback } from "@okta/okta-react";
import { useOktaAuth } from '@okta/okta-react';
import Login from "./components/handleLogin";

import useDirection from "./hooks/useDirection";
import useTheme from "./hooks/useTheme";


// Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import NotFound from "./components/404";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import AboutUs from "./pages/Aboutus";
import Landing from "./pages/Landing";
import Projects from "./pages/Projects";
import ContactUs from "./pages/ContactUs";
import Services from "./pages/Services";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleLogin } from "./components/handleLogin";


function App() {
  
  useDirection(); // Apply RTL/LTR direction
  useTheme();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { authState, oktaAuth } = useOktaAuth();

  const appStyle = {
    backgroundColor: isDarkMode ? "#121212" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#000000",
    transition: "all 0.3s ease",
  };


  return (
      <div style={appStyle}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />


           {/* conditional rendering of profile page */}
          {authState?.isAuthenticated ? (
            <Route path="/profile/*"  element={<Profile />}/>
          ) : (
            <Route path="/profile/*" Component={LoginCallback }/>
          )}

          {/* rendering the pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/services/*" element={<Services />} />
          {/* <Route path='/' Component={LoginCallback }  /> */}


          <Route path="/login" element={  <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
        <Footer /> {/* Footer component */}
      </div>
      
  );
}

export default App;