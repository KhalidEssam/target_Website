// import React from 'react';
import FullscreenSlider from "../components/Slider";


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
                  src="https://res.cloudinary.com/dlup3gczf/image/upload/v1737562034/o4mizoqasdscrdglctza.png"
                  alt="Random"
                  className="img-fluid"
                />
              </div>
            </div>
          </section>



          {/* <h1>Target for Engineering</h1> */}
        </>
    
    );
};


export default Landing;