import { Component, Input } from '@angular/core';
import { Map } from 'mapbox-gl';
import { Mark } from '../../interfaces/mark';
import { LocationService } from '../../services/location.service';
import { MarksService } from '../../services/marks.service';

@Component({
  selector: 'maps-add-marker',
  templateUrl: './add-marker.component.html',
  styleUrl: './add-marker.component.css',
})
export class AddMarkerComponent {
  @Input()
  public map?: Map;

  constructor(
    private locationService: LocationService,
    private marksService: MarksService
  ) {}

  get markers(): Mark[] {
    return this.marksService.markers;
  }

  createMarker(): void {
    if (!this.map) return;

    const lngLat = this.map.getCenter();
    const marker = this.marksService.createMark('', lngLat);

    if (!marker) return;

    marker.mark.addTo(this.map);

    this.locationService
      .getLocationName(lngLat.lat, lngLat.lng)
      .subscribe((location) => {
        marker.title = location ? location : 'No place name';
        this.marksService.saveMarksToStore();
      });

    this.marksService.addMark(marker);
  }
}
