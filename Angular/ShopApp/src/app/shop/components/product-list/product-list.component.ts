import { Component, input } from '@angular/core';

import { ProductApi } from '@shop/interfaces/product-page-api';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'shop-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  readonly products = input.required<ProductApi[]>();
}
