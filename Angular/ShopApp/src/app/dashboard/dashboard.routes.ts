import { Route } from '@angular/router';

import { workNotSavedGuard } from '@shared/guards/work-not-saved.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import EditProductComponent from './pages/edit-product/edit-product.component';
import ProductsPageComponent from './pages/products-page/products-page.component';

const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'create-product',
        title: 'Item creator',
        canDeactivate: [workNotSavedGuard],
        component: EditProductComponent,
      },
      {
        path: 'edit-product/:id',
        title: 'Item editor',
        canDeactivate: [workNotSavedGuard],
        component: EditProductComponent,
      },
      {
        path: 'products',
        title: 'Products',
        component: ProductsPageComponent,
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default dashboardRoutes;
