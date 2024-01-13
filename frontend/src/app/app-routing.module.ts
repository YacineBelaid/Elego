import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { VehiculeEnDetailsComponent } from './composants/vehicule-en-details/vehicule-en-details.component';

const routes: Routes = [
  { path: '', component: AccueilComponent, data: { animation: 'isRight' } },
  { path: 'acceuil', redirectTo: '', pathMatch: 'full' },
  { path: 'details', component: VehiculeEnDetailsComponent },
  {
    path: 'catalogue',
    loadChildren: () =>
      import('./modules/catalogue/catalogue.module').then(
        (m) => m.CatalogueModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'besoins',
    loadChildren: () =>
      import('./modules/besoins/besoins.module').then((m) => m.BesoinsModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
