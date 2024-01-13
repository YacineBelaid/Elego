import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminAccueilComponent } from './admin-accueil/admin-accueil.component';
import { AjoutVehiculeFormComponent } from './ajout-vehicule-form/ajout-vehicule-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AdminAccueilComponent, AjoutVehiculeFormComponent],
  imports: [CommonModule, AdminRoutingModule, FontAwesomeModule],
})
export class AdminModule {}
