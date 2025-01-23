import React, { useState } from "react";
import { loginUserThunk } from "../../store/authStore/authStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/storeHooks";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import { msalInstance } from "../../../msalConfig";
import { AccountInfo } from "@azure/msal-browser";
import useAuth from "../../hooks/useAuth";

interface SignInProps {
  // Define any props here if necessary
}

const SignIn: React.FC<SignInProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserAccessToken } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    username: string;
    password: string;
  }>();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit: SubmitHandler<{
    username: string;
    password: string;
  }> = async function (data: { username: string; password: string }) {
    const { username, password } = data;

    const response: any = await dispatch(
      loginUserThunk({ email: username, password: password })
    );
    console.log(response.payload);
    if (
      response.meta.requestStatus === "fulfilled" &&
      !!response?.payload?.access_token
    ) {
      // setTimeout(() => {
      console.log(response.payload);
      setUserAccessToken(response.payload.access_token);
      // }, 3000);
    }
    // if (response.meta.requestStatus === "fulfilled" && reset_password) {
    //   return navigate("/reset-password");
    // }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["user.read"], // Request specific scopes
      });

      const account: AccountInfo | null = msalInstance.getAllAccounts()[0];
      if (account) {
        console.log("Microsoft Account Info:", account);
        // You can now send the token or account information to your backend for further validation if needed
        navigate("/");
      }
    } catch (error) {
      console.error("Microsoft Sign-In Error:", error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  id="username"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  {...register("username", {
                    required: `Email is required.`,
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => (
                    <p className="text-sm font-semibold text-red-500">
                      {message}
                    </p>
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("password", {
                    required: `Password is required.`,
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p className="text-sm font-semibold text-red-500">
                      {message}
                    </p>
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  {/* <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                      checked={remember}
                      onChange={handleRememberChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div> */}
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <div className="relative flex items-center justify-center">
                <hr className="w-full border-gray-300 dark:border-gray-600" />
                <span className="absolute px-3 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400">
                  OR
                </span>
              </div>

              <button
                onClick={handleMicrosoftSignIn}
                className="flex items-center justify-center w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                  alt="Microsoft"
                  className="w-5 h-5 mr-2"
                />
                Sign in with Microsoft
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  onClick={() => navigate("/signUp")}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
