import { Route } from '@angular/router';

import ShopLayoutComponent from './layouts/shop-layout/shop-layout.component';
import GenderPageComponent from './pages/gender-page/gender-page.component';
import HomePageComponent from './pages/home-page/home-page.component';
import ProductPageComponent from './pages/product-page/product-page.component';

const shopRoutes: Route[] = [
  {
    path: '',
    component: ShopLayoutComponent,
    children: [
      {
        path: '',
        title: 'Home',
        component: HomePageComponent,
      },
      {
        path: 'gender/:gender',
        title: 'By Gender',
        component: GenderPageComponent,
      },
      {
        path: 'product/:idSlug',
        title: 'Product',
        component: ProductPageComponent,
      },
      {
        path: '**',
        title: '404 Not Found',
        loadComponent: () => import('./pages/not-found-page/not-found-page.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default shopRoutes;
