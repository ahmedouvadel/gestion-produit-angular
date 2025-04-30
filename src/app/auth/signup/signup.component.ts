import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // pour popup


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
  authService = inject(AuthService);
snackbar = inject(MatSnackBar);

  constructor() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;

      this.authService.signup(name, email, password).subscribe({
        next: () => {
          this.snackbar.open('✅ Inscription réussie !', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });

          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erreur inscription', err);
          this.snackbar.open('❌ Erreur lors de l’inscription', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
