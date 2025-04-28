import React, {
  ChangeEvent,
  useActionState,
  useCallback,
  useState,
} from "react";
import Form from "../../../shared/components/molecules/Form";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import Button from "../../../shared/components/atoms/Button";
import useAuth from "../hooks/useAuth";
import localStorageUtils from "../../../shared/utils/localStorage";
import { IAuthData } from "../types/auth";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
}

const LoginForm = () => {
  const { login } = useAuth();
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const initialForm: LoginFormData = {
    email: "",
    password: "",
    errors: {},
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleLogin(
    _prevState: unknown,
    formData: FormData
  ): Promise<LoginFormData> {
    const newErrors: Record<string, string> = {};
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validasi Email
    if (!email) {
      newErrors.email = "Email tidak boleh kosong";
    } else if (!email.trim()) {
      newErrors.email = "Email tidak boleh kosong";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Validasi Password
    if (!password) {
      newErrors.password = "Password tidak boleh kosong";
    } else if (!password.trim()) {
      newErrors.password = "Password tidak boleh kosong";
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    const response = await login({ email, password });

    if (response?.status === 400) {
      newErrors.email = response.message;
      newErrors.password = response.message;
    } else if (response?.status === 401) {
      newErrors.email = response.message;
      newErrors.password = response.message;
    }
    if (Object.keys(newErrors).length > 0) {
      // Jika ada error, update state form agar pesan error muncul
      return {
        errors: newErrors,
        email,
        password,
      };
    }

    // Jika tidak ada error, jalankan login
    if (response?.status === 200) {
      localStorageUtils.set<IAuthData>("user", {
        isLogin: true,
        role: response.data?.role as string,
        name: response.data?.name as string,
      });

      navigate("/", { replace: true });
    }
    // Batalkan proses login
    return {
      errors: {
        email: "",
        password: "",
      },
      email,
      password,
    };
  }

  const [form, formAction] = useActionState(handleLogin, initialForm);

  const loginButtonAttr: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "submit",
    className: "btn btn-outline btn-primary w-full",
  };

  const formAttr: React.FormHTMLAttributes<HTMLFormElement> = {
    className: "grid grid-cols-1 gap-5",
    action: formAction,
  };

  const renderErrorMessage = useCallback(
    (message: string) => (
      <span className="text-red-500 text-sm">{message}</span>
    ),
    []
  );

  return (
    <Form attributes={formAttr}>
      <Label labelType="form-control" leftLabel="Alamat Email">
        <Input
          attributes={{
            type: "email",
            name: "email",
            className: "input input-bordered w-full",
            placeholder: "Cth: John@example.com",
          }}
        />
      </Label>
      <div className="flex items-end  gap-3">
        <Label
          labelType="form-control"
          leftLabel="Password"
          bottomLeftLabel={renderErrorMessage(form.errors.password || "")}
          className="w-11/12"
        >
          <Input
            attributes={{
              type: `${showPwd ? "text" : "password"}`,
              name: "password",
              className: "input input-bordered w-full",
              placeholder: "Masukan Password",
              defaultValue: form.password,
            }}
          />
        </Label>
        <Input
          attributes={{
            type: "checkbox",
            className: "checkbox checkbox-sm mb-3",
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              setShowPwd(event.target.checked),
          }}
        />
      </div>

      <Button attributes={loginButtonAttr}>Masuk</Button>
    </Form>
  );
};

export default LoginForm;
