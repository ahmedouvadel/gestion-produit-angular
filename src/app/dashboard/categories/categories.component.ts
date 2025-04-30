// ✅ categories.component.ts - Ajout complet des actions CRUD avec modal
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category.model';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CategoryModalComponent } from '../../components/category-modal/category-modal.component';

@Component({
  selector: 'app-categories',
  imports: [HeaderComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryService = inject(CategoryService);
  dialog = inject(MatDialog);
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  searchTerm = '';

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Erreur chargement catégories', err)
    });
  }

  filteredCategories() {
    return this.categories.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openDetails(category: Category) {
    this.selectedCategory = category;
  }

  closeDetails() {
    this.selectedCategory = null;
  }

  addCategory() {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '400px',
      data: { category: null },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') this.loadCategories();
    });
  }

  editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '400px',
      data: { category },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') this.loadCategories();
    });
  }

  deleteCategory(categoryId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmer la suppression',
        message: 'Voulez-vous vraiment supprimer cette catégorie ?'
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategory(categoryId).subscribe({
          next: () => this.loadCategories(),
          error: (err) => console.error('Erreur suppression', err)
        });
      }
    });
  }
}
