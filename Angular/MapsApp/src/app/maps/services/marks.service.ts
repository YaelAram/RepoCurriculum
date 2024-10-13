import { Injectable } from '@angular/core';
import { LngLat, Marker } from 'mapbox-gl';
import { Mark, PlainMark } from '../interfaces/mark';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class MarksService {
  private STORE_KEY: string = 'angular-mapbox-app';
  private marks: Mark[] = [];

  constructor(private locationService: LocationService) {}

  get markers(): Mark[] {
    return [...this.marks];
  }

  getMarksFromStore(): void {
    const plainMarksStr = localStorage.getItem(this.STORE_KEY);

    if (!plainMarksStr) {
      this.marks = [];
      return;
    }

    this.marks = (JSON.parse(plainMarksStr) as PlainMark[]).map((mark) =>
      this.createMark(mark.title, new LngLat(mark.lng, mark.lat))
    );
  }

  saveMarksToStore(): void {
    const plainMarks: PlainMark[] = this.marks.map(({ title, mark }) => {
      const [lng, lat] = mark.getLngLat().toArray();
      return { title, lat, lng };
    });

    localStorage.setItem(this.STORE_KEY, JSON.stringify(plainMarks));
  }

  addMark(mark: Mark): void {
    this.marks.push(mark);
  }

  createMark(title: string, lngLat: LngLat): Mark {
    const mark: Mark = {
      title,
      mark: new Marker(),
    };

    const marker = new Marker({ color: 'red', draggable: true })
      .setLngLat(lngLat)
      .on('dragend', (evt) => {
        const lngLat = evt.target.getLngLat();

        this.locationService
          .getLocationName(lngLat.lat, lngLat.lng)
          .subscribe((location) => {
            mark.title = location;
            this.saveMarksToStore();
          });
      });

    mark.mark = marker;
    return mark;
  }

  deleteMark(index: number): void {
    const marks = this.marks.splice(index, 1);
    marks.shift()?.mark.remove();
    this.saveMarksToStore();
  }
}
