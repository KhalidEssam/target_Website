import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/features/userSlice";
import { addAllOrders } from "../store/features/ordersSlice";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useTranslation } from "../hooks/useTranslation";

export const handleLogin = async (oktaAuth) => {
  await oktaAuth.signInWithRedirect();
};

const Login = () => {
  const { translate: t } = useTranslation();
  const userInfo = useSelector((state)=>state.user.userInfo)
  const { oktaAuth, authState } = useOktaAuth();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await oktaAuth.signOut();
    dispatch(logout()); // Dispatch logout action'
  };
 useEffect(() => {
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

  useEffect(() => {
    const fetchOrders = async () => {
      if (authState?.isAuthenticated && userInfo.sub) {
        try {
          const res = await fetch("/api/orders/user/" + userInfo.sub);
          const data = await res.json();
          // console.log(data);
          dispatch(addAllOrders(data));
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };
  
    fetchOrders();
  }, [authState, userInfo.sub, dispatch]);
   

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
