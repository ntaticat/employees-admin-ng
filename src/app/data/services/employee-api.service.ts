import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee, EmployeePost } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    const method = `${this.url}/employees`;

    return this.http.get<Employee[]>(method);
  }

  postEmployees(data: EmployeePost) {
    const method = `${this.url}/employees`;
    return this.http.post<Employee>(method, data, {
    });
  }
}
