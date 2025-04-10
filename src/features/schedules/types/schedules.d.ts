type TypeScheduleStatus = "scheduled" | "pending" | "finished";

export interface ISchedulesData {
  id: number;
  scheduled_date: string;
  scheduled_time: string;
  location: string;
  queue_number: number;
  status?: TypeScheduleStatus;
  case_number: string;
  case_status: string;
  agendas: string;
  user_name: string;
  role_name: string;
  plaintiffs: string[];
  defendants: string[];
  judges: string[];
  agenda: string[];
  registrar: string;
}

export interface ISchedulePayload {
  case_number: string;
  plaintiff: string[];
  defendant: string[];
  case_detail: string[];
  judges: string[];
  registrar: string;
}

export interface IQuerySchedulesParams {
  search?: string;
}
