// import React from 'react';
// import './Aboutus.css';

const AboutUs = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card" style={{ maxWidth: "800px" }}>
                <div className="row g-0">
                    <div className="col-md-6">
                        <div className="card-body">
                            <h1 className="card-title">About Us</h1>
                            <p className="card-text">Welcome to our website! We are dedicated to providing the best service possible.</p>
                            <p className="card-text">Our team is made up of experienced professionals who are passionate about what they do.</p>
                            <p className="card-text">Thank you for visiting our site. We hope you find what you're looking for!</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img
                            src="https://orascom.com/wp-content/uploads/Plant-1-Bahr-2.png"
                            alt="Random"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;