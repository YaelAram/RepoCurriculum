import { Routes } from '@angular/router';

const countryRoutes: Routes = [
  {
    path: 'by-capital',
    title: 'Search by capital',
    loadComponent: () =>
      import('./pages/by-capital-page/by-capital-page.component'),
  },
  {
    path: 'by-country',
    title: 'Search by country',
    loadComponent: () =>
      import('./pages/by-country-page/by-country-page.component'),
  },
  {
    path: 'by-region',
    title: 'Search by region',
    loadComponent: () =>
      import('./pages/by-region-page/by-region-page.component'),
  },
  {
    path: '**',
    redirectTo: 'by-capital',
  },
];

export default countryRoutes;
