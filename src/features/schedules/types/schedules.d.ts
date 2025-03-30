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
  agenda: string;
  user_name: string;
  role_name: string;
  plaintiff: string[];
  defendant: string[];
  judge: string[];
  agenda: string[];
  panitera: string;
}

export interface IQuerySchedulesParams {
  search?: string;
}
