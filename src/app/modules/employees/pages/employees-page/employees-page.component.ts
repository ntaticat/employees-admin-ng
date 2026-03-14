import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  lastValueFrom,
  Observable,
  Observer,
  PartialObserver,
  Subject,
  Subscription,
} from 'rxjs';
import { Employee } from 'src/app/data/interfaces/employees.interfaces';
import { EmployeesService } from 'src/app/data/services/employees.service';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
})
export class EmployeesPageComponent implements OnInit, AfterViewInit {
  employeeTableColumns: string[] = [
    'Nombre',
    'Apellido Paterno',
    'Apellido Materno',
    'CURP',
    'PhoneNumber',
    'Email',
    'Acciones',
  ];

  employeeDataSource = new MatTableDataSource<Employee>([]);
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loadEmployees();
  }

  ngAfterViewInit() {
    this.employeeDataSource.paginator = this.paginator;
  }

  async loadEmployees() {
    this.isLoading = true;
    try {
      const employeesData = await lastValueFrom(
        this.employeesService.getEmployees()
      );

      this.employeeDataSource.data = employeesData;
    } catch (error) {
      console.error(error);
      alert('Error al obtener empleados');
    } finally {
      this.isLoading = false;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeDataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(id: string) {
    this.router.navigate(['/employees', id, 'edit']);
  }

  async onDelete(id: string) {
    const confirmed = confirm(
      '¿Estás seguro de que deseas eliminar este empleado?'
    );
    if (!confirmed) return;

    try {
      await lastValueFrom(this.employeesService.deleteEmployeeById(id));
      this.employeeDataSource.data = this.employeeDataSource.data.filter(
        e => e.id !== id
      );
    } catch (error) {
      console.error(error);
      alert('Error al eliminar empleado');
    }
  }
}
