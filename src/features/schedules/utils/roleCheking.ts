import localStorageUtils from "../../../shared/utils/localStorage";
import { IAuthData } from "../../auth/types/auth";

interface IRoleCheckingResult {
  isAuthority: boolean;
}

export default function roleCheking(): IRoleCheckingResult {
  if (!localStorageUtils.has("user")) {
    return {
      isAuthority: false,
    };
  }
  const user = localStorageUtils.get<IAuthData>("user");
  if (user?.isLogin && !["admin", "hakim", "panitera"].includes(user.role)) {
    return {
      isAuthority: false,
    };
  }

  return {
    isAuthority: true,
  };
}
