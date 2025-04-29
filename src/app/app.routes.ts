import { Routes } from '@angular/router';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent) },

  {
    path: 'home', component: SidebarComponent, children: [
      { path: 'products', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', loadComponent: () => import('./dashboard/products/products.component').then(m => m.ProductsComponent) },
      { path: 'categories', loadComponent: () => import('./dashboard/categories/categories.component').then(m => m.CategoriesComponent) },
      { path: 'users', loadComponent: () => import('./dashboard/users/users.component').then(m => m.UsersComponent) },
    ]
  }
];
