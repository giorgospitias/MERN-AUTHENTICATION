import { useCookies } from "react-cookie";
import axios from "axios";
import { authActions } from "../store/globalStore";
import { useAppDispatch } from "../store/storeHooks";
// import { autoLoginUserThunk } from "../store/authStore/authStore";
import { useEffect } from "react";

const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const isLoggedIn = !!cookies.access_token;

  const dispatch = useAppDispatch();

  const setUserAccessToken = (token: string): void => {
    setCookie("access_token", token, {
      maxAge: 7200, // set the cookie for 2 hours
      secure: import.meta.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  };

  const setUserRefreshToken = (token: string): void => {
    setCookie("refresh_token", token, {
      maxAge: 90 * 24 * 3600,
      secure: import.meta.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  };

  // const autoLoginUser = async () => {
  //   if (cookies.refresh_token) {
  //     const response: any = await dispatch(
  //       autoLoginUserThunk({ refreshToken: cookies.refresh_token })
  //     );
  //     if (
  //       response.meta.requestStatus === "fulfilled" &&
  //       !!response.payload?.access_token
  //     ) {
  //       setUserAccessToken(response.payload.access_token);
  //     }
  //   }
  // };

  const logoutUser = () => {
    // dispatch(authActions.logout);

    axios.interceptors.request.clear();
    removeCookie("access_token");
    removeCookie("refresh_token");
  };

  return {
    isLoggedIn,
    setUserAccessToken,
    setUserRefreshToken,
    logoutUser,
    cookies,
    // autoLoginUser,
  };
};

export default useAuth;
