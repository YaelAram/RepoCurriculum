import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasRoleGuardCreator } from './has-role.guard';

describe('isAdminGuard', () => {
  const isAdminGuard = hasRoleGuardCreator(['Admin']);
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
