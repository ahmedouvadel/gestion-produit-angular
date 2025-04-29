import { CommonModule, NgClass, } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router=inject(Router);
  inputTextPassword: string = '';
  formGroup!: FormGroup;
  showEyeIcon: boolean = false;
  passwordVisible: boolean = false;
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onPasswordInput() {
    this.showEyeIcon = this.inputTextPassword.trim().length > 0;
  }

  ngOnInit(): void {
    this.onPasswordInput();
    this.formGroup = this.fb.group({
      email: this.fb.control(''),
      password: this.fb.control(''),
    });

    // Détecter si quelque chose est écrit dans le champ password
    this.formGroup.get('password')?.valueChanges.subscribe((value: string) => {
      this.showEyeIcon = value?.trim().length > 0;
    });
  }

  login() {
    const email = this.formGroup.value.email;
    const password = this.formGroup.value.password;
    console.log('email', email);
    console.log('password', password);
    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res); // stocke access_token + refresh_token
        this.router.navigate(['/home/products']); // ou la page que tu veux
      },
      error: (err) => {
        console.error('Erreur login', err);
        // afficher un message d'erreur à l'utilisateur si besoin
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/signup']);
  }
}
