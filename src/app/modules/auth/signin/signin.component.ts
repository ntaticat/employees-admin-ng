import { AuthApiService } from './../../../data/services/auth-api.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginPost } from 'src/app/data/interfaces/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authApiService: AuthApiService) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  getEmailControl() {
    return this.signinForm.get('email') as FormControl;
  }

  getPasswordControl() {
    return this.signinForm.get('password') as FormControl;
  }

  onSubmitLogin() {
    if (!this.signinForm.invalid) {
      const data: ILoginPost = {
        email: this.getEmailControl().value,
        password: this.getPasswordControl().value
      };

      this.authApiService.login(data).subscribe(() => {
        this.router.navigateByUrl('/employees');
      });
    }
  }
}
