import { User } from "../../interfaces/User";

interface IAuthState {
  activeUser: Partial<User> | null;
  authLoading: boolean;
  access_token: string | null;
  refresh_token: string | null;
  reset_password: boolean;
}
export const authInitialState: IAuthState = {
  activeUser: null,
  authLoading: false,
  access_token: null,
  refresh_token: null,
  reset_password: false,
};
