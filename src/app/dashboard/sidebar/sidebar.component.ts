import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(){}
  router = inject(Router);

  // Define a map of image sources for each item
  imageSrcs: { [key: string]: string } = {
    products: 'assets/products.svg',
    users: 'assets/users.svg',
    categories: 'assets/categories.svg',


  };

  // Define default image sources for each item
  defaultImageSrcs: { [key: string]: string } = {
    products: 'assets/products.svg',
    users: 'assets/users.svg',
    categories: 'assets/categories.svg',

  };

  // Define hover image sources for each item
  hoverImageSrcs: { [key: string]: string } = {

    products: 'assets/products_w.svg',
    users: 'assets/users_w.svg',
    categories: 'assets/categories_w.svg',
  };

  isActiveLink(route: string): boolean {
    return this.router.isActive(route, true);
  }

  // Get the appropriate image source based on route activity
  getImageSrc(route: string): string {
    if (this.isActiveLink(`/home/${route}`)) {
      return this.hoverImageSrcs[route];  // Show hover image if active
    } else {
      return this.imageSrcs[route];  // Show default image otherwise
    }
  }

  onMouseEnter(item: string) {
    this.imageSrcs[item] = this.hoverImageSrcs[item];
  }

  onMouseLeave(item: string) {
    this.imageSrcs[item] = this.defaultImageSrcs[item];
  }

}
