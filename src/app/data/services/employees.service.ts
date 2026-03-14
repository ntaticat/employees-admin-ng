import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Employee,
  EmployeePatchRequest,
  EmployeePostRequest,
} from '../interfaces/employees.interfaces';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  getEmployeeById(id: string) {
    return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`);
  }

  postEmployee(data: EmployeePostRequest) {
    return this.http.post(`${this.apiUrl}/employees`, data);
  }

  patchEmployee(id: string, data: EmployeePatchRequest) {
    return this.http.patch(`${this.apiUrl}/employees/${id}`, data);
  }

  deleteEmployeeById(id: string) {
    return this.http.delete(`${this.apiUrl}/employees/${id}`);
  }
}
