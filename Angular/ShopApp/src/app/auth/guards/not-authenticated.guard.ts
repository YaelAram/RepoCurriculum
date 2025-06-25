import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { AuthService } from '@auth/services/auth.service';

export const NotAuthenticatedGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const authStatus = authService.authStatus();

  if (authStatus === 'authenticated') {
    return router.createUrlTree(['/']);
  }

  return true;
};
