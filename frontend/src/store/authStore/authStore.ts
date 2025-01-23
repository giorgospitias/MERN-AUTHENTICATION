import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppSelector } from "../storeHooks";
import { authInitialState } from "./authState";
import {
  UserChangePasswordData,
  UserForgotPasswordData,
  UserRefreshResponseData,
} from "../../interfaces/User";
import { BE_URL } from "../../api/urls";

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async function ({ email, password }: { email: string; password: string }) {
    try {
      const { data } = await axios.post(`${BE_URL}/user/login`, {
        email,
        password,
      });
      return {
        user: data,
        access_token: data.access,
        // refresh_token: data.refresh,
      };
    } catch (err) {
      toast.error({ err }.toString());
      throw err;
    }
  }
);

export const signUpUserThunk = createAsyncThunk(
  "auth/signUpUser",
  async function ({
    email,
    password,
    passwordConfirm,
  }: {
    email: string;
    password: string;
    passwordConfirm: string;
  }) {
    try {
      const { data } = await axios.post(`${BE_URL}/user/signup`, {
        email,
        password,
        passwordConfirm,
      });
      return {
        user: data,
        message: "User successfully registered!",
      };
    } catch (err) {
      toast.error({ err }.toString());
      throw err;
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async (data: UserForgotPasswordData) => {
    try {
      const response = await axios.post(`${BE_URL}/user/forgotPassword/`, data);
      toast.success(
        "Password successfully reset. Please check your E-mail for your temp pass!"
      );
      return response.data;
    } catch (err: any) {
      toast.error(err.response.data.detail);
      throw err;
    }
  }
);

export const changePasswordThunk = createAsyncThunk(
  "auth/changePassword",
  async (data: UserChangePasswordData) => {
    try {
      const response = await axios.post(`${BE_URL}/user/changePassword/`, data);
      toast.success("Password updated successfully!");
      return response.data;
    } catch (err: any) {
      toast.error(err.response.data.detail);
      throw err;
    }
  }
);

// export const autoLoginUserThunk = createAsyncThunk(
//   "auth/autoLoginUser",
//   async function ({ refreshToken }: { refreshToken: string }) {
//     try {
//       const { data }: { data: UserRefreshResponseData } = await axios.post(
//         `http://localhost:8000/api/user/refresh/`,
//         {
//           refresh: refreshToken,
//         }
//       );

//       return { access_token: data.access };
//     } catch (err: any) {
//       toast.error(
//         err.response?.data?.error ||
//           "Something went wrong. Please try again later."
//       );
//     }
//   }
// );

const authSlice = createSlice({
  name: "authStore",
  initialState: authInitialState,
  reducers: {
    logout(state, action: { payload: UserRefreshResponseData }) {
      // if (action.payload?.refresh && action.payload?.access) {
      //    axios.post(
      //       `${BE_URL}/user/logout/`,
      //       { refresh: action.payload.refresh },
      //       {
      //          headers: {
      //             // 'Content-Type': 'application/json',
      //             Authorization: `Bearer ${action.payload.access}`,
      //          },
      //       },
      //    );
      // }
      state.access_token = null;
      state.refresh_token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.authLoading = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.activeUser = action.payload.user;
      state.access_token = action.payload?.access_token ?? null;
      // state.refresh_token = action.payload?.refresh_token ?? null;
      state.authLoading = false;
    });
    builder.addCase(signUpUserThunk.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(signUpUserThunk.rejected, (state) => {
      state.authLoading = false;
    });
    builder.addCase(signUpUserThunk.fulfilled, (state, action) => {
      state.activeUser = action.payload.user;
      // state.access_token = action.payload?.user. ?? null;
      // state.refresh_token = action.payload?.refresh_token ?? null;
      state.authLoading = false;
    });
    builder.addCase(forgotPasswordThunk.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(forgotPasswordThunk.rejected, (state) => {
      state.authLoading = false;
    });
    builder.addCase(forgotPasswordThunk.fulfilled, (state) => {
      state.authLoading = false;
      state.reset_password = true;
    });
    builder.addCase(changePasswordThunk.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(changePasswordThunk.rejected, (state) => {
      state.authLoading = false;
    });
    builder.addCase(changePasswordThunk.fulfilled, (state) => {
      state.authLoading = false;
      state.reset_password = false;
    });
    // builder.addCase(autoLoginUserThunk.pending, (state) => {
    //   state.authLoading = false;
    // });
    // builder.addCase(autoLoginUserThunk.rejected, (state) => {
    //   state.authLoading = true;
    // });
    // builder.addCase(autoLoginUserThunk.fulfilled, (state, action) => {
    //   state.access_token = action.payload?.access_token ?? null;
    //   state.authLoading = false;
    // });
  },
});

export const selectUsers = () => useAppSelector((state) => state.auth);

export default authSlice;
