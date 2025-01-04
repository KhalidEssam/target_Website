import React from "react";
import CountUp from "react-countup";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#2c3e50", // Dark grayish-blue background
        color: "#fff", // White text
        padding: "2rem 1rem",
        textAlign: "center",
      }}
    >
      {/* Social Media Section */}
      <div>
        <h4>Follow Us</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", fontSize: "1.5rem" }}
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", fontSize: "1.5rem" }}
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", fontSize: "1.5rem" }}
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", fontSize: "1.5rem" }}
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Statistics Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>
            <CountUp end={6327} duration={3} />
          </h2>
          <p>Happy Customers</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2>
            <CountUp end={12} duration={3} />
          </h2>
          <p>Years of Operation</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2>
            <CountUp end={25} duration={3} />
          </h2>
          <p>Partner Companies</p>
        </div>
      </div>

      {/* Footer Copyright */}
      <div style={{ borderTop: "1px solid #fff", paddingTop: "1rem" }}>
        <p>&copy; {new Date().getFullYear()} Target for Engineering. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
