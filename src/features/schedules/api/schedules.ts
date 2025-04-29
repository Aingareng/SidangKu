import IApiResponse from "../../../shared/types/apiResponse";
import { api } from "../../../shared/utils/api";
import {
  IQuerySchedulesParams,
  ISchedulePayload,
  ISchedulesData,
} from "../types/schedules";

const PREFIX = "/schedules";

export async function create(payload: ISchedulePayload) {
  try {
    const response = await api.post<IApiResponse<ISchedulePayload>>(
      PREFIX,
      payload
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function get(params: IQuerySchedulesParams) {
  try {
    const response = await api.get<IApiResponse<ISchedulesData[]>>(PREFIX, {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function destroy(id: string) {
  try {
    const response = await api.delete<IApiResponse<null>>(`${PREFIX}/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function update(id: number, payload: ISchedulePayload) {
  try {
    const response = await api.put<IApiResponse<ISchedulePayload>>(
      `/schedules/${id}`,
      payload
    );

    return response;
  } catch (error) {
    console.error(error);
  }
}

export const updateClerk = async (schedule_id: number, user_id: number) =>
  await api.post<IApiResponse<null>>(`${PREFIX}/set-cleck`, {
    schedule_id,
    user_id,
  });
export const pushNotification = async (schedule_id: number) =>
  await api.post<IApiResponse<null>>(`${PREFIX}/send-notification`, {
    schedule_id,
  });
