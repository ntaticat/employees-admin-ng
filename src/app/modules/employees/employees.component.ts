import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  Observable,
  Observer,
  PartialObserver,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { Employee, EmployeePost } from 'src/app/data/interfaces/employee';
import { EmployeeApiService } from 'src/app/data/services/employee-api.service';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  employeeTableColumns: string[] = [
    'id',
    'name',
    'middleName',
    'surName',
    'actions',
  ];
  employeeDataSource = new MatTableDataSource(this.employees);

  constructor(
    private employeeApiService: EmployeeApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeDataSource.filter = filterValue.trim().toLowerCase();
  }

  openNewEmployeeForm() {
    const dialogRef = this.dialog.open(NewEmployeeComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: EmployeePost) => {
      if (result) {
        this.postEmployeeAndReload(result).subscribe(employees => {
          this.updateDataTable(employees);
        });
      }
    });
  }

  postEmployeeAndReload(employeePost: EmployeePost): Observable<Employee[]> {
    return this.employeeApiService.postEmployees(employeePost).pipe(
      switchMap(() => this.employeeApiService.getEmployees())
    );
  }

  loadEmployees() {
    this.employeeApiService.getEmployees().subscribe(employees => {
      this.updateDataTable(employees);
    });
  }

  private updateDataTable(employees: Employee[]) {
    this.employees = employees;
    this.employeeDataSource.data = employees;
  }
}
