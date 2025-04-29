import { Component, EventEmitter, Inject, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    HttpClientModule,
  ],
  templateUrl: './add-product-modal.component.html',
  styleUrl: './add-product-modal.component.css',
})
export class AddProductModalComponent implements OnInit {
  form: FormGroup;
  imageUrl: string = '';
  isUploading: boolean = false;

  @Output() productAdded = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  @Input() productToEdit: Product | null = null;

  fb = inject(FormBuilder);
  productService = inject(ProductService);
  dialogRef = inject(MatDialogRef<AddProductModalComponent>);
  http = inject(HttpClient);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { productToEdit: Product | null }
  ) {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      category_id: [''],
    });
  }
  ngOnInit(): void {
    const product = this.data.productToEdit;

    if (product) {
      this.form.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        category_id: product.category_id,
      });
      this.imageUrl = product.image;
    }
  }


  async onImageSelected(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned');
    formData.append('folder', 'stockily');

    fetch('https://api.cloudinary.com/v1_1/dncrtidgo/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.imageUrl = data.secure_url;
        this.isUploading = false;
        console.log('✅ Image URL:', this.imageUrl);
      })
      .catch((err) => {
        console.error('❌ Upload failed via fetch', err);
        this.isUploading = false;
      });
  }

  onSubmit() {
    if (this.form.invalid || !this.imageUrl) {
      console.warn('Formulaire invalide ou image manquante.');
      return;
    }

    const product = {
      ...this.form.value,
      image: this.imageUrl, // Ajout de l'image uploadée
    };

    this.productService.createProduct(product).subscribe({
      next: () => {
        console.log('Produit ajouté avec succès');
        this.productAdded.emit(); // 🔄 Actualiser la liste des produits
        this.closeModal.emit(); // ❌ Fermer la modal
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout du produit", err);
      },
    });
  }

}
