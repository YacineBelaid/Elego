import { Component, OnInit } from '@angular/core';
import { VehiculeService } from '../../../partage/vehicule.service';
import { Vehicule } from '../../../interfaces/Vehicule';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  vehicules: Vehicule[] = [];
  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.getVehicules();
  }

  // Méthode pour récupérer la liste des véhicules
  getVehicules(): void {
    this.vehiculeService
      .getVehicules()
      .subscribe((vehicules) => (this.vehicules = vehicules));
  }
}
