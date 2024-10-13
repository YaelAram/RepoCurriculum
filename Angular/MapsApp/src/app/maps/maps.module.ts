import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { MapsRoutingModule } from './maps-routing.module';
import { FullScreenMapComponent } from './pages/full-screen-map/full-screen-map.component';

import { AddMarkerComponent } from './components/add-marker/add-marker.component';
import { MarkersComponent } from './components/markers/markers.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { ZoomControlComponent } from './components/zoom-control/zoom-control.component';

import mapboxgl from 'mapbox-gl';
import { Environments } from '../../environments/environments';
mapboxgl.accessToken = Environments.MAPBOX_KEY;

@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutComponent,
    FullScreenMapComponent,
    ZoomControlComponent,
    MarkersComponent,
    AddMarkerComponent,
  ],
  imports: [CommonModule, MapsRoutingModule],
})
export class MapsModule {}
