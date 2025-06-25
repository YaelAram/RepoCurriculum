import { Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { PageEvent } from '@angular/material/paginator';

import { MatIconModule } from '@angular/material/icon';
import { ProductListComponent } from '@dashboard/components/product-list/product-list.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { ProductService } from '@shop/services/product.service';

@Component({
  selector: 'dashboard-products-page',
  imports: [PaginatorComponent, ProductListComponent, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export default class ProductsPageComponent {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  readonly page = input<number>();
  readonly limit = signal<number>(25);
  readonly offset = computed(() => (this.page() ?? 0) * this.limit());

  readonly productsRs = rxResource({
    request: () => ({ limit: this.limit(), offset: this.offset() }),
    loader: ({ request }) => this.productService.getProductPage(request.limit, request.offset),
  });

  handlePageChange(event: PageEvent) {
    const { pageIndex: page, pageSize } = event;

    this.limit.set(pageSize);
    this.router.navigate(['/management/products'], { queryParams: { page } });
  }
}
