/*************  ✨ Codeium Command 🌟  *************/
// oktaConfig.js
const oktaConfig = {
    clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
    issuer: import.meta.env.VITE_OKTA_ISSUER,
    redirectUri: `${window.location.origin}/profile`,
    api_key: import.meta.env.VITE_OKTA_API_KEY,
    pkce: true,
    responseType: "code", // Ensure you are using the appropriate response type
    scope: "openid profile email groups", // Scopes
    tokenManager: {
      storage: "localStorage", // Store tokens in localStorage instead of sessionStorage
      autoRenew: false, // Disable token auto-renewal for debugging
    },
    // devMode: true, // Add this line to enable verbose logging
    disableHttpsCheck: true,
    // postLoginRedirectUri: "/", // Redirect to home after login
    
  };

  
  
  export default oktaConfig;
  