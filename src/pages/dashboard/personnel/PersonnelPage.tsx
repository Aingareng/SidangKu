import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../shared/components/atoms/Button";
import Table from "../../../shared/components/organisms/Table";
import Dropdown from "../../../shared/components/molecules/Dropdown";
import List from "../../../shared/components/atoms/List";
import { ChangeEvent, useRef, useState } from "react";
import Modal from "../../../shared/components/organisms/Modal";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import Select from "../../../shared/components/atoms/Select";
import Form from "../../../shared/components/molecules/Form";
import usePersonnel from "../../../features/personnel/hooks/usePersonnel";

export default function PersonnelPage() {
  const tableHead = ["Nama", "Jabatan", "Aksi"];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isShowPassword, setIshowPassword] = useState(false);

  const { personnels, isFetched } = usePersonnel();

  const tableHeadContent = (
    <>
      {tableHead.map((item) => (
        <th key={item}>{item}</th>
      ))}
    </>
  );

  function handleAction(id: number, key: string) {
    if (key === "UPDATE" && id) {
      dialogRef.current?.showModal();
    }
    if (key === "DELETE" && id) {
      console.log("Delete item with id", id);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      <header>
        <div className=" flex justify-between items-center">
          <h1 className="text-3xl font-bold">Daftar Pihak Terkait</h1>
          <Button
            attributes={{
              className: "btn btn-primary",
              type: "button",
              onClick: () => dialogRef.current?.showModal(),
            }}
          >
            <Icon
              icon="material-symbols:add-2-rounded"
              width="24"
              height="24"
            />
            Tambah Pihak
          </Button>
        </div>
      </header>

      <main className="bg-base-100 p-4  rounded-2xl">
        <div className="overflow-x-auto border rounded-2xl bg-base-100">
          {isFetched && personnels && personnels.length > 0 && (
            <Table
              attributes={{ className: "table" }}
              tableHead={tableHeadContent}
            >
              {personnels.map((item, index) => (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.role_name}</td>
                  <th>
                    <Dropdown
                      itemIndex={item.id}
                      tableLength={personnels.length}
                    >
                      <List>
                        <Button
                          attributes={{
                            type: "button",
                            onClick: () => handleAction(item.id, "UPDATE"),
                            className: "w-full text-left",
                          }}
                        >
                          <Icon icon="mdi:gavel" className="mr-2" />
                          Edit
                        </Button>
                      </List>
                      <List>
                        <Button
                          attributes={{
                            type: "button",
                            onClick: () => handleAction(item.id, "DELETE"),
                            className: "w-full text-left text-red-600",
                          }}
                        >
                          <Icon icon="mdi:trash-can-outline" className="mr-2" />
                          Hapus
                        </Button>
                      </List>
                    </Dropdown>
                  </th>
                </tr>
              ))}
            </Table>
          )}
        </div>
      </main>

      <Modal ref={dialogRef}>
        <div className="grid grid-cols-1 gap-4  w-8/12  ">
          <h1 className="text-2xl font-bold text-center">Tambah Pihak</h1>
          <Form attributes={{ className: "grid grid-cols-1 gap-4" }}>
            <main>
              <Label labelType="form-control" leftLabel="Nama Pihak">
                <Input
                  attributes={{
                    className: "input input-bordered w-full",
                    type: "text",
                    name: "party-name",
                    placeholder: "Masukkan nama pihak",
                    required: true,
                  }}
                />
              </Label>

              <Label labelType="form-control" leftLabel="Email">
                <Input
                  attributes={{
                    className: "input input-bordered w-full",
                    type: "email",
                    name: "party-name",
                    placeholder: "Cth : John@example.com",
                    required: true,
                  }}
                />
              </Label>

              <div className="flex items-end gap-4">
                <Label labelType="form-control" leftLabel="Password">
                  <Input
                    attributes={{
                      className: "input input-bordered w-full",
                      type: isShowPassword ? "text" : "password",
                      name: "party-name",
                      placeholder: "Masukan kata sandi",
                      required: true,
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

              <Label labelType="form-control" leftLabel="Jabatan/Peran">
                <Select
                  attr={{
                    className: "select select-bordered w-full max-w-xs",
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
                </Select>
              </Label>
            </main>
            <footer className="flex items-center justify-end">
              <Button
                attributes={{ type: "button", className: "btn btn-primary" }}
              >
                Tambah
              </Button>
            </footer>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
