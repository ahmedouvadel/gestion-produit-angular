import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('logoutDialog') logoutDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  dialog = inject(MatDialog);
  router = inject(Router);
  authService = inject(AuthService);

  dropdownVisible = false;
  hideTimeout: any;

  username = 'Admin'; // 🔥 Nom fixe
  userImage = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'; // 🔥 Image fixe

  showDropdown() {
    clearTimeout(this.hideTimeout);
    this.dropdownVisible = true;
  }

  scheduleHideDropdown() {
    this.hideTimeout = setTimeout(() => {
      this.dropdownVisible = false;
    }, 300);
  }

  openLogoutDialog(): void {
    this.dialogRef = this.dialog.open(this.logoutDialog);
  }

  confirmLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    this.dialog.closeAll();
    this.router.navigate(['/login']);
  }
}
