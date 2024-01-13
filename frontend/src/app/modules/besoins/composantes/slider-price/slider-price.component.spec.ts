import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { SliderPriceComponent } from './slider-price.component';

describe('SliderPriceComponent', () => {
  let component: SliderPriceComponent;
  let fixture: ComponentFixture<SliderPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderPriceComponent],
      imports: [FormsModule, MatSliderModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
