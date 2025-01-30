// import React from 'react';
import FullscreenSlider from "../components/Slider";
import FAQ from "../components/Faq";


const Landing = () => {
    return (
        <>
        
          {/* Fullscreen Slider */}
          <div className="fullscreen-slider">
            <FullscreenSlider />
          </div>

          {/* Card Section */}
          <section className="card-section container">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-4 text-center">
                <h1>Target for Engineering</h1>
                <p>
                  A story of more than just Engineering, but also of a family that has been working together for more than 30 years.
                </p>
                <button className="btn btn-primary">Learn More</button>
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
            <h2>Frequently Asked Questions</h2>
            <FAQ />
          </section>



          {/* <h1>Target for Engineering</h1> */}
        </>
    
    );
};


export default Landing;