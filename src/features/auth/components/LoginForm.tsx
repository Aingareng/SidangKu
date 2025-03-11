import React from "react";
import Form from "../../../shared/components/molecules/Form";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import Button from "../../../shared/components/atoms/Button";

const LoginForm = () => {
  const inputEmailAttr: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "email",
    name: "email",
    className: "input input-bordered w-full",
    placeholder: "Cth: John@example.com",
  };
  const inputIdentityNumber: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "password",
    name: "password",
    className: "input input-bordered w-full",
    placeholder: "Masukan NIP",
  };

  const loginButtonAttr: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "submit",
    className: "btn btn-outline btn-primary w-full",
  };

  const formAttr: React.FormHTMLAttributes<HTMLFormElement> = {
    className: "grid grid-cols-1 gap-5",
  };
  return (
    <Form attributes={formAttr}>
      <Label labelType="form-control" leftLabel="Alamat Email">
        <Input attributes={inputEmailAttr} />
      </Label>
      <Label labelType="form-control" leftLabel="Nomor Identitas">
        <Input attributes={inputIdentityNumber} />
      </Label>

      <Button attributes={loginButtonAttr}>Masuk</Button>
    </Form>
  );
};

export default LoginForm;
