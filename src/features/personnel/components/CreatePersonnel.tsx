import Modal from "../../../shared/components/organisms/Modal";
import Form from "../../../shared/components/molecules/Form";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import {
  ChangeEvent,
  ForwardedRef,
  memo,
  useActionState,
  useEffect,
  useState,
} from "react";
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
  email: z.string().email("Email tidak valid").optional(),
  phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .regex(
      /^\+?[0-9]+$/,
      "Nomor telepon hanya boleh mengandung angka dan boleh diawali dengan +"
    )
    .optional(),
  password: z
    .string()
    .min(8, "Password harus minimal 8 karakter")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password harus mengandung setidaknya 1 huruf besar, 1 angka, dan 1 karakter spesial"
    )
    .optional(),
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
  initialValue?: IPersonnelPayload;
  isUpdate: boolean;
  onSendingStatus?: (statusCode: number | undefined) => void;
}

function CreatePersonnel({
  ref,
  initialValue,
  isUpdate,
  onSendingStatus,
}: IProps) {
  const [formErrors, setFormErrors] = useState<FormState["errors"]>({});
  const [isShowPassword, setIshowPassword] = useState(false);
  const [formData, setFormData] = useState<IPersonnelPayload>({
    name: "",
    role_id: "",
    email: "",
    password: "",
    phone: "",
  });
  const { createPersonnel } = usePersonnel();
  const modalRef = ref as React.RefObject<HTMLDialogElement>;

  const [sendingStatus, setSendingStatus] = useState({
    isPending: false,
    isError: false,
  });

  useEffect(() => {
    if (initialValue) {
      setFormData({
        name: initialValue.name || "",
        email: initialValue.email || "",
        phone: initialValue.phone || "",
        password: initialValue.password || "",
        role_id: initialValue.role_id || "",
      });
    }
  }, [initialValue]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (!modalElement) return;

    function handleClose() {
      if (isUpdate && initialValue) {
        // Mode update: reset ke initialValue
        setFormData({
          name: initialValue.name || "",
          email: initialValue.email || "",
          phone: initialValue.phone || "",
          password: initialValue.password || "",
          role_id: initialValue.role_id || "",
        });
      } else {
        // Mode create: reset kosong semua
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          role_id: "",
        });
      }

      // Clear all errors juga
      setFormErrors({});
    }

    modalElement.addEventListener("close", handleClose);

    return () => {
      modalElement.removeEventListener("close", handleClose);
    };
  }, [initialValue, isUpdate, modalRef]);

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setFormData((prev) => ({
      ...prev,
      role_id: event.target.value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      role_id: undefined,
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

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: undefined,
    }));
  }

  async function submitForm(_prevState: FormState, formData: FormData) {
    try {
      const data = {
        name: formData.get("name"),
        email: formData.get("email") ?? undefined,
        phone: formData.get("phone") ?? undefined,
        password: formData.get("password") ?? undefined,
        role_id: formData.get("role_id") ?? "",
      };

      // Validasi dengan Zod
      const validatedData = formSchema.parse(data);

      setSendingStatus((prev) => ({ ...prev, isPending: true }));
      // Jika validasi berhasil, lakukan aksi submit
      const result = await createPersonnel({
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
        role_id: validatedData.role_id,
        phone: validatedData.phone, // Ensure phone is included
      });
      setSendingStatus((prev) => ({ ...prev, isPending: false }));

      onSendingStatus?.(result?.status);

      return {
        errors: {},
        message: "Form submitted successfully!",
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;
        console.log("🚀 ~ submitForm ~ errors:", errors);
        setFormErrors(errors);
        return {
          errors: errors,
          message: "Validation error",
        };
      }
      return {
        errors: {},
        message: "Unknown error occurred",
      };
    }
  }

  const [, formAction] = useActionState(submitForm, initialState);
  let showAnotherField = true;

  if (initialValue && +initialValue.role_id === 10) {
    showAnotherField = false;
  }
  if (formData && +formData.role_id === 10) {
    showAnotherField = false;
  }

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
                formErrors.name && (
                  <span className="text-red-500 text-sm">
                    {formErrors.name[0]}
                  </span>
                )
              }
            >
              <Input
                attributes={{
                  className: `input input-bordered w-full ${
                    formErrors.name ? "input-error" : ""
                  }`,
                  type: "text",
                  name: "name",
                  placeholder: "Masukkan nama pihak",
                  value: formData?.name,
                  onChange: (event) => handleTextInputChange("name", event),
                }}
              />
            </Label>

            <Label
              labelType="form-control"
              leftLabel="Jabatan/Peran"
              bottomLeftLabel={
                formErrors.role_id && (
                  <span className="text-red-500 text-sm">
                    {formErrors.role_id[0]}
                  </span>
                )
              }
            >
              <Select
                attr={{
                  className: `input input-bordered w-full ${
                    formErrors.role_id ? "input-error" : ""
                  }`,
                  name: "role_id",
                  value: formData.role_id,
                  onChange: (event) => handleSelectChange(event),
                  required: true,
                }}
              >
                <option disabled value="">
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
                <option value="10">Terdakwa</option>
              </Select>
            </Label>

            {showAnotherField && (
              <>
                <Label
                  labelType="form-control"
                  leftLabel="Email"
                  bottomLeftLabel={
                    formErrors.email && (
                      <span className="text-red-500 text-sm">
                        {formErrors.email[0]}
                      </span>
                    )
                  }
                >
                  <Input
                    attributes={{
                      className: `input input-bordered w-full ${
                        formErrors.email ? "input-error" : ""
                      }`,
                      type: "email",
                      name: "email",
                      placeholder: "Cth : John@example.com",
                      value: formData?.email,
                      onChange: (event) =>
                        handleTextInputChange("email", event),
                    }}
                  />
                </Label>

                <Label
                  labelType="form-control"
                  leftLabel="No Handphone"
                  bottomLeftLabel={
                    formErrors.phone && (
                      <span className="text-red-500 text-sm">
                        {formErrors.phone[0]}
                      </span>
                    )
                  }
                >
                  <Input
                    attributes={{
                      className: `input input-bordered w-full ${
                        formErrors.phone ? "input-error" : ""
                      }`,
                      type: "text",
                      name: "phone",
                      placeholder: "Cth : 0822xxxxxx",
                      value: formData?.phone,
                      onChange: (event) =>
                        handleTextInputChange("phone", event),
                    }}
                  />
                </Label>

                <div className="flex items-end gap-4">
                  <Label
                    labelType="form-control"
                    leftLabel="Password"
                    bottomLeftLabel={
                      formErrors.password && (
                        <span className="text-red-500 text-sm">
                          {formErrors.password[0]}
                        </span>
                      )
                    }
                  >
                    <Input
                      attributes={{
                        className: `input input-bordered w-full ${
                          formErrors.password ? "input-error" : ""
                        }`,
                        type: isShowPassword ? "text" : "password",
                        name: "password",
                        placeholder: "Masukan kata sandi",
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
              </>
            )}
          </main>
          <footer className="flex items-center justify-end">
            <Button
              attributes={{
                type: "submit",
                className: "btn btn-primary",
                disabled: sendingStatus.isPending,
              }}
            >
              {sendingStatus.isPending
                ? "Sedang mengirim..."
                : isUpdate
                ? "Ubah"
                : "Tambah"}
            </Button>
          </footer>
        </Form>
      </div>
    </Modal>
  );
}

export default memo(CreatePersonnel);
