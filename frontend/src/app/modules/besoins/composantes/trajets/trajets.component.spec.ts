import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapComponent } from '../map/map.component';

import { TrajetsComponent } from './trajets.component';

describe('TrajetsComponent', () => {
  let component: TrajetsComponent;
  let fixture: ComponentFixture<TrajetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrajetsComponent, MapComponent],
      imports: [FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TrajetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
