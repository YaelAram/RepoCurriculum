import { Component, Input, OnInit } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'maps-zoom-control',
  templateUrl: './zoom-control.component.html',
  styleUrl: './zoom-control.component.css',
})
export class ZoomControlComponent implements OnInit {
  @Input()
  public currentCenter: LngLat = new LngLat(-74.5, 40);
  @Input()
  public map?: Map;
  @Input()
  public zoom: number = 12;

  public minZoom: number = 1;
  public maxZoom: number = 18;

  ngOnInit(): void {
    if (!this.map) return;

    this.map
      .on('zoom', (evt) => (this.zoom = evt.target.getZoom()))
      .on('zoomend', (evt) => {
        const currentZoom = evt.target.getZoom();
        if (currentZoom < this.minZoom) evt.target.zoomTo(this.minZoom);
        else if (currentZoom > this.maxZoom) evt.target.zoomTo(this.maxZoom);
      });
  }

  zoomIn(): void {
    if (!this.map) return;
    this.map?.zoomIn({ duration: 1000 });
  }

  zoomOut(): void {
    if (!this.map) return;
    this.map?.zoomOut({ duration: 1000 });
  }

  zoomTo(value: string): void {
    if (!this.map) return;
    this.map?.zoomTo(Number(value));
  }
}
