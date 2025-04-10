import { ForwardedRef } from "react";
import { ButtonAttributes } from "../../../shared/libs/elementAttributes";
import Form from "../../../shared/components/molecules/Form";
import Modal from "../../../shared/components/organisms/Modal";
import Button from "../../../shared/components/atoms/Button";
import MultipleAgenda from "./MultipleAgenda";
import MultiplePlaintiff from "./MultiplePlaintiff";
import localStorageUtils from "../../../shared/utils/localStorage";
import { ISchedulePayload } from "../types/schedules";
import MultipleDefendant from "./MultipleDefendant";
import MultipleJudges from "./MultipleJudges";
import CaseNumberInput from "./CaseNumberInput";
import PaniteraInput from "./PaniteraInput";
import useSchedules from "../hooks/useSchedules";

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
}

export default function CreateSchedules({ ref }: IProps) {
  ButtonAttributes.type = "submit";
  const { createSchedule } = useSchedules();

  function handleAddSchedule(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = localStorageUtils.get<ISchedulePayload>("newSchedule");
    if (data) {
      createSchedule(data);
    } else {
      console.error("No schedule data found in localStorage.");
    }
  }

  return (
    <Modal ref={ref}>
      {/* w-8/12  */}
      <div className="grid grid-cols-1 gap-4  w-full ">
        <h1 className="text-2xl font-bold text-center">Tambah Jadwal</h1>
        <Form attributes={{ onSubmit: (e) => handleAddSchedule(e) }}>
          <main className="grid grid-cols-1 gap-3">
            <CaseNumberInput />
            <PaniteraInput />
            <MultipleAgenda />
            <MultiplePlaintiff />
            <MultipleDefendant />
            <MultipleJudges />
          </main>
          <footer className="flex items-center justify-end mt-3">
            <Button attributes={ButtonAttributes}>Tentukan</Button>
          </footer>
        </Form>
      </div>
    </Modal>
  );
}
