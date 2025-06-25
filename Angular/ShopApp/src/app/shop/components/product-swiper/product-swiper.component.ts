import { Component, input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { ImageUrlPipe } from '@shop/pipes/image-url.pipe';

@Component({
  selector: 'shop-product-swiper',
  imports: [MatTabsModule, ImageUrlPipe],
  templateUrl: './product-swiper.component.html',
  styleUrl: './product-swiper.component.css',
})
export class ProductSwiperComponent {
  readonly productName = input.required<string>();
  readonly images = input.required<string[]>();
}
