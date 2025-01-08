// oktaConfig.js
const oktaConfig = {
    clientId: "0oamct1k6lOQO3TTD5d7",
    issuer: "https://dev-36372109.okta.com/oauth2/default",
/*************  ✨ Codeium Command 🌟  *************/
    redirectUri: window.location.origin + "/profile",
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
  