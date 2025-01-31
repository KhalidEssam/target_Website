// import React from 'react';
import FullscreenSlider from "../components/Slider";
import FAQ from "../components/Faq";
import { useTranslation } from "../hooks/useTranslation";



const Landing = () => {
  const { translate:t } = useTranslation();
    return (
        <>
        
          {/* Fullscreen Slider */}
          <div className="fullscreen-slider">
            <FullscreenSlider />
          </div>

          {/* Card Section */}
          <section className=" card card-section border-3  container">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-4 text-center">
                <h1>{t("navbar.targetForEngineering")}</h1>
                <p>
                {t("body.story")}</p>
                <button className="btn btn-primary">{t("body.readMore")}</button>
              </div>
              <div className="col-md-6">
                <img
                  src="https://target-for-engineering.com/wp-content/uploads/2021/07/WhatsApp-Image-2021-07-11-at-11.23.28-AM.jpeg"
                  alt="Random"
                  className="img-fluid"
                />
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="faq-section container">
            <h2>{t("body.FAQ")}</h2>
            <FAQ />
          </section>



          {/* <h1>Target for Engineering</h1> */}
        </>
    
    );
};


export default Landing;