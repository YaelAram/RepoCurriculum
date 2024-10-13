import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'maps-minimap',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('mapContainer')
  private container?: ElementRef<HTMLElement>;
  private map?: Map;

  @Input()
  public currentCenter: LngLat = new LngLat(-74.5, 40);
  @Input()
  public zoom: number = 12;

  @Output()
  public onMapInit: EventEmitter<Map> = new EventEmitter();
  @Output()
  public onMapMoved: EventEmitter<LngLat> = new EventEmitter();

  ngAfterViewInit(): void {
    if (!this.container?.nativeElement) return;

    this.map = new Map({
      container: this.container.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom,
    });

    this.map = this.map.on('move', (evt) =>
      this.onMapMoved.emit(evt.target.getCenter())
    );

    this.getCurrentLocation();

    this.onMapInit.emit(this.map);
  }

  private successLocation = ({ coords }: GeolocationPosition): void => {
    if (!this.map) return;
    this.flyTo(new LngLat(coords.longitude, coords.latitude));
  };

  private getCurrentLocation(): void {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(this.successLocation);
  }

  private flyTo(center: LngLat): void {
    if (!this.map) return;
    this.map.flyTo({
      zoom: 15,
      center,
      duration: 2000,
    });
  }
}
