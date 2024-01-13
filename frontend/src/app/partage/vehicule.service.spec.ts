import { TestBed } from '@angular/core/testing';
import { VehiculeService } from './vehicule.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CacheService } from 'ng2-cache-service';

describe('VehiculeService', () => {
  let service: VehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(VehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
