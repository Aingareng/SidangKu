import { Navigate, Outlet } from "react-router-dom";
import localStorageUtils from "../../../shared/utils/localStorage";
import { IAuthData } from "../types/auth";

export default function Authenticated() {
  const user = localStorageUtils.get<IAuthData>("user");
  const isAuthenticated = user?.isLogin || false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
