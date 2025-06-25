import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';

import { UserApi } from '@auth/interfaces/user-api';
import { environment } from '@envs/environment';
import {
  ImageUploadResponse,
  ProductApi,
  ProductFormData,
  ProductPageApi,
  ProductUpdate,
} from '../interfaces/product-page-api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  private readonly productCache = new Map<string, ProductApi>();

  createEmptyProduct(): Observable<ProductApi> {
    return of({
      id: '',
      title: '',
      price: 0,
      description: '',
      slug: '',
      stock: 0,
      sizes: [],
      gender: 'kid',
      tags: [],
      images: [],
      user: {} as UserApi,
    });
  }

  getProductPage(limit: number, offset: number, gender: string = ''): Observable<ProductPageApi | undefined> {
    const params = { limit, offset, gender };
    return this.http
      .get<ProductPageApi>(`${this.baseUrl}/products`, { params })
      .pipe(catchError((_) => of(undefined)));
  }

  getProductByIdOrSlug(idSlug: string): Observable<ProductApi> {
    if (this.productCache.has(idSlug)) return of(this.productCache.get(idSlug)!);

    return this.http
      .get<ProductApi>(`${this.baseUrl}/products/${idSlug}`)
      .pipe(tap((resp) => this.setProductCache(resp)));
  }

  getProductById(id: string | undefined): Observable<ProductApi> {
    if (!id) return this.createEmptyProduct();
    if (this.productCache.has(id)) return of(this.productCache.get(id)!);

    return this.http.get<ProductApi>(`${this.baseUrl}/products/${id}`);
  }

  createProduct(data: ProductFormData): Observable<ProductApi | undefined> {
    return this.http.post<ProductApi>(`${this.baseUrl}/products`, data).pipe(
      tap((resp) => this.setProductCache(resp)),
      catchError(() => of(undefined)),
    );
  }

  updateProduct(id: string, product: ProductUpdate): Observable<ProductApi | undefined> {
    return this.http.patch<ProductApi>(`${this.baseUrl}/products/${id}`, product).pipe(
      tap((resp) => this.setProductCache(resp)),
      catchError(() => of(undefined)),
    );
  }

  private setProductCache(product: ProductApi): void {
    this.productCache.set(product.slug, product);
    this.productCache.set(product.id, product);
  }

  uploadImages(files: FileList | null): Observable<string[]> {
    if (!files) return of([]);

    const uploads = Array.from(files).map((file) => this.uploadImage(file));
    return forkJoin(uploads);
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ImageUploadResponse>(`${this.baseUrl}/files/product`, formData).pipe(
      map((resp) => resp.fileName),
      catchError(() => ''),
    );
  }

  deleteProduct(id: string): Observable<boolean> {
    return this.http.delete<ProductApi>(`${this.baseUrl}/products/${id}`).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
