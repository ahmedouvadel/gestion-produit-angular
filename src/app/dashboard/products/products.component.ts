import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  imports: [AddProductModalComponent, MatDialogModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
openDetail(arg0: any) {
throw new Error('Method not implemented.');
}
  searchTerm: string = '';
  showModal = false;
  dialog=inject(MatDialog)
  selectedProductToEdit: Product | null = null;

  products: Product[] = [];
  productService=inject(ProductService);

  constructor() {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits', err);
      }
    });
  }

  filteredProducts() {
    if (!this.searchTerm.trim()) return this.products;

    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddProductModal(product?: Product) {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
      width: '60vw',
      maxWidth: '400px',
      height: 'auto',
      maxHeight: '80vh',
      panelClass: 'custom-dialog-container', // ou ce que tu veux
      disableClose: true,
      data: product ? { product } : undefined
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.loadProducts(); // recharge la liste
      }
    });
  }


  closeAddProductModal() {
    this.showModal = false;
  }

  onEdit(product: Product) {
    this.openAddProductModal(product);
  }


  onDelete(productId: number) {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          console.error('Erreur suppression produit', err);
        }
      });
    }
  }


}
