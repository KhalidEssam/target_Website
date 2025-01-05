// oktaConfig.js
const oktaConfig = {
    clientId: "0oamct1k6lOQO3TTD5d7",
    issuer: "https://dev-36372109.okta.com",
    redirectUri: "http://localhost:5173",
    pkce: true,
    responseType: "code", // Ensure you are using the appropriate response type
    scope: "openid profile email", // Scopes

  };
  
  export default oktaConfig;
  