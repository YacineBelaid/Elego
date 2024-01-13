import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selectable-items',
  templateUrl: './selectable-items.component.html',
  styleUrls: ['./selectable-items.component.css'],
})
export class SelectableItemComponent implements OnInit {
  @Input() availableItems: Array<string> = [];
  @Input() selectedItems: Array<string> = [];
  @Output() selectionChanged = new EventEmitter<Array<string>>();

  constructor() {}
  ngOnInit(): void {
    // Remove any unavailable items from selected items
    this.selectedItems = this.selectedItems.filter((item) =>
      this.availableItems.includes(item)
    );
  }

  cardClicked($event: MouseEvent) {
    let e = $event.target as HTMLElement;
    while (e.dataset['selected'] == undefined) {
      e = e.parentElement as HTMLElement;
    }
    let value = e.dataset['value'] as string;
    if (e.dataset['selected'] == 'false') {
      this.selectedItems.push(value);
    } else {
      this.selectedItems = this.selectedItems.filter((item) => item != value);
    }
    this.selectionChanged.emit(this.selectedItems);
  }

  clearSelection() {
    this.selectedItems = [];
    this.selectionChanged.emit(this.selectedItems);
  }
}
