import IApiResponse from "../../../shared/types/apiResponse";
import { api } from "../../../shared/utils/api";
import { IQuerySchedulesParams, ISchedulesData } from "../types/schedules";

// export async function create(payload: IPersonnelPayload) {
//   try {
//     const response = await api.post<IApiResponse<null>>("/user", payload);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

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
