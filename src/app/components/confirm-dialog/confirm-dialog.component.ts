import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <div class="p-4 items-start">
      <span class="items-start text-xl font-bold mb-4 text-[#1C2B58]">{{ data.title }}</span>
      <p class="mb-6">{{ data.message }}</p>
      <div class="flex justify-center gap-4">
        <button class="btn btn-outline" (click)="onCancel()">Annuler</button>
        <button class="btn btn-error bg-secondary  text-white hover:bg-red-700" (click)="onConfirm()">Supprimer</button>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
