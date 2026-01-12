import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeesComponent } from './employees.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    NewEmployeeComponent
  ],
  imports: [CommonModule, EmployeesRoutingModule, SharedModule],
})
export class EmployeesModule {}
