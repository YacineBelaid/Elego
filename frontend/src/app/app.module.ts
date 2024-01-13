import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { CatalogueModule } from './modules/catalogue/catalogue.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BesoinsModule } from './modules/besoins/besoins.module';
import { VehiculeEnDetailsComponent } from './composants/vehicule-en-details/vehicule-en-details.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, AccueilComponent, VehiculeEnDetailsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // <-- here
    AppRoutingModule,
    CatalogueModule,
    HttpClientModule,
    FontAwesomeModule,
    BesoinsModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
