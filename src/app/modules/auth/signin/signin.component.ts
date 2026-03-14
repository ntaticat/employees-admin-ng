import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { loginRequest } from 'src/app/data/interfaces/auth.interfaces';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  getEmail() {
    return this.signinForm.get('email') as FormControl;
  }

  getPassword() {
    return this.signinForm.get('password') as FormControl;
  }

  async onSubmitLogin() {
    if (this.signinForm.invalid) {
      alert('El formulario no es valido');
      return;
    }

    const { email, password } = this.signinForm.value;

    const dataRequest: loginRequest = {
      email,
      password,
    };

    try {
      await lastValueFrom(this.authService.login(dataRequest));
      this.router.navigateByUrl('/employees');
    } catch (error) {
      alert('Credenciales no validas');
    }
  }
}
