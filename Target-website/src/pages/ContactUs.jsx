import React from "react";
// import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className=" contact-us">
      {/* Banner Section */}
      <div className="contact-banner mt-5 ">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Let’s get in touch!</p>
      </div>

      {/* Map and Info Section */}
      <div className="contact-details">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d862.6387950359159!2d31.169266969643026!3d30.135539498429868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x14586900352dece1%3A0x6014ccdae4d73984!2sTarget%20for%20engineering%2C%20Saqil%2C%20Ossim%2C%20Giza%20Governorate%203677616!3m2!1d30.1355395!2d31.1699107!5e0!3m2!1sen!2seg!4v1737137842085!5m2!1sen!2seg"
            width="100%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Company Location"
          ></iframe>
        </div>
        <div className="info-container">
          <h3>Our location</h3>
          <p>12 Bahr Street , GiZa, Saqil Ossim</p>
          <h3>Contact Information</h3>
          <p>Email: info@target-for-engineering.com</p>
          <p>Phone: +20 (10) 40109864</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form">
        <h2>Have Any Questions?</h2>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows="5" placeholder="Write your message here" required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
