import { ApiClient } from "../libs/apiClient";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = new ApiClient(BASE_URL);
