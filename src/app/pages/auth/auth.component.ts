import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRadioModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  isRegister = false;

  constructor(public authService: AuthService) { }

  registrationForm = new FormGroup({
    fullName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required,
    Validators.email]),
    password: new FormControl("", [Validators.required,
    Validators.minLength(6)])
  });

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required,
    Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  handleRegister() {
    console.log("register ", this.registrationForm.value);
    this.authService.register(this.registrationForm.value).subscribe({
      next: (response) => {
        localStorage.setItem("jwt", response.jwt);
        this.authService.getUserProfile().subscribe();
        console.log("sign up success", response);
      }
    })
  }

  handleLogin() {
    console.log("login ", this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem("jwt", response.jwt);
        this.authService.getUserProfile().subscribe();
        console.log("login success", response);
      }
    })
  }

  togglePanel() {
    this.isRegister = !this.isRegister;
  }
}