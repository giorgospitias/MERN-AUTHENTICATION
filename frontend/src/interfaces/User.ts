export interface User {
  user_id: number;
  email: string;
  token: string;
  username: string;
}

export interface UserForgotPasswordData {
  email?: string;
}

export interface UserChangePasswordData {
  old_password: string;
  new_password: string;
}

export interface UserRefreshResponseData {
  access: string;
  refresh: string;
}
