import { PublicClientApplication, Configuration } from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: "f9f4c50d-ce5d-4f55-b463-dab08488b3e1", // Replace with your Azure AD Application (client) ID
    authority:
      "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a", // Replace with your Azure AD tenant ID
    redirectUri: "http://localhost:3000", // Replace with your redirect URI
  },
  cache: {
    cacheLocation: "localStorage", // Configure where your cache will be stored
    storeAuthStateInCookie: false, // Set to true for IE11 or Edge compatibility
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
