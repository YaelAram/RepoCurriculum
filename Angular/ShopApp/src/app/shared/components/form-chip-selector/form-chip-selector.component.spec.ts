import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChipSelectorComponent } from './form-chip-selector.component';

describe('FormChipSelectorComponent', () => {
  let component: FormChipSelectorComponent;
  let fixture: ComponentFixture<FormChipSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormChipSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormChipSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
