import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-modal.component.html',
})
export class CategoryModalComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryModalComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { category: any | null }
  ) {
    this.form = this.fb.group({
      name: [data.category ? data.category.name : ''],
    });
  }

  save() {
    const name = this.form.value.name;

    if (this.data.category) {
      this.categoryService
        .updateCategory(this.data.category.id, { name })
        .subscribe(() => this.dialogRef.close('refresh'));
    } else {
      this.categoryService
        .createCategory({ name })
        .subscribe(() => this.dialogRef.close('refresh'));
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
