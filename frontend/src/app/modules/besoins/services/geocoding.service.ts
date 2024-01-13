import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * One result of a forward geocoding request.
 */
export interface GeoCodingResult {
  formattedAddress: string;
  longitude: number;
  latitude: number;
}

interface GeoCodingApiResponse {
  fullAddressSuggestion: string;
  lng: number;
  lat: number;
}

@Injectable({
  providedIn: 'root',
})
export class GeoCodingService {
  constructor(private http: HttpClient) {}

  /**
   * Executes a forward geocoding search.
   * @param query The query for the search.
   * @returns An array of geocoding results.
   */
  search(query: string): Observable<GeoCodingResult[]> {
    return this.http
      .post<GeoCodingApiResponse[]>(`${environment.backendUrl}/geocoding`, {
        query: query,
      })
      .pipe(
        map((apiResponseArray) => {
          return apiResponseArray.map((apiResponse): GeoCodingResult => {
            return {
              formattedAddress: apiResponse.fullAddressSuggestion,
              longitude: apiResponse.lng,
              latitude: apiResponse.lat,
            };
          });
        })
      );
  }
}
