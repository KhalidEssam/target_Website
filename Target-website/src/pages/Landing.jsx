// import React from 'react';
import FullscreenSlider from "../components/Slider";
import FAQ from "../components/Faq";
import { useTranslation } from "../hooks/useTranslation";

const Landing = () => {
  const { translate: t } = useTranslation();
  return (
    <>
      {/* Fullscreen Slider */}
      <div className="fullscreen-slider">
        <FullscreenSlider />
      </div>

      {/* Card Section */}
      <section
        className="card card-section container p-4 shadow-lg rounded-3"
        style={{ backgroundColor: "#f8f9fa", border: "none" }}
      >
        <div className="row justify-content-center align-items-center g-4">
          {/* Text Content */}
          <div className="col-md-5 text-center text-md-start">
            <h1 className="display-5 fw-bold mb-4" style={{ color: "#2c3e50" }}>
              {t("navbar.targetForEngineering")}
            </h1>
            <p className="lead mb-4" style={{ color: "#34495e" }}>
              {t("body.story")}
            </p>
            <button
              className="btn btn-primary btn-lg px-4 py-2"
              style={{ backgroundColor: "#3498db", border: "none" }}
            >
              {t("body.readMore")}
            </button>
          </div>

          {/* Image Content */}
          <div className="col-md-6">
            <img
              src="https://target-for-engineering.com/wp-content/uploads/2021/07/WhatsApp-Image-2021-07-11-at-11.23.28-AM.jpeg"
              alt="Random"
              className="img-fluid rounded-3 shadow-sm"
              style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
      <FAQ />
    </>
  );
};

export default Landing;
