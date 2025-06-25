import { Component, computed, effect, inject, input, linkedSignal, output, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FormChipSelectorComponent } from '@shared/components/form-chip-selector/form-chip-selector.component';
import { FormInputChipComponent } from '@shared/components/form-input-chip/form-input-chip.component';
import { FormErrorMessageService } from '@shared/services/form-error-message.service';
import { ProductSwiperComponent } from '@shop/components/product-swiper/product-swiper.component';
import { ProductApi, ProductFormData } from '@shop/interfaces/product-page-api';
import { ImageUrlPipe } from '@shop/pipes/image-url.pipe';
import { ProductService } from '@shop/services/product.service';

@Component({
  selector: 'dashboard-product-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormChipSelectorComponent,
    FormInputChipComponent,
    ProductSwiperComponent,
    ImageUrlPipe,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  private readonly formErrorMessage = inject(FormErrorMessageService);
  private readonly formBuiler = inject(NonNullableFormBuilder);
  private readonly productService = inject(ProductService);

  readonly product = input.required<ProductApi>();
  readonly formSubmitted = output<ProductFormData>();
  readonly itemDelete = output();

  readonly files = signal<FileList | null>(null);

  readonly originalImages = linkedSignal(() => this.product().images);
  readonly temporalImages = computed(() => {
    return Array.from(this.files() ?? []).map((file) => URL.createObjectURL(file));
  });
  readonly swiperImages = linkedSignal(() => {
    return this.originalImages().concat(this.temporalImages());
  });

  readonly form = this.formBuiler.group({
    title: ['', [Validators.required]],
    slug: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    tags: this.formBuiler.control<string[]>([], {
      validators: [Validators.required, Validators.minLength(1)],
    }),
    gender: ['kid', [Validators.required]],
    sizes: this.formBuiler.control<string[]>([], {
      validators: [Validators.required, Validators.minLength(1)],
    }),
    images: this.formBuiler.control<string[]>([], {
      validators: [Validators.required, Validators.minLength(1)],
    }),
  });

  readonly setInitialFormData = effect(() => {
    this.form.reset(this.product());
  });

  readonly updateImagesFieldValue = effect(() => {
    this.form.patchValue({ images: this.swiperImages() });
  });

  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const product = this.form.value as ProductFormData;

    this.productService.uploadImages(this.files()).subscribe((imageNames) => {
      product.images = [...this.originalImages(), ...imageNames];
      this.formSubmitted.emit(product);
    });
  }

  handleFileChange(input: HTMLInputElement) {
    this.files.set(input.files);
  }

  handleImageRemove(imageToDelete: string) {
    if (!imageToDelete.startsWith('blob:')) {
      this.originalImages.update((prev) => prev.filter((img) => img !== imageToDelete));
    }

    this.swiperImages.update((prev) => prev.filter((img) => img !== imageToDelete));
  }

  handleDeleteItem() {
    this.itemDelete.emit();
  }

  getErrorMessage(control: AbstractControl): string {
    return this.formErrorMessage.getErrorMessage(control);
  }
}
