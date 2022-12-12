import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeesComponent } from './employees.component';

@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [CommonModule, EmployeesRoutingModule, SharedModule],
})
export class EmployeesModule {}
