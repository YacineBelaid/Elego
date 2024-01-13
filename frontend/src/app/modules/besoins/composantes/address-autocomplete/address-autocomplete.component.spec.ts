import { HttpClientModule } from '@angular/common/http';
import { SimpleChange } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom, of } from 'rxjs';
import {
  GeoCodingResult,
  GeoCodingService,
} from '../../services/geocoding.service';

import { AddressAutoCompleteComponent } from './address-autocomplete.component';

const SELECTOR_PANEL = '[data-testid="panel"]';
const SELECTOR_PANEL_ITEM = '[data-testid="panel-item"]';
const SELECTOR_PANEL_NO_RESULTS_ITEM = '[data-testid="panel-no-results-item"]';
const SELECTOR_INPUT = 'input[type="text"]';

function isDomElementVisible(domElement: HTMLElement): boolean {
  return !!(domElement.offsetWidth || domElement.offsetHeight);
}

describe('AddressAutoCompleteComponent', () => {
  let component: AddressAutoCompleteComponent;
  let fixture: ComponentFixture<AddressAutoCompleteComponent>;
  let geoCodingServiceSpy: jasmine.SpyObj<GeoCodingService>;

  // 'beforeEach' cannot be used because if a test needs 'fakeAsync', the 'debounceTime' of RxJS will not see the fake environment created by 'fakeAsync' and 'tick' will not work.
  // (See https://github.com/angular/angular/issues/44351#issuecomment-991635834.)
  // Each test must call 'setupFixture' before any testing.
  // 'fakeAsync' can accept a promise, see https://github.com/angular/angular/blob/15.0.x/packages/core/test/fake_async_spec.ts#L66.
  async function setupFixture() {
    geoCodingServiceSpy = jasmine.createSpyObj<GeoCodingService>(
      'GeoCodingService',
      ['search']
    );

    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AddressAutoCompleteComponent],
      providers: [{ provide: GeoCodingService, useValue: geoCodingServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', async () => {
    // Arrange + Act
    await setupFixture();

    // Assert
    expect(component).toBeTruthy();
  });

  it('should not be opened by default', async () => {
    // Arrange + Act
    await setupFixture();

    // Assert
    expect(isItemsPanelVisible()).toBeFalse();
  });

  it('should not open results panel with an empty search', async () => {
    // Arrange
    await setupFixture();

    // Act
    setSearch('');

    // Assert
    expect(fixture.componentInstance.panelOpen).toBeFalse();
    expect(isItemsPanelVisible()).toBeFalse();
  });

  it('should search for geocoding results and show them', fakeAsync(async () => {
    // Arrange
    await setupFixture();
    const spy = setupSpyOnGeoCodingServiceSearchWithData();

    // Act
    setSearch('a query');
    tickSearchDebounce();

    // Assert

    expect(spy).toHaveBeenCalledOnceWith('a query');

    expect(isItemsPanelVisible()).toBeTrue();

    expect(
      fixture.debugElement.queryAll(By.css(SELECTOR_PANEL_NO_RESULTS_ITEM))
    ).toHaveSize(0);

    const results = fixture.debugElement.queryAll(By.css(SELECTOR_PANEL_ITEM));
    const itemTexts = results
      .map((r) => r.nativeElement as HTMLElement)
      .map((e) => e.innerText);
    expect(itemTexts).toContain('foo');
    expect(itemTexts).toContain('bar');
    expect(itemTexts).toContain('baz');
  }));

  it('should debounce calls to geocoding API', fakeAsync(async () => {
    // Arrange
    await setupFixture();
    const spy = setupSpyOnGeoCodingServiceSearchWithData();

    // Act
    setSearch('a');
    tick(300);
    fixture.detectChanges();

    setSearch('b');
    tick(300);
    fixture.detectChanges();

    setSearch('a query');
    tickSearchDebounce();

    setSearch('a query with added things');
    tickSearchDebounce();

    // Assert
    expect(spy).toHaveBeenCalledWith('a query');
    expect(spy).toHaveBeenCalledWith('a query with added things');
    expect(spy).not.toHaveBeenCalledWith('a');
    expect(spy).not.toHaveBeenCalledWith('b');
    expect(spy).toHaveBeenCalledTimes(2);
  }));

  it('should show no results item when search returns no result', fakeAsync(async () => {
    // Arrange
    await setupFixture();
    geoCodingServiceSpy.search.and.returnValue(of<GeoCodingResult[]>([]));

    // Act
    setSearch('test');
    tickSearchDebounce();

    // Assert

    expect(isItemsPanelVisible()).toBeTrue();

    expect(
      fixture.debugElement.queryAll(By.css(SELECTOR_PANEL_NO_RESULTS_ITEM))
    ).toHaveSize(1);

    expect(
      fixture.debugElement.queryAll(By.css(SELECTOR_PANEL_ITEM))
    ).toHaveSize(0);
  }));

  it('should show new results when updating search', fakeAsync(async () => {
    // Arrange
    await setupFixture();

    const query2Result: GeoCodingResult = {
      formattedAddress: 'beta',
      latitude: 3,
      longitude: 4,
    };

    const spy = geoCodingServiceSpy.search
      .withArgs('query 1')
      .and.returnValue(
        of<GeoCodingResult[]>([
          {
            formattedAddress: 'alpha',
            latitude: 1,
            longitude: 2,
          },
        ])
      )
      .withArgs('query 2')
      .and.returnValue(of([query2Result]));

    // Act
    setSearch('query 1');
    tickSearchDebounce();
    setSearch('query 2');
    tickSearchDebounce();

    // Assert
    expect(isItemsPanelVisible()).toBeTrue();

    expect(
      fixture.debugElement.queryAll(By.css(SELECTOR_PANEL_ITEM))
    ).toHaveSize(1);

    const result = fixture.debugElement.query(By.css(SELECTOR_PANEL_ITEM))
      .nativeElement as HTMLElement;
    expect(result.innerText).toBe('beta');
    expect(result.innerText).not.toBe('alpha');

    expect(spy).toHaveBeenCalledWith('query 1');
    expect(spy).toHaveBeenCalledWith('query 2');
    expect(spy).toHaveBeenCalledTimes(2);
  }));

  it('should close when clicking outside the component', fakeAsync(async () => {
    // Arrange
    await setupFixture();
    setupSpyOnGeoCodingServiceSearchWithData();
    setSearch('a query');
    tickSearchDebounce();

    // Act
    closeAutoComplete();

    // Assert
    expect(isItemsPanelVisible()).toBeFalse();
  }));

  it('should close when clearing search', fakeAsync(async () => {
    // Arrange
    await setupFixture();
    setupSpyOnGeoCodingServiceSearchWithData();
    setSearch('a query');
    tickSearchDebounce();

    // Act
    setSearch('');
    tickSearchDebounce();

    // Assert
    expect(isItemsPanelVisible()).toBeFalse();
  }));

  it('should hide results immediately when changing search', fakeAsync(async () => {
    // Arrange
    await setupFixture();
    setupSpyOnGeoCodingServiceSearchWithData();
    setSearch('a query');
    tickSearchDebounce();

    // Act
    setSearch('');
    fixture.detectChanges();

    // Assert
    expect(isItemsPanelVisible()).toBeFalse();

    // Cleanup leftover timer from debounce.
    tickSearchDebounce();
  }));

  it('should show existing search results when giving focus again to textbox', fakeAsync(async () => {
    // Arrange

    await setupFixture();
    setupSpyOnGeoCodingServiceSearchWithData();
    setSearch('a query');
    tickSearchDebounce();

    closeAutoComplete();

    // Act
    const input = fixture.debugElement.query(By.css(SELECTOR_INPUT))
      .nativeElement as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    // Assert
    expect(isItemsPanelVisible()).toBeTrue();
  }));

  it('should set query set as input on the textbox and search without opening', fakeAsync(async () => {
    // Arrange

    await setupFixture();
    const spy = setupSpyOnGeoCodingServiceSearchWithData();

    // Act

    const component = fixture.componentInstance;
    component.queryString = 'new search';
    component.ngOnChanges({
      queryString: new SimpleChange('', component.queryString, false),
    });
    fixture.detectChanges();

    tickSearchDebounce();

    // Assert

    expect(isItemsPanelVisible()).toBeFalse();

    expect(spy).toHaveBeenCalledOnceWith('new search');

    const input = fixture.debugElement.query(By.css(SELECTOR_INPUT))
      .nativeElement as HTMLInputElement;
    expect(input.value).toBe('new search');
  }));

  it('should be able to select an item', fakeAsync(async () => {
    // Arrange

    await setupFixture();
    const selectedItemPromise = firstValueFrom(
      fixture.componentInstance.selectedItemChanged
    );

    setupSpyOnGeoCodingServiceSearchWithData();
    setSearch('a query');
    tickSearchDebounce();

    const results = fixture.debugElement.queryAll(By.css(SELECTOR_PANEL_ITEM));
    const elements = results.map((r) => r.nativeElement as HTMLElement);

    // Act
    const selectedItemElement = elements.find((e) => e.innerText === 'baz');
    if (!selectedItemElement) {
      throw new Error('test is broken');
    }
    selectedItemElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert

    const input = fixture.debugElement.query(By.css(SELECTOR_INPUT))
      .nativeElement as HTMLInputElement;
    expect(input.value).toBe('baz');

    const selectedItem = await selectedItemPromise;
    expect(selectedItem).toEqual({
      formattedAddress: 'baz',
      longitude: 5,
      latitude: 6,
    });
  }));

  function tickSearchDebounce() {
    tick(1100);
    fixture.detectChanges();
  }

  function closeAutoComplete() {
    const fixtureNativeElement = fixture.nativeElement as HTMLElement;
    fixtureNativeElement.ownerDocument.dispatchEvent(new Event('click'));
    fixture.detectChanges();
  }

  function isItemsPanelVisible() {
    const panel = fixture.debugElement.query(By.css(SELECTOR_PANEL))
      .nativeElement as HTMLElement;

    return isDomElementVisible(panel);
  }

  function setSearch(newSearch: string) {
    const input = fixture.debugElement.query(By.css(SELECTOR_INPUT))
      .nativeElement as HTMLInputElement;
    input.value = newSearch;
    input.dispatchEvent(new Event('focus'));
    input.dispatchEvent(new Event('input'));
  }

  function setupSpyOnGeoCodingServiceSearchWithData() {
    return geoCodingServiceSpy.search.and.returnValue(
      of<GeoCodingResult[]>([
        { formattedAddress: 'foo', longitude: 1, latitude: 2 },
        { formattedAddress: 'bar', longitude: 3, latitude: 4 },
        { formattedAddress: 'baz', longitude: 5, latitude: 6 },
      ])
    );
  }
});
