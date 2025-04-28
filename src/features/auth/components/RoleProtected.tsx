import { Navigate, Outlet } from "react-router-dom";
import { IAuthData } from "../types/auth";
import localStorageUtils from "../../../shared/utils/localStorage";

interface RoleProtectedProps {
  allowedRoles: string[];
}

export default function RoleProtected({ allowedRoles }: RoleProtectedProps) {
  const user = localStorageUtils.get<IAuthData>("user");

  if (!user?.isLogin) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/401" replace />;
  }

  return <Outlet />;
}
