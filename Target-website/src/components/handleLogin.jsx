import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/theme/userSlice';

const Login = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const handleLogout = async () => {
    await oktaAuth.signOut();
    dispatch(logout()); // Dispatch logout action
  };
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        if (authState?.isAuthenticated) {
          // Wait until the tokens are resolved
          const user = await oktaAuth.getUser();
          const userData = {
            firstName: user.given_name || '',
            lastName: user.family_name || '',
            email: user.email || '',
          };

          // Dispatch login action with user data
          dispatch(login(userData));
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
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
    <div className="auth-container">
      {authState.isAuthenticated ? (
        <button className="btn btn-outline-secondary" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="btn btn-outline-secondary" onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default Login;
