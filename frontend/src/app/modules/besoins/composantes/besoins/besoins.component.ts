import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepperProxy } from '../../elements/SteppeProxy';

const DEFAULT_STEP = 'questionnaire';
const STEPS: { [key: string]: number | undefined } = {
  questionnaire: 0,
  trajets: 1,
  revue: 2,
};
const ROUTES: { [key: number]: string | undefined } = {
  0: 'questionnaire',
  1: 'trajets',
  2: 'revue',
};

@Component({
  selector: 'app-besoins',
  templateUrl: './besoins.component.html',
  styleUrls: ['./besoins.component.css'],
})
export class BesoinsComponent implements OnInit, OnDestroy, AfterContentInit {
  public activePage = DEFAULT_STEP;
  private stepper: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('init besoins component');
    let route = this.router.url.replace('/besoins/', '');
    this.activePage = route == '' ? DEFAULT_STEP : route;
  }

  ngAfterContentInit(): void {
    this.stepper = new StepperProxy(document.getElementById('stepper'));
    this.stepper.changeStep(STEPS[this.activePage]);
    this.stepper.onStepChange$.asObservable().subscribe((step: number) => {
      let route = ROUTES[step] ?? DEFAULT_STEP;
      this.activePage = route;
      this.router.navigateByUrl('besoins/' + route);
    });
  }

  ngOnDestroy(): void {
    this.stepper.onStepChange$.unsubscribe();
    console.log('destroy besoin component');
  }

  /**
   * Return the active stepper page for testing
   * @returns active stepper page
   */
  getStepper(): StepperProxy {
    return this.stepper;
  }
}
