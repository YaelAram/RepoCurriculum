import { Component, Input } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
import { Mark } from '../../interfaces/mark';
import { MarksService } from '../../services/marks.service';

@Component({
  selector: 'maps-markers',
  templateUrl: './markers.component.html',
  styleUrl: './markers.component.css',
})
export class MarkersComponent {
  @Input()
  public map?: Map;

  constructor(private marksService: MarksService) {}

  get markers(): Mark[] {
    return this.marksService.markers;
  }

  flyTo(center: LngLat): void {
    if (!this.map) return;
    this.map.flyTo({
      zoom: 15,
      center,
      duration: 1500,
    });
  }

  deleteMarker(index: number): void {
    this.marksService.deleteMark(index);
  }
}
