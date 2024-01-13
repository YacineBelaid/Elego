import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { FormulaireCreationLieuComponent } from './formulaire-creation-lieu.component';

const ADRESSE_VALIDE = '201 Av. du Président-Kennedy, Montréal, QC H2X 3Y7';
const FORMULAIRE_ADRESSE_VIDE = {
  adresse: '',
  etiquette: 'UQAM',
  isResidence: false,
};
const FORMULAIRE_ADRESSE_REMPLIE = {
  adresse: ADRESSE_VALIDE,
  etiquette: 'UQAM',
  isResidence: false,
};
const UUID_REGEX =
  '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';

describe('FormulaireCreationLieuComponent', () => {
  let component: FormulaireCreationLieuComponent;
  let fixture: ComponentFixture<FormulaireCreationLieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulaireCreationLieuComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormulaireCreationLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require an adress', () => {
    component.formulaire.setValue(FORMULAIRE_ADRESSE_VIDE);
    expect(component.formulaire.valid).toBeFalse();
  });

  it('should be valid with an adress', () => {
    component.formulaire.setValue(FORMULAIRE_ADRESSE_REMPLIE);
    expect(component.formulaire.valid).toBeTrue();
  });

  it('should emit event when cancel is clicked', waitForAsync(() => {
    component.placeCreated.subscribe((lieuCreationResult) => {
      expect(lieuCreationResult.success).toBeFalse();
      expect(lieuCreationResult.id).toBeNull();
    });
    component.cancelButton.nativeElement.click();
  }));

  it('should emit event when submit is clicked', waitForAsync(() => {
    component.formulaire.setValue(FORMULAIRE_ADRESSE_REMPLIE);
    component.placeCreated.subscribe((lieuCreationResult) => {
      expect(lieuCreationResult.success).toBeTrue();
      expect(lieuCreationResult.id).toMatch(UUID_REGEX);
    });
    component.submitButton.nativeElement.click();
  }));
});
