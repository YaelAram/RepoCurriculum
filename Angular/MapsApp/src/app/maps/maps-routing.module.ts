import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenMapComponent } from './pages/full-screen-map/full-screen-map.component';

const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent,
    children: [
      {
        path: 'full-screen-map',
        title: 'Full Map',
        component: FullScreenMapComponent,
      },
      {
        path: '**',
        redirectTo: 'full-screen-map',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule {}
