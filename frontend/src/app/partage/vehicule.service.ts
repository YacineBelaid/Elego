import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../interfaces/Vehicule';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class VehiculeService {
  constructor(private httpClient: HttpClient) {}

  // Méthode pour récupérer la liste des véhicules
  getVehicules(): Observable<Vehicule[]> {
    return this.httpClient.get<Vehicule[]>(
      `${environment.backendUrl}/vehicules`
    );
  }

  addVehicule(vehicule: Vehicule) {
    this.httpClient.post<Vehicule>(
      `${environment.backendUrl}/vehicules`,
      vehicule
    );
  }
}
