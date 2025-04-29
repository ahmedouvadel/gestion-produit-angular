import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  fb=inject(FormBuilder);
  router=inject(Router);

  constructor() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    if (this.signupForm.valid) {
      const { fullName, email, password } = this.signupForm.value;
      console.log('register:', fullName, email, password);
      // Appel à un service d'inscription ici
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
