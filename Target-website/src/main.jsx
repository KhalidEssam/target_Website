import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from './App.jsx';
import store , { persistor } from './store/store'; // Import the Redux store
import { BrowserRouter as Router } from 'react-router-dom'; // Re-add Router
import { Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import oktaConfig from './oktaConfig'; // Import Okta config

// Initialize OktaAuth instance
const oktaAuth = new OktaAuth(oktaConfig);
const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  history.replace(toRelativeUrl(originalUri || '', window.location.origin));
};

// Render the App component with Redux store, Router, and Okta auth
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap App with Provider and pass the store */}
    <PersistGate loading={null} persistor={persistor}>
      <Router> {/* Add Router back here */}
        <Security oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}>
          <App />
        </Security>
      </Router>
    </PersistGate>
    </Provider>
  </StrictMode>
);