import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import OpenRoute from "./OpenRoute";
import Homepage from "../pages/Homepage";
import Portfolio from "../pages/Portfolio";
import CoinPage from "../pages/CoinPage";
// import SignIn from "../pages/login/SignIn";
// import SignUp from "../pages/login/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <OpenRoute element={<Homepage />} />,
      },
      {
        path: "/portfolio",
        element: <OpenRoute element={<Portfolio />} />,
      },
      {
        path: "/coins/:coinId",
        element: <PrivateRoute element={<CoinPage />} />,
      },
      // {
      //   path: "/signIn",
      //   element: <OpenRoute element={<SignIn />} />,
      // },
      // {
      //   path: "/signUp",
      //   element: <OpenRoute element={<SignUp />} />,
      // },

      //   {
      //     path: "*",
      //     element: <Navigate replace to="/login" />,
      //   },
    ],
  },
]);
