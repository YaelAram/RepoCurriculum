import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

import { MarksService } from '../../services/marks.service';

@Component({
  selector: 'maps-full-screen',
  templateUrl: './full-screen-map.component.html',
  styleUrl: './full-screen-map.component.css',
})
export class FullScreenMapComponent implements OnInit, AfterContentChecked {
  public map?: Map;
  public currentCenter: LngLat = new LngLat(-74.5, 40);
  public zoom: number = 12;

  constructor(
    private marksService: MarksService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.marksService.getMarksFromStore();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  mapCreated(map: Map): void {
    this.map = map;
    this.marksService.markers.map((m) => m.mark.addTo(this.map!));
  }

  mapMoved(lngLat: LngLat): void {
    this.currentCenter = lngLat;
  }
}
