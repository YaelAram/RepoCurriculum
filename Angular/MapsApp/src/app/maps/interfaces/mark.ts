import { Marker } from 'mapbox-gl';

export interface Mark {
  title: string;
  mark: Marker;
}

export interface PlainMark {
  title: string;
  lng: number;
  lat: number;
}
