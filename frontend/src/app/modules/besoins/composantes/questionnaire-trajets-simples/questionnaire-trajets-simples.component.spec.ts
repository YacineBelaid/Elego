import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireTrajetsSimplesComponent } from './questionnaire-trajets-simples.component';

describe('QuestionnaireTrajetsSimplesComponent', () => {
  let component: QuestionnaireTrajetsSimplesComponent;
  let fixture: ComponentFixture<QuestionnaireTrajetsSimplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionnaireTrajetsSimplesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionnaireTrajetsSimplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
