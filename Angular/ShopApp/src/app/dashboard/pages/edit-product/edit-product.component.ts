import { Component, effect, inject, input, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '@dashboard/components/product-form/product-form.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { PageCanDeactivate } from '@shared/guards/work-not-saved.guard';
import { ProductFormData } from '@shop/interfaces/product-page-api';
import { ProductService } from '@shop/services/product.service';
import { filter, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'dashboard-edit-product-page',
  imports: [MatProgressSpinnerModule, MatButtonModule, MatIconModule, ProductFormComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export default class EditProductComponent implements PageCanDeactivate {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly snackbar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  readonly form = viewChild.required(ProductFormComponent);

  readonly id = input<string>();
  readonly productRs = rxResource({
    request: () => ({ id: this.id() }),
    loader: ({ request }) => this.productService.getProductById(request.id),
  });

  readonly redirectIfNotExists = effect(() => {
    if (this.productRs.error()) this.router.navigateByUrl('/management/create-product');
  });

  canDeactivate(): boolean | Observable<boolean> {
    if (this.form().form.dirty) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Caution: Leave page?',
          message: 'Changes that you made may not be saved',
          confirmMessage: 'Discard changes',
          cancelMessage: 'Cancel',
        },
      });

      return dialogRef.afterClosed().pipe(map((result) => !!result));
    }

    return true;
  }

  handleSubmit(data: ProductFormData): void {
    const id = this.id();

    if (id) {
      this.productService.updateProduct(id, data).subscribe((product) => {
        this.showSnackbar(product ? 'Product updated' : 'Update Error');
      });

      return;
    }

    this.productService.createProduct(data).subscribe((product) => {
      this.showSnackbar(product ? 'Product created' : 'Creation Error');
      if (product) this.router.navigate(['/management/edit-product', product.id]);
    });
  }

  handleDelete() {
    const id = this.id();
    if (id === undefined) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Caution: Product Delete',
        message: 'This operation can not be undone.',
        confirmMessage: 'Delete product',
        cancelMessage: 'Keep product',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((dialogConfirm: boolean) => dialogConfirm),
        switchMap(() => this.productService.deleteProduct(id)),
      )
      .subscribe((wasDeleted) => {
        this.showSnackbar(wasDeleted ? 'Product deleted' : 'Delete Error');
        if (wasDeleted) this.router.navigateByUrl('/management/products');
      });
  }

  private showSnackbar(message: string) {
    this.snackbar.open(message, 'Dismiss', { duration: 3_000 });
  }
}
