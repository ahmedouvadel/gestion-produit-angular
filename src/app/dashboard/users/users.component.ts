import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userService = inject(UserService);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Erreur chargement utilisateurs', err);
      }
    });
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmer la suppression',
        message: 'Voulez-vous vraiment supprimer cet utilisateur ?'
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe({
          next: () => this.loadUsers(),
          error: (err) => console.error('Erreur suppression', err)
        });
      }
    });
  }

}
