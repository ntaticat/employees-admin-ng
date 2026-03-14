import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { EmployeesService } from 'src/app/data/services/employees.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  isLoading = false;
  isSaving = false;
  employeeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeesService: EmployeesService
  ) {}

  ngOnInit() {
    this.buildForm();

    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.employeeId;

    if (this.isEditMode && this.employeeId) {
      this.loadEmployee(this.employeeId);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      curp: [
        '',
        [
          Validators.required,
          Validators.minLength(18),
          Validators.maxLength(18),
        ],
      ],
      name: ['', Validators.required],
      middleName: ['', Validators.required],
      surName: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+52\d{10}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  private async loadEmployee(id: string) {
    this.isLoading = true;
    try {
      const employee = await lastValueFrom(
        this.employeesService.getEmployeeById(id)
      );
      this.form.patchValue(employee);
    } catch (error) {
      console.error(error);
      alert('Error al cargar los datos del empleado');
      this.router.navigate(['/employees']);
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    try {
      if (this.isEditMode && this.employeeId) {
        await lastValueFrom(
          this.employeesService.patchEmployee(this.employeeId, this.form.value)
        );
      } else {
        await lastValueFrom(
          this.employeesService.postEmployee(this.form.value)
        );
      }
      this.router.navigate(['/employees']);
    } catch (error) {
      console.error(error);
      alert('Error al guardar el empleado');
    } finally {
      this.isSaving = false;
    }
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }

  // Helpers para mensajes de error en el template
  hasError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return !!(control?.hasError(error) && control?.touched);
  }
}
