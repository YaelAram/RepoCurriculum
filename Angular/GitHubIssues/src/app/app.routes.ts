import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'issue/:id',
    title: 'Issue Details',
    loadComponent: () =>
      import('./issues/pages/issue-page/issue-page.component'),
  },
  {
    path: 'issues',
    pathMatch: 'full',
    title: 'GitHub Issues',
    loadComponent: () =>
      import('./issues/pages/issues-page/issues-page.component'),
  },
  {
    path: '**',
    redirectTo: 'issues',
  },
];
