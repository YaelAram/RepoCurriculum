import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { Environments } from '../../../environments/environments';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl: string = 'https://api.mapbox.com/search/geocode/v6/reverse';
  constructor(private http: HttpClient) {}

  getLocationName(lat: number, lng: number): Observable<string> {
    const params = new HttpParams()
      .set('longitude', `${lng}`)
      .set('latitude', `${lat}`)
      .set('access_token', Environments.MAPBOX_KEY);

    return this.http.get<Location>(this.baseUrl, { params }).pipe(
      map(({ features }) => {
        const feature = features.find(
          (f) => f.properties.feature_type === 'address'
        );

        if (!feature) throw new Error('No address');
        return feature;
      }),
      map(({ properties: p }) => {
        const street = p.context.street?.name ?? 'No Street';
        const place = p.context.place?.name ?? 'No Place';
        const country = p.context.country.name ?? 'No Country';

        return `${street}, ${place}, ${country}`;
      }),
      catchError((_) => of(''))
    );
  }
}
