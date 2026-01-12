export interface Employee {
  id: string;
  curp: string;
  name: string;
  middleName: string;
  surName: string;
  phoneNumber?: string;
  email?: string;
}

export interface EmployeePost {
  name: string;
  middleName: string;
  surName: string;
  phoneNumber?: string;
  email?: string;
}
