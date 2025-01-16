import React from "react";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  const fetch_backend_home_route = async () => {
    const response = await fetch("http://127.0.0.1:3000/parties", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const data = await response.json();
    console.log(data);
    // window.location.href = data["backend_home_route"];
  };
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
      <button onClick={fetch_backend_home_route}>Refresh</button>
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
