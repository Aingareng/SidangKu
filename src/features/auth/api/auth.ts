import IApiResponse from "../../../shared/types/apiResponse";
import { api } from "../../../shared/utils/api";
import { IAuthPayload } from "../types/auth";

export async function auth(payload: IAuthPayload) {
  try {
    let response = await api.post<IApiResponse<{ role: string,name:string } | null>>(
      "/auth/login",
      payload
    );
    if (response.status === 400) {
      response = {
        status: response.status,
        message: "Email atau password salah",
        data: null,
      };
    } else if (response.status === 401) {
      response = {
        status: response.status,
        message: "Pengguna tidak ditemukan",
        data: null,
      };
    }

    return response;
  } catch (error) {
    console.error(error);
    // return error as IApiResponse<null>;
  }
}
