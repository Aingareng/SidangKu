import { useRef, useState } from "react";

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

export default function CaseHistoryPage() {
  MenuAttributes.className = "menu menu-horizontal bg-base-200 rounded-box";
  FormAttributes.className = " grid grid-cols-1 gap-4";
  ButtonAttributes.className += " btn-primary";

  const dialogRef = useRef<HTMLDialogElement>(null);
  const scheduleDialog = useRef<HTMLDialogElement>(null);

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
  const [tableBody] = useState([
    {
      no: 1,
      tanggal: "2025-03-08",
      nomorPerkara: "123/PDT.G/2025/PN.JKT",
      agenda: "Sidang Perdana",
      penggugat: "Budi Santoso",
      tergugat: "PT. Maju Jaya",
      majelisHakim: "Hakim A, Hakim B, Hakim C",
      paniteraPengganti: "Siti Rohmah",
      nomorAntrian: 5,
      ruangSidang: 1,
    },
    {
      no: 2,
      tanggal: "2025-03-09",
      nomorPerkara: "124/PDT.G/2025/PN.JKT",
      agenda: "Pemeriksaan Saksi",
      penggugat: "Andi Wijaya",
      tergugat: "CV. Sejahtera",
      majelisHakim: "Hakim X, Hakim Y, Hakim Z",
      paniteraPengganti: "Doni Pratama",
      nomorAntrian: 3,
      ruangSidang: 1,
    },
    {
      no: 3,
      tanggal: "2025-03-10",
      nomorPerkara: "125/PDT.G/2025/PN.JKT",
      agenda: "Putusan Sidang",
      penggugat: "Siti Aminah",
      tergugat: "PT. Karya Abadi",
      majelisHakim: "Hakim D, Hakim E, Hakim F",
      paniteraPengganti: "Rina Lestari",
      nomorAntrian: 7,
      ruangSidang: 1,
    },
  ]);

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

  const tableHeadContent = (
    <>
      {tableHead.map((item) => (
        <th key={item}>{item}</th>
      ))}
    </>
  );

  const tableBodyContent = (
    <>
      {tableBody.map((item) => (
        <tr key={item.no}>
          <th>{item.no}</th>
          <td>{item.tanggal}</td>
          <td>{item.nomorPerkara}</td>
          <td>{item.agenda}</td>
          <td>{item.penggugat}</td>
          <td>{item.tergugat}</td>
          <td>{item.majelisHakim}</td>
          <td>{item.paniteraPengganti}</td>
          <td>{item.nomorAntrian}</td>
          <td>{item.ruangSidang}</td>
          <th>
            <Dropdown itemIndex={item.no}>
              <List>
                <Button
                  attributes={{
                    type: "button",
                    onClick: () => handleAction(item.no, "SET_HEARING"),
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
                    onClick: () => handleAction(item.no, "DELETE"),
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
      <main>
        <div className="overflow-x-auto border rounded-2xl bg-base-100">
          <Table attributes={TableAttributes} tableHead={tableHeadContent}>
            {tableBodyContent}
          </Table>
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
