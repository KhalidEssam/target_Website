import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/features/userSlice";
import { CiLogin, CiLogout } from "react-icons/ci";

export const handleLogin = async (oktaAuth) => {
  await oktaAuth.signInWithRedirect();
};

const Login = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await oktaAuth.signOut();
    dispatch(logout()); // Dispatch logout action'
  };
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        if (authState?.isAuthenticated) {
          // Wait until the tokens are resolved
          const user = await oktaAuth.getUser();
          // Dispatch login action with user data
          dispatch(login(user));
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUser();
  }, [authState, oktaAuth, dispatch]);

  if (!authState) {
    return (
      <div className="auth-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="auth-container m-2 d-sm">
      {authState.isAuthenticated ? (
        <button className="btn btn-outline-secondary" onClick={handleLogout}>
          {/* Logout
           */}
          <CiLogout />
        </button>
      ) : (
        <button
          className="btn btn-outline-secondary"
          onClick={() => handleLogin(oktaAuth)}
        >
          {/* Login */} Login
          <CiLogin />
        </button>
      )}
    </div>
  );
};

export default Login;
