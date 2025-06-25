import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSwiperComponent } from './product-swiper.component';

describe('ProductSwiperComponent', () => {
  let component: ProductSwiperComponent;
  let fixture: ComponentFixture<ProductSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSwiperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
