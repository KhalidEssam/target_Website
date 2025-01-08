import React from "react";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1 style={{ fontSize: "5em" }}>😱</h1>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <p>
        <a href="/">
          <FaHome /> Go Home
        </a>
      </p>
    </div>
  );
};

export default NotFound;
