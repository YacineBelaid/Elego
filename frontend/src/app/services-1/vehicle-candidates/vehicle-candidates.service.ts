import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs'
import { VehicleResult } from 'src/app/interfaces/vehicleResult';
import { environment } from 'src/environments/environment';

export const VEHICLE_CANDIDATES_URL = `${environment.backendUrl}/vehicle-candidates`

@Injectable({
  providedIn: 'root'
})
export class VehicleCandidatesService {

  constructor(private http: HttpClient) { }

  public async getVehicleCandidates(): Promise<VehicleResult[]> {
    let h = new HttpHeaders().set("sessionId",localStorage.getItem("sessionId") || "");

    let observable$ = this.http.get(VEHICLE_CANDIDATES_URL,{headers: h});

    let vehicles : any = await firstValueFrom(observable$);
    return vehicles.data;
  }
}
