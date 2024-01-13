import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionnaireTrajetsSimplesComponent } from '../questionnaire-trajets-simples/questionnaire-trajets-simples.component';
import { SelectableItemComponent } from '../selectable-items/selectable-items.component';
import { SliderPriceComponent } from '../slider-price/slider-price.component';

import { QuestionnaireComponent } from './questionnaire.component';

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        QuestionnaireComponent,
        SliderPriceComponent,
        QuestionnaireTrajetsSimplesComponent,
        SelectableItemComponent,
      ],
      imports: [
        MatSliderModule,
        FormsModule,
        FontAwesomeModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
