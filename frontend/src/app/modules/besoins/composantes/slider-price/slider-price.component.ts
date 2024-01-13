import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slider-price',
  templateUrl: './slider-price.component.html',
  styleUrls: ['./slider-price.component.css'],
})
export class SliderPriceComponent {
  @Input() minPrice = 0;
  @Input() maxPrice = 200000;
  @Input() price: string | undefined;
  @Output() priceChange = new EventEmitter<number>();

  onModelChange($event: string) {
    this.priceChange.emit(Number($event));
  }

  formatLabel(value: number): string {
    if (value == this.maxPrice) {
      return 'illimité';
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
