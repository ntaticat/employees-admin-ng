import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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

  onSubmitLogin() {
    this.router.navigateByUrl('/employees');
  }
}
