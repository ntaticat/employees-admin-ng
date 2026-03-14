import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { NewEmployeePageComponent } from './pages/new-employee-page/new-employee-page.component';
import { EditEmployeePageComponent } from './pages/edit-employee-page/edit-employee-page.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@NgModule({
  declarations: [EmployeesPageComponent, EmployeePageComponent, NewEmployeePageComponent, EditEmployeePageComponent, EmployeeFormComponent],
  imports: [CommonModule, EmployeesRoutingModule, SharedModule],
})
export class EmployeesModule {}
