import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-product-detail-modal',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './product-detail-modal.component.html',
  styleUrl: './product-detail-modal.component.css',
})
export class ProductDetailModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dialogRef: MatDialogRef<ProductDetailModalComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
