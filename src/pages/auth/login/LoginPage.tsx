import { useEffect } from "react";
import LoginForm from "../../../features/auth/components/LoginForm";
import AuthLayout from "../layout";
import localStorageUtils from "../../../shared/utils/localStorage";

export default function LoginPage() {
  useEffect(() => {
    if (localStorageUtils.has("user")) {
      localStorageUtils.remove("user");
    }
  }, []);
  return (
    <AuthLayout>
      <div className="card bg-base-100 w-max shadow-xl p-5 grid grid-cols-1 gap-3">
        <header className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold">Masuk ke Akun</h1>
          <p>Silakan masukkan email dan kata sandi Anda untuk melanjutkan</p>
        </header>
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
