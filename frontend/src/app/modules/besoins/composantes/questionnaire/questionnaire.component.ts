import { Component, OnInit } from '@angular/core';
import { StepperProxy } from '../../elements/SteppeProxy';
import { Criteres } from '../../interfaces/criteres.interface';
import { BesoinsService } from '../../services/besoins.service';
import {
  faDollarSign,
  faCar,
  faHashtag,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

const QUESTIONNAIRE_STEP_KEY = 'questionnaire-step';
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css'],
})
export class QuestionnaireComponent implements OnInit {
  // FontAwesome icons
  icons = { faCar, faDollarSign, faHashtag, faBuilding };
  availableNombreSieges: Array<string> = ['1', '2', '3', '4', '5', '6', '7'];
  availableVehiculeTypes: Array<string> = [
    'Les véhicules coupés',
    '4×4',
    'Les berlines',
    'Les minibus',
  ];

  nbMatchingVehicules: number = 100;
  // TODO: Determine this value from database.
  budgetMaximum = 200000;

  // Assigned during ngOnInit
  stepper!: StepperProxy;
  criteresUsager!: Criteres;

  constructor(
    private besoins: BesoinsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.stepper = new StepperProxy(
      document.getElementById('questionnaire-stepper')
    );
    this.loadActiveStep();
    for (let index = 0; index < this.stepper.activeStepIndex; index++) {
      this.stepper._toggleCompleted(index);
    }
    this.saveActiveStep();
    this.fetchCriteres();
  }

  private loadActiveStep() {
    this.stepper.changeStep(
      Number(localStorage.getItem(QUESTIONNAIRE_STEP_KEY) ?? '0')
    );
  }

  private saveActiveStep() {
    localStorage.setItem(
      QUESTIONNAIRE_STEP_KEY,
      this.stepper.activeStepIndex.toString()
    );
  }

  previousStep() {
    this.stepper.previousStep();
    this.saveActiveStep();
  }

  nextStep() {
    this.stepper.nextStep();
    this.saveActiveStep();
  }

  private fetchCriteres() {
    // Synchronous subscription, safe to unsubscribe after
    const subscription = this.besoins.criteres$.subscribe((criteres) => {
      this.criteresUsager = criteres;
      if (this.criteresUsager.budgetMin == Infinity) {
        this.criteresUsager.budgetMin = this.budgetMaximum;
      }
      if (this.criteresUsager.budgetMax == Infinity) {
        this.criteresUsager.budgetMax = this.budgetMaximum;
      }
      this.criteresUsager.budgetMax = Math.min(
        this.criteresUsager.budgetMax,
        this.budgetMaximum
      );
    });
    subscription.unsubscribe();
  }

  getNombreSiegeValues(): string[] {
    return this.criteresUsager.nombreSieges.map<string>((nb) => nb.toString());
  }

  onPriceChange($event: number) {
    this.criteresUsager.budgetMax = $event;
    this.besoins.setCriteres(this.criteresUsager);
  }

  onNombreSiegesChange($event: string[]) {
    this.criteresUsager.nombreSieges = $event.map<number>((nb) => Number(nb));
    this.besoins.setCriteres(this.criteresUsager);
  }

  onTypeVehiculeChange($event: string[]) {
    this.criteresUsager.typeVehicule = $event;
    this.besoins.setCriteres(this.criteresUsager);
  }

  completeStep() {
    if (this.nbMatchingVehicules > 0) {
      this.router.navigate(['trajets'], { relativeTo: this.route });
    }
  }
}
