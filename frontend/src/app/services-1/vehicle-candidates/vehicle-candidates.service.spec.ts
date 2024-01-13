import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { VehicleResult } from 'src/app/interfaces/vehicleResult';
import { Vehicule } from 'src/app/interfaces/Vehicule';
import { VehicleCandidates } from 'src/app/interfaces/vehicleCandidate';
import { VehicleCandidatesService, VEHICLE_CANDIDATES_URL } from './vehicle-candidates.service';

const URL = VEHICLE_CANDIDATES_URL;

const VehicleMock: Vehicule = {
  vehicleId: 1,
  price: 10,
  year: "2020",
  brand: "a",
  model: "b",
  category: "c",
  type: "d",
  autonomy: 1,
  batteryCapacity: 2,
  maxChargingPower: 3,
  chargingTime: 4,
  seatsCount: 5,
  imageUrl: "e",
}

const VehicleCandidatesMock: VehicleCandidates = {
  vehicleId: 1,
  sessionId: "123",
  autonomyRank: 2,
  priceRank: 1
}

const VehicleResultMock: VehicleResult = {
  vehicle: VehicleMock,
  candidacy: VehicleCandidatesMock
}

describe('VehicleCandidatesService', () => {
  let service: VehicleCandidatesService;
  let httpTestingController: HttpTestingController;

  const routerMock = {
    navigate: (url: Array<String>) => {}
  }

  afterEach(() => {
    localStorage.clear();
  })

  describe('on getVehicleCandidates', () => {
    beforeEach(() => {
      localStorage.clear();
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [{provide: Router, useValue: routerMock }]
      });
      httpTestingController = TestBed.inject(HttpTestingController);
      service = TestBed.inject(VehicleCandidatesService);
    });

    it('Should call a get HTTP request and get array of VehicleResult', async () => {
      
      let candidatePromise: Promise<VehicleResult[]> = service.getVehicleCandidates();

      let req = httpTestingController.expectOne(URL);

      req.flush({
        data:[{
          ...VehicleResultMock
        }]});
        
        expect(req.request.method).toBe("GET");
        
        let results : VehicleResult[] = await candidatePromise;
        expect(results).toEqual([VehicleResultMock])
    });
  });
});