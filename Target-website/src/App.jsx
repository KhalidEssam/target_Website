import { useSelector } from "react-redux";
import "./App.css";

// Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import AboutUs from "./pages/Aboutus";
import Landing from "./pages/Landing";
import Projects from "./pages/Projects";

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

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
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>



        <Footer /> {/* Footer component */}
      </div>
      
  );
}

export default App;
