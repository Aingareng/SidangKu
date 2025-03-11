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
import { getInputTextAttributes } from "../../../shared/utils/getElementAttributes";
import Button from "../../../shared/components/atoms/Button";

export default function CaseHistoryPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  MenuAttributes.className = "menu menu-horizontal bg-base-200 rounded-box";
  FormAttributes.className = " grid grid-cols-1 gap-4";
  ButtonAttributes.className += " btn-primary";

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
            <Dropdown itemIndex={item.no} onAction={handleDestroyEmployee} />
          </th>
        </tr>
      ))}
    </>
  );

  async function handleDestroyEmployee(id: number, key: string) {
    console.log("🚀 ~ handleDestroyEmployee ~ key:", key);
    console.log("🚀 ~ CaseHistoryPage ~ id:", id);

    if (key === "SET_HEARING" && id) {
      dialogRef.current?.showModal();
    }
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

  return (
    <section>
      <header></header>
      <main>
        <div className="overflow-x-auto border rounded-2xl bg-base-100">
          <Table attributes={TableAttributes} tableHead={tableHeadContent}>
            {tableBodyContent}
          </Table>
        </div>
      </main>

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
