import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductModalComponent } from './products/add-product-modal/add-product-modal.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AddProductModalComponent,
    HttpClientModule

  ]
})
export class DashboardModule { }
