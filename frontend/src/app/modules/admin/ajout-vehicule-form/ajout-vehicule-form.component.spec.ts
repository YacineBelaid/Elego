import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutVehiculeFormComponent } from './ajout-vehicule-form.component';

describe('AjoutVehiculeFormComponent', () => {
  let component: AjoutVehiculeFormComponent;
  let fixture: ComponentFixture<AjoutVehiculeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutVehiculeFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutVehiculeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
