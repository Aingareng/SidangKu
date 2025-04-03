import Modal from "../../../shared/components/organisms/Modal";
import Form from "../../../shared/components/molecules/Form";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import { ChangeEvent, ForwardedRef, useActionState, useState } from "react";
import Select from "../../../shared/components/atoms/Select";
import Button from "../../../shared/components/atoms/Button";
import { z } from "zod";
import usePersonnel from "../hooks/usePersonnel";
import { IPersonnelPayload } from "../types/personnel";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Nama pihak minimal 3 karakter")
    .max(20, "Nama pihak maksimal 20 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .regex(
      /^\+?[0-9]+$/,
      "Nomor telepon hanya boleh mengandung angka dan boleh diawali dengan +"
    ),
  password: z
    .string()
    .min(8, "Password harus minimal 8 karakter")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password harus mengandung setidaknya 1 huruf besar, 1 angka, dan 1 karakter spesial"
    ),
  role_id: z.string().nonempty("Wajib memilih Jabatan/peran"),
});

type FormState = {
  errors: {
    [key in keyof z.infer<typeof formSchema>]?: string[] | undefined;
  };
  message: string;
};
const initialState: FormState = {
  errors: {},
  message: "",
};

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
}

export default function CreatePersonnel({ ref }: IProps) {
  const [isShowPassword, setIshowPassword] = useState(false);
  const [formData, setFormData] = useState<IPersonnelPayload>({
    name: "",
    role_id: "0",
    email: "",
    password: "",
    phone: "",
  });
  const { createPersonnel } = usePersonnel();

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setFormData((prev) => ({
      ...prev,
      role_id: event.target.value,
    }));
  }
  function handleTextInputChange(
    field: keyof IPersonnelPayload,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function submitForm(_prevState: FormState, formData: FormData) {
    try {
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        password: formData.get("password"),
        role_id: formData.get("role_id"),
      };

      // Validasi dengan Zod
      const validatedData = formSchema.parse(data);

      // Jika validasi berhasil, lakukan aksi submit
      createPersonnel({
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
        role_id: validatedData.role_id,
        phone: validatedData.phone, // Ensure phone is included
      });

      return {
        errors: {},
        message: "Form submitted successfully!",
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          errors: error.flatten().fieldErrors,
          message: "Validation error",
        };
      }
      return {
        errors: {},
        message: "Unknown error occurred",
      };
    }
  }

  const [state, formAction] = useActionState(submitForm, initialState);
  return (
    <Modal ref={ref}>
      <div className="grid grid-cols-1 gap-4  w-8/12  ">
        <h1 className="text-2xl font-bold text-center">Tambah Pihak</h1>
        <Form
          attributes={{
            action: formAction,
            className: "grid grid-cols-1 gap-4",
          }}
        >
          <main>
            <Label
              labelType="form-control"
              leftLabel="Nama Pihak"
              bottomLeftLabel={
                state.errors?.name && (
                  <span className="text-red-500 text-sm">
                    {state.errors.name[0]}
                  </span>
                )
              }
            >
              <Input
                attributes={{
                  className: `input input-bordered w-full ${
                    state.errors.name ? "input-error" : ""
                  }`,
                  type: "text",
                  name: "name",
                  placeholder: "Masukkan nama pihak",
                  required: true,
                  value: formData?.name,
                  onChange: (event) => handleTextInputChange("name", event),
                }}
              />
            </Label>

            <Label
              labelType="form-control"
              leftLabel="Email"
              bottomLeftLabel={
                state.errors?.email && (
                  <span className="text-red-500 text-sm">
                    {state.errors.email[0]}
                  </span>
                )
              }
            >
              <Input
                attributes={{
                  className: `input input-bordered w-full ${
                    state.errors.email ? "input-error" : ""
                  }`,
                  type: "email",
                  name: "email",
                  placeholder: "Cth : John@example.com",
                  required: true,
                  value: formData?.email,
                  onChange: (event) => handleTextInputChange("email", event),
                }}
              />
            </Label>

            <Label
              labelType="form-control"
              leftLabel="No Handphone"
              bottomLeftLabel={
                state.errors?.phone && (
                  <span className="text-red-500 text-sm">
                    {state.errors.phone[0]}
                  </span>
                )
              }
            >
              <Input
                attributes={{
                  className: `input input-bordered w-full ${
                    state.errors.phone ? "input-error" : ""
                  }`,
                  type: "text",
                  name: "phone",
                  placeholder: "Cth : 0822xxxxxx",
                  required: true,
                  value: formData?.phone,
                  onChange: (event) => handleTextInputChange("phone", event),
                }}
              />
            </Label>

            <div className="flex items-end gap-4">
              <Label
                labelType="form-control"
                leftLabel="Password"
                bottomLeftLabel={
                  state.errors?.password && (
                    <span className="text-red-500 text-sm">
                      {state.errors.password[0]}
                    </span>
                  )
                }
              >
                <Input
                  attributes={{
                    className: `input input-bordered w-full ${
                      state.errors.password ? "input-error" : ""
                    }`,
                    type: isShowPassword ? "text" : "password",
                    name: "password",
                    placeholder: "Masukan kata sandi",
                    required: true,
                    value: formData?.password,
                    onChange: (event) =>
                      handleTextInputChange("password", event),
                  }}
                />
              </Label>
              <input
                type="checkbox"
                className="checkbox checkbox-sm mb-4"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setIshowPassword(event.target.checked)
                }
              />
            </div>

            <Label
              labelType="form-control"
              leftLabel="Jabatan/Peran"
              bottomLeftLabel={
                state.errors?.role_id && (
                  <span className="text-red-500 text-sm">
                    {state.errors.role_id[0]}
                  </span>
                )
              }
            >
              <Select
                attr={{
                  className: `input input-bordered w-full ${
                    state.errors.role_id ? "input-error" : ""
                  }`,
                  required: true,
                  name: "role_id",
                  value: formData?.role_id,
                  onChange: (event) => handleSelectChange(event),
                }}
              >
                <option disabled value="0">
                  Pilih Satu
                </option>
                <option value="1">Hakim</option>
                <option value="2">Panitera</option>
                <option value="3">Panitera Pengganti</option>
                <option value="4">Jaksa</option>
                <option value="5">Pengacara</option>
                <option value="6">Penggugat</option>
                <option value="7">Tergugat</option>
                <option value="8">Saksi</option>
              </Select>
            </Label>
          </main>
          <footer className="flex items-center justify-end">
            <Button
              attributes={{ type: "submit", className: "btn btn-primary" }}
            >
              Tambah
            </Button>
          </footer>
        </Form>
      </div>
    </Modal>
  );
}
