import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../shared/components/atoms/Button";
import Table from "../../../shared/components/organisms/Table";
import Dropdown from "../../../shared/components/molecules/Dropdown";
import List from "../../../shared/components/atoms/List";
import { useRef, useState } from "react";
import usePersonnel from "../../../features/personnel/hooks/usePersonnel";
import PersonnelFilter from "../../../features/personnel/components/PersonnelFilter";
import { FilterValues } from "../../../shared/components/organisms/TableFilter";
import CreatePersonnel from "../../../features/personnel/components/CreatePersonnel";
import EmptyTableData from "../../../shared/components/molecules/EmptyTable";

export default function PersonnelPage() {
  const tableHead = ["Nama", "Jabatan/Peran", "Aksi"];
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [filterValue, setFilterValue] = useState<FilterValues>();

  const { personnels, isFetched } = usePersonnel({
    search: filterValue?.search || "",
    role_id: filterValue?.select || "",
  });

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
                  <td>{item.name}</td>
                  <td>{item.role_name}</td>
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

      <CreatePersonnel ref={dialogRef} />
    </div>
  );
}
