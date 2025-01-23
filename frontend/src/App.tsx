import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";
import { useIsAuthenticated } from "@azure/msal-react";
import useAuth from "./hooks/useAuth";
import axios from "axios";

function App() {
  const isAuthenticated = useIsAuthenticated();
  const { isLoggedIn } = useAuth();
  const { cookies } = useAuth();

  axios.interceptors.request.use((request) => {
    const token = cookies.access_token;
    if (token) request.headers.Authorization = `Bearer ${token}`;
    return request;
  });
  return (
    <>
      <div id="app-container">
        {/* <Navbar /> */}
        {/* <SignIn /> */}
        <div>
          {isLoggedIn &&
            // location.pathname !== "/reset-password" &&
            // location.pathname !== "/reset-confirmation" &&
            location.pathname !== "/" && <Navbar />}
          <Outlet />
        </div>
        {/* <div>
          {isAuthenticated || isLoggedIn ? (
            <h1>Welcome to our application. You are logged in</h1>
          ) : (
            <Outlet />
          )}
        </div> */}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
