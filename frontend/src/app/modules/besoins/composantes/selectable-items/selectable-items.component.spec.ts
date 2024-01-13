import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SelectableItemComponent } from './selectable-items.component';

describe('SelectionTypeVehiculesComponent', () => {
  let component: SelectableItemComponent;
  let fixture: ComponentFixture<SelectableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectableItemComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectableItemComponent);
    component = fixture.componentInstance;
    component.availableItems = ['a', 'b', 'c'];
    component.selectedItems = ['b', 'c', 'd'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('unselect unavailable items', () => {
    expect(component.selectedItems).toEqual(['b', 'c']);
  });

  it('should clear all selected items', () => {
    component.clearSelection();
    expect(component.selectedItems).toEqual([]);
  });

  it('should add to selection', () => {
    clickItem(fixture, 0);
    expect(component.selectedItems).toEqual(['b', 'c', 'a']);
  });

  it('should remove from selection', () => {
    clickItem(fixture, 1);
    expect(component.selectedItems).toEqual(['c']);
  });
});

function clickItem(
  fixture: ComponentFixture<SelectableItemComponent>,
  index: number
) {
  let selectableItems = (fixture.nativeElement as HTMLElement).querySelectorAll(
    '[data-value]'
  );
  (selectableItems[index] as HTMLElement).click();
}
