import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionTrajetsComponent } from './composantes/gestion-trajets/gestion-trajets.component';
import { QuestionnaireComponent } from './composantes/questionnaire/questionnaire.component';
import { RevueComponent } from './composantes/revue/revue.component';
import { BesoinsRoutingModule } from './besoins-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';
import { MapComponent } from './composantes/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TrajetsComponent } from './composantes/trajets/trajets.component';
import { AjoutTrajetComponent } from './composantes/ajout-trajet/ajout-trajet.component';
import { BesoinsComponent } from './composantes/besoins/besoins.component';
import { SliderPriceComponent } from './composantes/slider-price/slider-price.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { FormulaireCreationLieuComponent } from './composantes/formulaire-creation-lieu/formulaire-creation-lieu.component';
import { QuestionnaireTrajetsSimplesComponent } from './composantes/questionnaire-trajets-simples/questionnaire-trajets-simples.component';
import { SelectableItemComponent } from './composantes/selectable-items/selectable-items.component';
import { AddressAutoCompleteComponent } from './composantes/address-autocomplete/address-autocomplete.component';

@NgModule({
  declarations: [
    GestionTrajetsComponent,
    QuestionnaireComponent,
    RevueComponent,
    MapComponent,
    TrajetsComponent,
    AjoutTrajetComponent,
    BesoinsComponent,
    SliderPriceComponent,
    FormulaireCreationLieuComponent,
    QuestionnaireTrajetsSimplesComponent,
    SelectableItemComponent,
    AddressAutoCompleteComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgChartsModule,
    LeafletModule,
    BesoinsRoutingModule,
    MatSliderModule,
    FormsModule,
  ],
  exports: [BesoinsComponent],
})
export class BesoinsModule {}
