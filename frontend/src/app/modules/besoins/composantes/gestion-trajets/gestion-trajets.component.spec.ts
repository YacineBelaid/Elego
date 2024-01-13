import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';
import { AjoutTrajetComponent } from '../ajout-trajet/ajout-trajet.component';
import { MapComponent } from '../map/map.component';
import { TrajetsComponent } from '../trajets/trajets.component';

import { GestionTrajetsComponent } from './gestion-trajets.component';

describe('GestionTrajetsComponent', () => {
  let component: GestionTrajetsComponent;
  let fixture: ComponentFixture<GestionTrajetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GestionTrajetsComponent,
        AjoutTrajetComponent,
        TrajetsComponent,
        MapComponent,
      ],
      imports: [FontAwesomeModule, NgChartsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionTrajetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
