import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './catalogue/catalogue.component';

@NgModule({
  declarations: [CatalogueComponent],
  imports: [CommonModule, HttpClientModule, CatalogueRoutingModule],
})
export class CatalogueModule {}
