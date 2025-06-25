import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

import { ProductApi } from '@shop/interfaces/product-page-api';
import { ImageUrlPipe } from '@shop/pipes/image-url.pipe';

@Component({
  selector: 'dashboard-product-list',
  imports: [MatTableModule, MatButtonModule, RouterLink, CurrencyPipe, ImageUrlPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private readonly table = viewChild.required<MatTable<ProductApi>>(MatTable);

  readonly products = input.required<ProductApi[]>();
  readonly displayedColumns = computed(() => ['image', 'title', 'price', 'stock', 'details']);

  readonly updateTable = effect(() => {
    this.products();
    this.table().renderRows();
  });
}
