import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BesoinsComponent } from './composantes/besoins/besoins.component';
import { GestionTrajetsComponent } from './composantes/gestion-trajets/gestion-trajets.component';
import { QuestionnaireComponent } from './composantes/questionnaire/questionnaire.component';
import { RevueComponent } from './composantes/revue/revue.component';

export const routes: Routes = [
  {
    path: '',
    component: BesoinsComponent,
    children: [
      { path: 'questionnaire', component: QuestionnaireComponent },
      { path: 'trajets', component: GestionTrajetsComponent },
      { path: 'revue', component: RevueComponent },
      { path: '**', redirectTo: 'trajets', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BesoinsRoutingModule {}
