import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAccueilComponent } from './admin-accueil/admin-accueil.component';
import { AjoutVehiculeFormComponent } from './ajout-vehicule-form/ajout-vehicule-form.component';

const routes: Routes = [
  { path: 'adminAccueil', component: AdminAccueilComponent },
  { path: 'ajoutVehiculeForm', component: AjoutVehiculeFormComponent },
  { path: '**', redirectTo: 'adminAccueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
