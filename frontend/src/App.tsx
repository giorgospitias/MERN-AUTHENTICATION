import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";

function App() {
  return (
    <>
      <div id="app-container">
        <Navbar />
        {/* <SignIn /> */}
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
