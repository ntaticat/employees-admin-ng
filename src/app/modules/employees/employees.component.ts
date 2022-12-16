import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  Observable,
  Observer,
  PartialObserver,
  Subject,
  Subscription,
} from 'rxjs';

export interface IEmployee {
  id: number;
  name: string;
  middleName: string;
  surName: string;
}

const EMPLOYEE_DATA: IEmployee[] = [
  { id: 1, name: 'Rafael', middleName: 'Estrada', surName: 'Piñon' },
  { id: 2, name: 'Rafael', middleName: 'Estrada', surName: 'Piñon' },
  { id: 3, name: 'Rafael', middleName: 'Estrada', surName: 'Piñon' },
  { id: 4, name: 'Rafael', middleName: 'Estrada', surName: 'Piñon' },
  { id: 5, name: 'Rafael', middleName: 'Estrada', surName: 'Piñon' },
  { id: 6, name: 'Rafael', middleName: 'Estrada', surName: 'Piñon' },
  { id: 7, name: 'Rafael', middleName: 'Estrada', surName: 'Piñon' },
];

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent {
  employeeTableColumns: string[] = [
    'ID',
    'Nombre',
    'Apellido Paterno',
    'Apellido Materno',
    'Acciones',
  ];
  employeeDataSource = new MatTableDataSource(EMPLOYEE_DATA);

  constructor() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeDataSource.filter = filterValue.trim().toLowerCase();
  }
}
