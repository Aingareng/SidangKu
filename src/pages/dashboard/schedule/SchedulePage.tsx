import { ChangeEvent, useRef, useState } from "react";

import Table from "../../../shared/components/organisms/Table";
import {
  ButtonAttributes,
  FormAttributes,
  MenuAttributes,
  TableAttributes,
} from "../../../shared/libs/elementAttributes";
import Dropdown from "../../../shared/components/molecules/Dropdown";
import Modal from "../../../shared/components/organisms/Modal";
import Form from "../../../shared/components/molecules/Form";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import {
  getButtonAttributes,
  getInputTextAttributes,
} from "../../../shared/utils/getElementAttributes";
import Button from "../../../shared/components/atoms/Button";
import CreateSchedules from "../../../features/schedules/components/CreateSchedules";
import { Icon } from "@iconify/react/dist/iconify.js";
import List from "../../../shared/components/atoms/List";
import TableFilter, {
  FilterValues,
} from "../../../shared/components/organisms/TableFilter";
import useSchedules from "../../../features/schedules/hooks/useSchedules";
import EmptyTableData from "../../../shared/components/molecules/EmptyTable";

export default function CaseHistoryPage() {
  MenuAttributes.className = "menu menu-horizontal bg-base-200 rounded-box";
  FormAttributes.className = " grid grid-cols-1 gap-4";
  ButtonAttributes.className += " btn-primary";

  const dialogRef = useRef<HTMLDialogElement>(null);
  const scheduleDialog = useRef<HTMLDialogElement>(null);
  const [enteredValues, setEnteredValues] = useState<FilterValues>({
    search: "",
  });

  const { schedules } = useSchedules();

  const [tableHead] = useState([
    "Tanggal",
    "Nomor Perkara",
    "Agenda",
    "Penggugat",
    "Tergugat",
    "Majelis Hakim",
    "Panitera Pengganti",
    "Nomor Antrian",
    "Ruang Sidang",
    "",
  ]);
  const [tableBody] = useState(schedules || []);

  function handleAction(id: number, key: string) {
    if (key === "SET_HEARING" && id) {
      dialogRef.current?.showModal();
    }
    if (key === "DELETE" && id) {
      console.log("Delete item with id", id);
    }
  }
  function handleAddSchedule() {
    scheduleDialog.current?.showModal();
  }
  const queueInputAttr = {
    ...getInputTextAttributes({
      name: "queue",
      type: "number",
      min: 0,
      className: "input input-bordered w-full",
    }),
  };

  const roomInputAttr = {
    ...getInputTextAttributes({
      name: "room",
      type: "number",
      min: 0,
      className: "input input-bordered w-full",
    }),
  };

  const btnAttr = {
    ...getButtonAttributes({
      type: "button",
      className: "btn btn-primary",
      onClick: handleAddSchedule,
    }),
  };

  function handleSubmitFilter(filterValues: FilterValues) {
    console.log(filterValues);
  }

  const tableHeadContent = (
    <>
      {tableHead.map((item) => (
        <th key={item}>{item}</th>
      ))}
    </>
  );

  const tableBodyContent = (
    <>
      {tableBody.map((item, idx) => (
        <tr key={item.id}>
          <th>{idx + 1}</th>
          <td>{item.scheduled_date}</td>
          <td>{item.case_number}</td>
          <td>
            {item.agendas.map((agenda) => (
              <p key={agenda}>{agenda}</p>
            ))}
          </td>
          <td>
            {item.plaintiffs.map((plaintiff) => (
              <p key={plaintiff}>{plaintiff}</p>
            ))}
          </td>
          <td>
            {item.defendants.map((defendant) => (
              <p key={defendant}>{defendant}</p>
            ))}
          </td>
          <td>
            {item.judges.map((judge) => (
              <p key={judge}>{judge}</p>
            ))}
          </td>
          <td>{item.panitera}</td>
          <td>{item.queue_number}</td>
          <td>{item.location}</td>
          <th>
            <Dropdown itemIndex={item.id}>
              <List>
                <Button
                  attributes={{
                    type: "button",
                    onClick: () => handleAction(item.id, "SET_HEARING"),
                    className: "w-full text-left",
                  }}
                >
                  <Icon icon="mdi:gavel" className="mr-2" />
                  Tentukan Sidang
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
    </>
  );

  return (
    <section className="grid grid-cols-1 gap-5">
      <header>
        <div className=" flex justify-between items-center">
          <h1 className="text-3xl font-bold">Jadwal Sidang</h1>
          <Button attributes={btnAttr}>
            <Icon
              icon="material-symbols:add-2-rounded"
              width="24"
              height="24"
            />
            Tambah Jadwal
          </Button>
        </div>
      </header>
      <main className="bg-base-100 p-4 grid grid-cols-1 gap-4  rounded-2xl">
        <TableFilter
          onSubmit={handleSubmitFilter}
          onReset={() =>
            setEnteredValues({
              search: "",
            })
          }
          className="flex items-end"
          searchInput={{
            useSearchInput: true,
            label: "Cari Perkara",
            placeholder: "Masukan nomor perkara atau pihak terkait",
            value: enteredValues.search as string,
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              setEnteredValues((prev) => {
                return {
                  ...prev,
                  search: event.target.value,
                };
              });
            },
          }}
        />

        <div className="overflow-x-auto border rounded-2xl bg-base-100">
          {tableBody && tableBody.length === 0 ? (
            <EmptyTableData />
          ) : (
            <Table attributes={TableAttributes} tableHead={tableHeadContent}>
              {tableBodyContent}
            </Table>
          )}
        </div>
      </main>

      {/*Modal section */}

      <CreateSchedules ref={scheduleDialog} />

      <Modal ref={dialogRef}>
        <div className="grid grid-cols-1 gap-4  w-8/12  ">
          <h1 className="text-2xl font-bold text-center">Tetapkan sidang</h1>
          <Form attributes={FormAttributes}>
            <main>
              <Label labelType="form-control" leftLabel="Nomor Antrian">
                <Input attributes={queueInputAttr} />
              </Label>
              <Label labelType="form-control" leftLabel="Ruang Sidang">
                <Input attributes={roomInputAttr} />
              </Label>
            </main>
            <footer className="flex items-center justify-end">
              <Button attributes={ButtonAttributes}>Tentukan</Button>
            </footer>
          </Form>
        </div>
      </Modal>
    </section>
  );
}
