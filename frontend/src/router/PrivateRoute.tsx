import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate replace to="/login" />;
};

export default PrivateRoute;
