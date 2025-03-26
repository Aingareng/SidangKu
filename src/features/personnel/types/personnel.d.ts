export interface IPersonnelPayload {
  name: string;
  role: number;
  email?: string;
  phone: string;
  password: string;
}

export interface IPersonnelDataTable {
  id: number;
  name: string;
  role_name: string;
  email?: string;
  phone: string;
}

export interface IQueryPersonnelParams {
  search?: string;
}
