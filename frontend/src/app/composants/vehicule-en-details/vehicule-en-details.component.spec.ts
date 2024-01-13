import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeEnDetailsComponent } from './vehicule-en-details.component';

describe('VehiculeEnDetailsComponent', () => {
  let component: VehiculeEnDetailsComponent;
  let fixture: ComponentFixture<VehiculeEnDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiculeEnDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeEnDetailsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
