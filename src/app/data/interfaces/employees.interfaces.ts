export interface EmployeePostRequest {
  curp: string;
  name: string;
  middleName: string;
  surName: string;
  phoneNumber: string;
  email: string;
}

export interface EmployeePatchRequest {
  curp?: string;
  name?: string;
  middleName?: string;
  surName?: string;
  phoneNumber?: string;
  email?: string;
}

export interface Employee {
  id: string;
  curp: string;
  name: string;
  middleName: string;
  surName: string;
  phoneNumber: string;
  email: string;
}
