// components/Login.jsx
import React from "react";
import { useOktaAuth } from "@okta/okta-react";

const Login = () => {
  const { oktaAuth, authState } = useOktaAuth();

  const handleLogin = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const handleLogout = async () => {
    await oktaAuth.signOut();
  };

  if (!authState) {
    return (
      <div className="auth-loading">
        
      </div>
    );
  }

  return (
    <div className="auth-container">
      {authState.isAuthenticated ? (
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default Login;

