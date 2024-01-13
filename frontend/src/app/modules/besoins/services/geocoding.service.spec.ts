import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { GeoCodingService, GeoCodingResult } from './geocoding.service';

describe('GeoCodingService', () => {
  let service: GeoCodingService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(GeoCodingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return results with correct properties', async () => {
    const expectedData: GeoCodingResult[] = [
      {
        formattedAddress: 'foo',
        longitude: 1,
        latitude: 2,
      },
      {
        formattedAddress: 'bar',
        longitude: 3,
        latitude: 4,
      },
    ];

    const resultPromise = firstValueFrom(service.search('foo'));

    const req = httpTestingController.expectOne(
      'http://localhost:4500/geocoding'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ query: 'foo' });
    req.flush(
      expectedData.map((x) => {
        return {
          fullAddressSuggestion: x.formattedAddress,
          lng: x.longitude,
          lat: x.latitude,
        };
      })
    );

    const result = await resultPromise;
    expect(result).toEqual(expectedData);
  });
});
