import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../besoins-routing.module';

import { BesoinsComponent } from './besoins.component';

describe('BesoinsComponent', async () => {
  let component: BesoinsComponent;
  let fixture: ComponentFixture<BesoinsComponent>;
  let router: Router;

  beforeEach(async () => {
    ({ router, fixture, component } = await beforeEachNavigate('besoins/'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change route to questionnaire', waitForAsync(() => {
    shouldChangeRouteTo(component, router, 0, 'questionnaire');
  }));

  it('should change route to trajets', waitForAsync(() => {
    shouldChangeRouteTo(component, router, 1, 'trajets');
  }));

  it('should change route to revue', waitForAsync(() => {
    shouldChangeRouteTo(component, router, 2, 'revue');
  }));
});

describe('BesoinsComponent : Navigating to besoins/questionnaire', () => {
  let component: BesoinsComponent;
  let fixture: ComponentFixture<BesoinsComponent>;
  let router: Router;

  beforeEach(async () => {
    ({ router, fixture, component } = await beforeEachNavigate(
      'besoins/questionnaire'
    ));
  });

  it('should display questionnaire', async () => {
    expect(component.activePage).toEqual('questionnaire');
    expect(component.getStepper().activeStepIndex).toEqual(0);
  });
});

describe('BesoinsComponent : Navigating to besoins/trajets', () => {
  let component: BesoinsComponent;
  let fixture: ComponentFixture<BesoinsComponent>;
  let router: Router;

  beforeEach(async () => {
    ({ router, fixture, component } = await beforeEachNavigate(
      'besoins/trajets'
    ));
  });

  it('should display trajets', () => {
    expect(component.activePage).toEqual('trajets');
    expect(component.getStepper().activeStepIndex).toEqual(1);
  });
});

describe('BesoinsComponent : Navigating to besoins/revue', () => {
  let component: BesoinsComponent;
  let fixture: ComponentFixture<BesoinsComponent>;
  let router: Router;

  beforeEach(async () => {
    ({ router, fixture, component } = await beforeEachNavigate(
      'besoins/revue'
    ));
  });

  it('should display revue', () => {
    expect(component.activePage).toEqual('revue');
    expect(component.getStepper().activeStepIndex).toEqual(2);
  });
});

async function beforeEachNavigate(url: string) {
  let component: BesoinsComponent;
  let fixture: ComponentFixture<BesoinsComponent>;
  let router: Router;

  await TestBed.configureTestingModule({
    declarations: [BesoinsComponent],
    imports: [RouterTestingModule.withRoutes(routes)],
  }).compileComponents();

  router = TestBed.inject(Router);
  forceNavigate(router, url);
  fixture = TestBed.createComponent(BesoinsComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();

  return { router, fixture, component };
}

/**
 * Method to change the currently active page in tests, taken from
 * https://stackoverflow.com/a/63623284/3916526
 * @param router Router we're manipulating
 * @param url url to forcibly route to.
 */
function forceNavigate(router: Router, url: string) {
  const mockUrlTree = router.parseUrl(url);
  // @ts-ignore: force this private property value for testing.
  router.currentUrlTree = mockUrlTree;
}

function shouldChangeRouteTo(
  component: BesoinsComponent,
  router: Router,
  stepperIndex: number,
  route: string
) {
  const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
  const stepper: any = component.getStepper();
  stepper.changeStep(stepperIndex);
  expect(component.activePage).toEqual(route);
  expect(navigateByUrlSpy).toHaveBeenCalledWith('besoins/' + route);
}
