import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/features/userSlice";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useTranslation } from "../hooks/useTranslation";

export const handleLogin = async (oktaAuth) => {
  await oktaAuth.signInWithRedirect();
};

const Login = () => {
    const { translate: t } = useTranslation();
  
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
          <CiLogout />
          {t('common.navbar.logout')}
        </button>
      ) : (
        <button
          className="btn btn-outline-secondary"
          onClick={() => handleLogin(oktaAuth)}
        >
          <CiLogin />
          {t('common.navbar.login')}
        </button>
      )}
    </div>
  );
};

export default Login;
