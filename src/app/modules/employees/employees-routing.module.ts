import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { NewEmployeePageComponent } from './pages/new-employee-page/new-employee-page.component';
import { EditEmployeePageComponent } from './pages/edit-employee-page/edit-employee-page.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesPageComponent,
  },
  {
    path: 'new',
    component: NewEmployeePageComponent,
  },
  {
    path: ':id',
    component: EmployeePageComponent,
  },
  {
    path: ':id/edit',
    component: EditEmployeePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
