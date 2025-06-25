import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

export const hasRoleGuardCreator = (roles: string[]): CanActivateFn => {
  const hasRoleGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const user = authService.user();

    if (!user) return router.createUrlTree(['/auth/login']);
    if (roles.some((role) => user.roles.includes(role))) return true;

    return router.createUrlTree(['/']);
  };

  return hasRoleGuard;
};
