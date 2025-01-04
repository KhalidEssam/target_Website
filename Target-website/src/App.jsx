import { useSelector } from "react-redux";
import "./App.css";
import Footer from "./components/Footer";
import FullscreenSlider from "./components/Slider";

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const appStyle = {
    backgroundColor: isDarkMode ? "#121212" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#000000",
    transition: "all 0.3s ease",
  };

  return (
    <div style={appStyle}>
      {/* Fullscreen Slider */}
      <div className="fullscreen-slider">
        <FullscreenSlider />
      </div>

      {/* Card Section */}
      <section className="card-section container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 text-center">
            <h1>Target for Engineering</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quae.
            </p>
            <button className="btn btn-primary">Learn More</button>
          </div>
          <div className="col-md-6">
            <img
              src="https://source.unsplash.com/random/400x400"
              alt="Random"
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
