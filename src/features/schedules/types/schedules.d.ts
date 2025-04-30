type TypeScheduleStatus = "scheduled" | "pending" | "finished";
type TypeCase = "perdata" | "pidana";
type TypeUser = { id: number; name: string };
type TypeCaseStatus =
  | "planing"
  | "pending"
  | "in_progress"
  | "resolved"
  | "closed";
export interface ISchedulesData {
  id: number;
  scheduled_date: string;
  scheduled_time: string;
  location: string;
  queue_number: number;
  status?: TypeScheduleStatus;
  case_number: string;
  case_type: TypeCase;
  case_status: TypeCaseStatus;
  user_name: string;
  role_name: string;
  plaintiffs?: TypeUser[];
  defendants?: TypeUser[];
  judges: TypeUser[];
  case_details: string[];
  registrar: TypeUser | TypeUser[];
  preacheds: TypeUser[];
}

export interface ISchedulePayload {
  case_number: string;
  plaintiffs?: string[];
  defendants?: string[];
  preacheds: string[];
  case_detail?: string[];
  judges: string[];
  registrar?: string;
  case_type: "perdata" | "pidana";
  location?: number;
  queue_number?: number;
}

export interface IQuerySchedulesParams {
  search?: string;
  select?: string;
}
