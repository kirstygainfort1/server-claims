const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
// Add environment variables for process.env.YOUR_API_IDENTIFIER and process.env.ISSUER_BASE_URL
// const checkJwt = auth({
//   audience: 'YOUR_API_IDENTIFIER',
//   issuerBaseURL: `https://YOUR_DOMAIN/`,
// });

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

module.exports = { checkJwt };
