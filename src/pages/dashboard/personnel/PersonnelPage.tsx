import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../shared/components/atoms/Button";
import Table from "../../../shared/components/organisms/Table";
import Dropdown from "../../../shared/components/molecules/Dropdown";
import List from "../../../shared/components/atoms/List";
import { useCallback, useEffect, useRef, useState } from "react";
import usePersonnel from "../../../features/personnel/hooks/usePersonnel";
import PersonnelFilter from "../../../features/personnel/components/PersonnelFilter";
import { FilterValues } from "../../../shared/components/organisms/TableFilter";
import CreatePersonnel from "../../../features/personnel/components/CreatePersonnel";
import EmptyTableData from "../../../shared/components/molecules/EmptyTable";
import { formatString } from "../../../shared/utils/stringFormatter";
import { useToast } from "../../../shared/hooks/useToast";

export default function PersonnelPage() {
  const tableHead = ["Nama", "Jabatan/Peran", "Status", "Aksi"];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isUpdate = useRef<boolean>(false);
  const { Toast, showToast } = useToast();
  const [sendingStatus, setSendingStatus] = useState<number | undefined>();

  const [filterValue, setFilterValue] = useState<FilterValues>();

  const { personnels, isFetched, deletePersonnel } = usePersonnel({
    search: filterValue?.search || "",
    role_id: filterValue?.select || "",
  });
  const [selectUser, setSelectUser] = useState<number | null>(null);

  const tableHeadContent = (
    <>
      {tableHead.map((item) => (
        <th key={item}>{item}</th>
      ))}
    </>
  );

  async function handleAction(id: number, key: string) {
    if (key === "UPDATE" && id) {
      isUpdate.current = true;
      setSelectUser(id);
      dialogRef.current?.showModal();
    }
    if (key === "DELETE" && id) {
      const deleteResult = await deletePersonnel(id);

      if (deleteResult?.status === 200 || deleteResult?.status === 201) {
        showToast({
          type:
            deleteResult?.status === 200 || deleteResult?.status === 201
              ? "success"
              : "error",
          message:
            deleteResult?.status === 200 || deleteResult?.status === 201
              ? "Berhasil menghapus pihak"
              : "Gagal menghapus pihak",
        });
      }
    }
  }

  const handleOnSendStatus = useCallback((statusCode: number | undefined) => {
    setSendingStatus(statusCode);
  }, []);

  useEffect(() => {
    if (sendingStatus !== undefined) {
      showToast({
        type: sendingStatus === 201 ? "success" : "error",
        message:
          sendingStatus === 201
            ? "Berhasil menambahkan user"
            : "Gagal menambahkan user",
        duration: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendingStatus]);

  const selectedPersonnel = selectUser
    ? personnels?.find((person) => person.id === selectUser)
    : null;

  const initialValue = selectedPersonnel
    ? {
        name: selectedPersonnel.name ?? "",
        password: "", // misalkan password diset kosong saat edit
        phone: selectedPersonnel.phone ?? "",
        role_id: selectedPersonnel.role_id ?? "",
        email: selectedPersonnel.email ?? "",
      }
    : {
        name: "",
        password: "",
        phone: "",
        role_id: "",
        email: "",
      };

  return (
    <div className="grid grid-cols-1 gap-5">
      <Toast />
      <header>
        <div className=" flex justify-between items-center">
          <h1 className="text-3xl font-bold">Daftar Pihak Terkait</h1>
          <Button
            attributes={{
              className: "btn btn-primary",
              type: "button",
              onClick: () => {
                isUpdate.current = false;
                setSelectUser(null);
                dialogRef.current?.showModal();
              },
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

      <main className="bg-base-100 p-4 grid grid-cols-1 gap-4  rounded-2xl">
        <PersonnelFilter filterResults={(result) => setFilterValue(result)} />
        <div className="overflow-x-auto border rounded-2xl bg-base-100">
          {isFetched && personnels && personnels.length === 0 ? (
            <EmptyTableData />
          ) : (
            <Table
              attributes={{ className: "table" }}
              tableHead={tableHeadContent}
            >
              {personnels?.map((item, index) => (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>{formatString(item.name, "capitalize")}</td>
                  <td>{formatString(item.role_name, "capitalize")}</td>
                  <td>{formatString(item.user_status, "capitalize")}</td>
                  <th>
                    <Dropdown
                      itemIndex={item.id}
                      tableLength={personnels?.length}
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
                      {item.user_status === "inactive" && (
                        <List>
                          <Button
                            attributes={{
                              type: "button",
                              onClick: () => handleAction(item.id, "DELETE"),
                              className: "w-full text-left text-red-600",
                            }}
                          >
                            <Icon
                              icon="mdi:trash-can-outline"
                              className="mr-2"
                            />
                            Hapus
                          </Button>
                        </List>
                      )}
                    </Dropdown>
                  </th>
                </tr>
              ))}
            </Table>
          )}
        </div>
      </main>

      <CreatePersonnel
        ref={dialogRef}
        initialValue={initialValue}
        isUpdate={isUpdate.current}
        onSendingStatus={handleOnSendStatus}
      />
    </div>
  );
}
