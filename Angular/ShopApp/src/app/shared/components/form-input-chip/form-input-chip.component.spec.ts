import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputChipComponent } from './form-input-chip.component';

describe('FormInputChipComponent', () => {
  let component: FormInputChipComponent;
  let fixture: ComponentFixture<FormInputChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
