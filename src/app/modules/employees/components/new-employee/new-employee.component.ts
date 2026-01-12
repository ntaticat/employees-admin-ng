import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeePost } from 'src/app/data/interfaces/employee';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent {
  employeeForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    middleName: ['', Validators.required],
    surName: ['', Validators.required],
    curp: [
      '',
      Validators.required,
      Validators.minLength(18),
      Validators.maxLength(18),
    ],
    email: ['', Validators.email],
    phoneNumber: ['', Validators.minLength(10)],
  });

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<NewEmployeeComponent>
  ) {}

  onCancel() {
    this.dialog.close();
  }

  onSave() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const data: EmployeePost = this.employeeForm.getRawValue();

    const payload = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === '' ? null : value,
      ])
    );

    this.dialog.close(payload);
  }
}
