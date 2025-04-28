import localStorageUtils from "../../../shared/utils/localStorage";
import { IAuthData } from "../../auth/types/auth";

interface IRoleCheckingResult {
  isAuthority: boolean;
  name?: string;
  role?: string;
}

export default function roleCheking(): IRoleCheckingResult {
  if (!localStorageUtils.has("user")) {
    return {
      isAuthority: false,
      name: "",
      role: "",
    };
  }
  const user = localStorageUtils.get<IAuthData>("user");
  if (user?.isLogin && !["admin", "hakim", "panitera"].includes(user.role)) {
    return {
      isAuthority: false,
      name: user?.name,
      role: user?.role,
    };
  }

  return {
    isAuthority: true,
    name: user?.name,
    role: user?.role,
  };
}
