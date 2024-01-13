import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
  concatMap,
  debounceTime,
  of,
} from 'rxjs';
import {
  GeoCodingService,
  GeoCodingResult,
} from '../../services/geocoding.service';

function isElementDescendant(
  parent: HTMLElement,
  element: HTMLElement
): boolean {
  let current: HTMLElement | null = element;
  while (current) {
    if (current === parent) {
      return true;
    }

    current = current.parentElement;
  }

  return false;
}

@Component({
  selector: 'app-address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.css'],
})
export class AddressAutoCompleteComponent implements OnInit, OnDestroy, OnChanges {
  @Input() queryString: string | null = null;
  @Output() selectedItemChanged = new EventEmitter<GeoCodingResult>();

  @ViewChild('componentWrapper')
  componentWrapper: ElementRef<HTMLInputElement> | null = null;

  panelOpen: boolean = false;
  showNoResults: boolean = false;
  textBoxFocused: boolean = false;
  currentSearchTerm: string | null = null;
  items: GeoCodingResult[] = [];

  private currentSearchTermSubject = new BehaviorSubject<string | null>(null);
  private resultsSubscription: Subscription | null = null;

  constructor(private geoCodingService: GeoCodingService) {}

  ngOnInit(): void {
    this.resultsSubscription = this.currentSearchTermSubject
      .pipe(debounceTime(1000))
      .pipe(
        concatMap((newSearchTerm) => {
          if (!newSearchTerm) {
            return of([] as GeoCodingResult[]);
          }

          return this.geoCodingService.search(newSearchTerm);
        })
      )
      .subscribe((results) => {
        this.items = results;

        if (this.currentSearchTerm && this.textBoxFocused) {
          this.panelOpen = true;
        }

        if (this.currentSearchTerm && results.length === 0) {
          this.showNoResults = true;
        } else {
          this.showNoResults = false;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setSearchTerm(changes['queryString'].currentValue);
  }

  ngOnDestroy(): void {
    if (this.resultsSubscription) {
      this.resultsSubscription.unsubscribe();
    }
    this.currentSearchTermSubject.complete();
  }

  setSearchTerm(searchTerm: string | null) {
    this.currentSearchTerm = searchTerm;
    this.currentSearchTermSubject.next(searchTerm);

    this.panelOpen = false;
  }

  onFocusLost() {
    this.panelOpen = false;
    this.textBoxFocused = false;
  }

  searchTermChanged(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (!target) {
      return;
    }

    this.setSearchTerm(target.value);
  }

  onTextFieldFocused() {
    this.textBoxFocused = true;
    if (this.currentSearchTerm) {
      this.panelOpen = true;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    if (!this.componentWrapper || !this.componentWrapper.nativeElement) {
      return;
    }

    if (!isElementDescendant(this.componentWrapper.nativeElement, target)) {
      this.onFocusLost();
    }
  }

  onItemSelected(event: Event) {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    const indexString = target.dataset['index'];
    if (!indexString) {
      return;
    }

    const index = parseInt(indexString, 10);
    const item = this.items[index];

    this.onFocusLost();

    this.currentSearchTerm = item.formattedAddress;
    this.selectedItemChanged.emit(item);
  }
}
