import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccueilComponent } from './admin-accueil.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminAccueilComponent', () => {
  let component: AdminAccueilComponent;
  let fixture: ComponentFixture<AdminAccueilComponent>;

  beforeEach(async () => {
    console.log('admin component');
    await TestBed.configureTestingModule({
      declarations: [AdminAccueilComponent],
      imports: [FontAwesomeModule, RouterModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
