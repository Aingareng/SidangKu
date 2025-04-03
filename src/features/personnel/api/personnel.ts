import IApiResponse from "../../../shared/types/apiResponse";
import { api } from "../../../shared/utils/api";
import {
  IPersonnelDataTable,
  IPersonnelPayload,
  IQueryPersonnelParams,
} from "../types/personnel";

export async function create(payload: IPersonnelPayload) {
  try {
    const response = await api.post<IApiResponse<null>>("/user", payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function get(params?: IQueryPersonnelParams) {
  try {
    const response = await api.get<IApiResponse<IPersonnelDataTable[]>>(
      "/user",
      {
        ...params,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
