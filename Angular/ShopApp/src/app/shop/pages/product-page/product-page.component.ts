import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { ProductSwiperComponent } from '@shop/components/product-swiper/product-swiper.component';
import { ProductService } from '@shop/services/product.service';

@Component({
  selector: 'shop-product-page',
  imports: [MatProgressSpinnerModule, MatChipsModule, ProductSwiperComponent, CurrencyPipe, TitleCasePipe],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export default class ProductPageComponent {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  readonly idSlug = input.required<string>();
  readonly productRs = rxResource({
    request: () => ({ id: this.idSlug() }),
    loader: ({ request }) => this.productService.getProductByIdOrSlug(request.id),
  });

  readonly redirectIfNotExists = effect(() => {
    if (this.productRs.error()) this.router.navigateByUrl('/');
  });
}
