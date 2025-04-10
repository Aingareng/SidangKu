import IApiResponse from "../../../shared/types/apiResponse";
import { api } from "../../../shared/utils/api";
import {
  IQuerySchedulesParams,
  ISchedulePayload,
  ISchedulesData,
} from "../types/schedules";

export async function create(payload: ISchedulePayload) {
  try {
    const response = await api.post<IApiResponse<ISchedulePayload>>(
      "/schedules",
      payload
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function get(params: IQuerySchedulesParams) {
  try {
    const response = await api.get<IApiResponse<ISchedulesData[]>>(
      "/schedules",
      {
        ...params,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function destroy(id: string) {
  try {
    const response = await api.delete<IApiResponse<null>>(`/schedules/${id}`);
    return response.data;
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

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
