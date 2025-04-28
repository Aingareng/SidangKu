import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Table from "../../../shared/components/organisms/Table";
import {
  MenuAttributes,
  TableAttributes,
} from "../../../shared/libs/elementAttributes";
import Dropdown from "../../../shared/components/molecules/Dropdown";
import Modal from "../../../shared/components/organisms/Modal";
import Form from "../../../shared/components/molecules/Form";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import { getButtonAttributes } from "../../../shared/utils/getElementAttributes";
import Button from "../../../shared/components/atoms/Button";
import CreateSchedules from "../../../features/schedules/components/CreateSchedules";
import { Icon } from "@iconify/react/dist/iconify.js";
import List from "../../../shared/components/atoms/List";
import TableFilter, {
  FilterValues,
} from "../../../shared/components/organisms/TableFilter";
import useSchedules from "../../../features/schedules/hooks/useSchedules";
import EmptyTableData from "../../../shared/components/molecules/EmptyTable";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import usePersonnel from "../../../features/personnel/hooks/usePersonnel";
import formatTangal from "../../../shared/utils/formatTanggal";
import roleCheking from "../../../features/schedules/utils/roleCheking";
import { formatString } from "../../../shared/utils/stringFormatter";
import {
  ISchedulePayload,
  TypeUser,
} from "../../../features/schedules/types/schedules";
import { useToast } from "../../../shared/hooks/useToast";
import { useNavigate } from "react-router-dom";

export default function CaseHistoryPage() {
  MenuAttributes.className = "menu menu-horizontal bg-base-200 rounded-box";

  const dialogRef = useRef<HTMLDialogElement>(null);
  const scheduleDialog = useRef<HTMLDialogElement>(null);
  const [enteredValues, setEnteredValues] = useState<FilterValues>({
    search: "",
    select: "",
  });
  const [searchFilterValue, setSearchFilterValue] = useState("");
  const [selectFilterValue, setSelectFilterValue] = useState("");
  const [queueFieldError, setQueueFieldError] = useState<string | undefined>();

  const navigate = useNavigate();

  const { schedules, isFetched, deleteSchedule, updateSchedule } = useSchedules(
    {
      search: searchFilterValue,
      select: selectFilterValue,
    }
  );
  const { personnels } = usePersonnel();
  const [, setvalue] = useLocalStorage("personnels", []);
  const itemSelectId = useRef<number | null>(null);
  const [tableHead] = useState([
    "Tanggal",
    "Nomor Perkara",
    "Tipe Perkara",
    "Agenda",
    "Terdakwa",
    "Penggugat",
    "Tergugat",
    "Majelis Hakim",
    "Panitera Pengganti",
    "Nomor Antrian",
    "Ruang Sidang",
    "",
  ]);
  const [sendingStatus, setSendingStatus] = useState<number | undefined>();

  useEffect(() => {
    setvalue(personnels);
  }, [personnels, setvalue]);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      setTrialValue({
        location: "",
        queue_number: "",
      });
      setQueueFieldError(undefined);
    }
  }, [dialogRef?.current?.open]);

  const { Toast, showToast } = useToast();

  useEffect(() => {
    if (sendingStatus !== undefined) {
      showToast({
        type: sendingStatus === 201 ? "success" : "error",
        message:
          sendingStatus === 201
            ? "Berhasil menambahkan jadwal ujian"
            : "Gagal menambahkan jadwal ujian",
        duration: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendingStatus]);

  async function handleAction(id: number, key: string) {
    itemSelectId.current = id;
    if (key === "SET_HEARING" && id) {
      dialogRef.current?.showModal();
    }
    if (key === "DELETE" && id) {
      const deleteResult = await deleteSchedule(id.toString());
      if (deleteResult?.status !== undefined) {
        showToast({
          type: deleteResult?.status === 200 ? "success" : "error",
          message:
            deleteResult?.status === 200
              ? "Berhasil menghapus jadwal ujian"
              : "Gagal menghapus jadwal ujian",
          duration: 0,
        });
      }
    }
  }

  function handleAddSchedule() {
    if (personnels && personnels.length > 0) {
      scheduleDialog.current?.showModal();
      return;
    }

    showToast({
      type: "warning",
      message: "Perlu menambahkan data pihak",
    });

    setTimeout(() => {
      navigate("/personnel");
    }, 1000);
  }

  const btnAttr = {
    ...getButtonAttributes({
      type: "button",
      className: "btn btn-primary",
      onClick: handleAddSchedule,
    }),
  };

  function handleSubmitFilter(filterValues: FilterValues) {
    setSearchFilterValue(filterValues.search || "");
    setSelectFilterValue(filterValues.select || "");
  }

  const [trialValue, setTrialValue] = useState<{
    location?: string;
    queue_number?: string;
  }>();

  async function handleSetTrial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const schedule = schedules?.find(
      (schedule) => schedule.id === itemSelectId.current
    );

    if (typeof itemSelectId.current === "number") {
      const payload: ISchedulePayload = {
        case_number: schedule?.case_number as string,
        case_type: schedule?.case_type as "perdata" | "pidana",
        judges:
          (schedule?.judges?.map((item) => item.id.toString()) as string[]) ||
          [],
        preacheds:
          (schedule?.preacheds?.map((item) =>
            item.id.toString()
          ) as string[]) || [],
        defendants:
          (schedule?.defendants?.map((item) =>
            item.id.toString()
          ) as string[]) || [],
        plaintiffs:
          (schedule?.plaintiffs?.map((item) =>
            item.id.toString()
          ) as string[]) || [],
        registrar:
          ((schedule?.registrar as TypeUser).id.toString() as string) || "",
        case_detail: schedule?.case_details as string[],
        location: +(trialValue?.location as string),
        queue_number: +(trialValue?.queue_number as string),
      };

      const updateResult = await updateSchedule({
        id: itemSelectId.current,
        payload,
      });

      if (updateResult?.status !== undefined) {
        showToast({
          type: updateResult?.status === 200 ? "success" : "error",
          message:
            updateResult?.status === 200
              ? "Berhasil tentukan ruangan & antrian sidang"
              : "Gagal menentukan ruangan & antrian sidang",
          duration: 0,
        });

        if (updateResult.status === 200) {
          setTrialValue({
            location: "",
            queue_number: "",
          });
          dialogRef.current?.close();
        }

        if (updateResult.status === 400) {
          setQueueFieldError(updateResult.message);
        }
      }
    }
  }

  const handleSendingStatus = useCallback((statusCode: number | undefined) => {
    setSendingStatus(statusCode);
  }, []);

  const user = roleCheking();

  let tableHeadContent = (
    <>
      {tableHead.map((item) => (
        <th key={item}>{item}</th>
      ))}
    </>
  );

  if (!user.isAuthority) {
    tableHeadContent = (
      <>
        {tableHead
          .filter((th) => {
            return [
              "tanggal",
              "nomor perkara",
              "tipe perkara",
              "agenda",
              "nomor antrian",
              "ruang sidang",
              // "",
            ].includes(th.toLowerCase());
          })
          .map((item) => (
            <th key={item}>{item}</th>
          ))}
      </>
    );
  }

  const tableBodyContent = (
    <>
      {schedules &&
        schedules.map((item, idx) => (
          <tr key={item.id}>
            <th>{idx + 1}</th>
            <td>{formatTangal(item.scheduled_date)}</td>
            <td>{item.case_number}</td>
            <td>{formatString(item.case_type, "capitalize")}</td>
            <td> {item.case_details}</td>
            {user.isAuthority && (
              <>
                <td>
                  {item.preacheds
                    ? item.preacheds.map((preached) => (
                        <p key={preached.id}>{preached.name || ""}</p>
                      ))
                    : []}
                </td>
                <td>
                  {item.plaintiffs
                    ? item.plaintiffs.map((plaintiffs) => (
                        <p key={plaintiffs.id}>{plaintiffs.name || ""}</p>
                      ))
                    : []}
                </td>
                <td>
                  {item.defendants
                    ? item.defendants.map((defendant) => (
                        <p key={defendant.id}>{defendant.name || ""}</p>
                      ))
                    : []}
                </td>
                <td>
                  {item.judges
                    ? item.judges.map((judge) => (
                        <p key={judge.id}>{judge.name || ""}</p>
                      ))
                    : []}
                </td>
                <td>{(item.registrar as TypeUser).name || ""}</td>
              </>
            )}

            <td>{item.queue_number}</td>
            <td>{item.location}</td>
            {user.isAuthority && (
              <th>
                <Dropdown>
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
            )}
          </tr>
        ))}
    </>
  );

  return (
    <section className="grid grid-cols-1 gap-5">
      <Toast />
      <header>
        <div className=" flex justify-between items-center">
          <h1 className="text-3xl font-bold">Jadwal Sidang</h1>
          {user.isAuthority && user.role?.toLowerCase() === "admin" && (
            <Button attributes={btnAttr}>
              <Icon
                icon="material-symbols:add-2-rounded"
                width="24"
                height="24"
              />
              Tambah Jadwal
            </Button>
          )}
        </div>
      </header>
      <main className="bg-base-100 p-4 grid grid-cols-1 gap-4  rounded-2xl">
        <TableFilter
          onSubmit={handleSubmitFilter}
          onReset={() => {
            setEnteredValues({
              search: "",
              select: "",
            });
            setSearchFilterValue("");
            setSelectFilterValue("");
          }}
          className="grid grid-cols-[310px_310px_1fr] items-end gap-2"
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
          selectInput={{
            useSelectInput: true,
            label: "Tipe Perkara",
            options: [
              { label: "Pilih Perkara", value: "" },
              { label: "Perdata", value: "perdata" },
              { label: "Pidana", value: "pidana" },
            ],
            value: enteredValues.select || "",
            onChange: (event: ChangeEvent<HTMLSelectElement>) => {
              setEnteredValues((prev) => {
                return {
                  ...prev,
                  select: event.target.value,
                };
              });
            },
          }}
        />

        <div className="overflow-x-auto border rounded-2xl bg-base-100">
          {isFetched && schedules && schedules.length === 0 ? (
            <EmptyTableData />
          ) : (
            <Table attributes={TableAttributes} tableHead={tableHeadContent}>
              {tableBodyContent}
            </Table>
          )}
        </div>
      </main>

      {/*Modal section */}

      <CreateSchedules
        personnelData={personnels || []}
        ref={scheduleDialog}
        onClose={() => scheduleDialog.current?.close()}
        onSendingStatus={handleSendingStatus}
      />

      {/* Modal Penetapan Sidang */}

      <Modal ref={dialogRef}>
        <div className="grid grid-cols-1 gap-4  w-8/12  ">
          <h1 className="text-2xl font-bold text-center">Tetapkan sidang</h1>
          <Form
            attributes={{
              onSubmit: (e) => handleSetTrial(e),
              className: "grid grid-cols-1 gap-4",
            }}
          >
            <main>
              <Label
                labelType="form-control"
                leftLabel="Nomor Antrian"
                bottomLeftLabel={
                  <div className="label">
                    <span className="label-text-alt text-error">
                      {queueFieldError}
                    </span>
                  </div>
                }
              >
                <Input
                  attributes={{
                    name: "queue_number",
                    type: "number",
                    min: 0,
                    className: `input input-bordered w-full ${
                      queueFieldError ? "input-error" : ""
                    }`,
                    value: trialValue?.queue_number || "",
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      setTrialValue((prev) => {
                        return {
                          ...prev,
                          queue_number: e.target.value,
                        };
                      });
                    },
                  }}
                />
              </Label>
              <Label labelType="form-control" leftLabel="Ruang Sidang">
                <Input
                  attributes={{
                    name: "location",
                    type: "number",
                    min: 0,
                    className: "input input-bordered w-full",
                    value: trialValue?.location || "",
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      setTrialValue((prev) => {
                        return {
                          ...prev,
                          location: e.target.value,
                        };
                      });
                    },
                  }}
                />
              </Label>
            </main>
            <footer className="flex items-center justify-end">
              <Button
                attributes={{
                  type: "submit",
                  className: "btn btn-active btn-primary",
                }}
              >
                Tentukan
              </Button>
            </footer>
          </Form>
        </div>
      </Modal>
    </section>
  );
}
