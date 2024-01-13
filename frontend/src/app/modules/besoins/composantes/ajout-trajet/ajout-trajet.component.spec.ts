import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapComponent } from '../map/map.component';

import { AjoutTrajetComponent } from './ajout-trajet.component';

describe('AjoutTrajetComponent', () => {
  let component: AjoutTrajetComponent;
  let fixture: ComponentFixture<AjoutTrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutTrajetComponent, MapComponent],
      imports: [FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
