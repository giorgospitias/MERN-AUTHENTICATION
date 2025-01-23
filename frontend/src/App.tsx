import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";
import { useIsAuthenticated } from "@azure/msal-react";

function App() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <>
      <div id="app-container">
        {/* <Navbar /> */}
        {/* <SignIn /> */}
        <div>
          {isAuthenticated ? (
            <h1>Welcome to our application. You are logged in</h1>
          ) : (
            <SignIn />
          )}
        </div>
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
