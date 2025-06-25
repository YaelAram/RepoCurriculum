import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';

import { Router } from '@angular/router';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { ProductListComponent } from '@shop/components/product-list/product-list.component';
import { ProductService } from '@shop/services/product.service';

@Component({
  selector: 'shop-home-page',
  imports: [PaginatorComponent, ProductListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export default class HomePageComponent {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  readonly page = input<number>();
  readonly limit = computed(() => 10);
  readonly offset = computed(() => (this.page() ?? 0) * this.limit());

  readonly productsRs = rxResource({
    request: () => ({ limit: this.limit(), offset: this.offset() }),
    loader: ({ request }) => {
      return this.productService.getProductPage(request.limit, request.offset);
    },
  });

  handlePageChange(event: PageEvent) {
    this.router.navigate(['/'], { queryParams: { page: event.pageIndex } });
  }
}
