import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { workNotSavedGuard } from './work-not-saved.guard';

describe('workNotSavedGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => workNotSavedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
