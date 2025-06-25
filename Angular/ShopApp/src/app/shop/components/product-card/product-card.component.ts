import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ProductApi } from '@shop/interfaces/product-page-api';
import { ImageUrlPipe } from '@shop/pipes/image-url.pipe';

@Component({
  selector: 'shop-product-card',
  imports: [MatCardModule, MatButtonModule, ImageUrlPipe, SlicePipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  readonly product = input.required<ProductApi>();
}
