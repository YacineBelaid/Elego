import { EventEmitter } from '@angular/core';
import { Stepper } from 'tw-elements';

/**
 * Extend the tw-elements stepper with an onStepChange event since the event
 * which is documented doesn't appear to function properly.
 * https://tailwind-elements.com/docs/standard/components/stepper/#docsTabsAPI
 */
export class StepperProxy extends Stepper {
  public onStepChange$ = new EventEmitter<number>();

  constructor(e: HTMLElement | null, config = {}) {
    super(e, config);
  }

  override _toggleStep(t: number) {
    this.onStepChange$.emit(t);
    super._toggleStep(t);
  }

  override _bindKeysNavigation(): void {
    // Keyboard navigation is undesirable in this implementation
  }
}
