import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface OpenRouteProps {
  element: JSX.Element;
}

const OpenRoute = ({ element }: OpenRouteProps) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate replace to="/" /> : element;
};

export default OpenRoute;
