import { Routes } from '@angular/router';

import { hasRoleGuardCreator } from '@auth/guards/has-role.guard';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [NotAuthenticatedGuard],
  },
  {
    path: 'management',
    loadChildren: () => import('./dashboard/dashboard.routes'),
    canActivate: [hasRoleGuardCreator(['admin'])],
  },
  {
    path: '',
    loadChildren: () => import('./shop/shop.routes'),
  },
];
