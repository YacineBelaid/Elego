declare module 'tw-elements' {
  export class Stepper {
    static get NAME(): string;
    static getInstance(element: any): any;
    static getOrCreateInstance(element: any, config?: {}): any;
    constructor(element: any, options: any);
    _element: any;
    _options: any;
    _elementHeight: number;
    _steps: any;
    _currentView: string;
    _activeStepIndex: number;
    _verticalStepperStyles: any[];
    get activeStep(): any;
    get activeStepIndex(): number;
    dispose(): void;
    changeStep(index: any): void;
    nextStep(): void;
    previousStep(): void;
    _init(): void;
    _getConfig(config: any): any;
    _bindMouseDown(): void;
    _bindResize(): void;
    _toggleStepperView(): void;
    _toggleStep(index: any): void;
    _resetStepperHeight(): void;
    _setStepsHeight(): void;
    _setSingleStepHeight(step: any): void;
    _toggleVertical(): void;
    _toggleHorizontal(): void;
    _toggleStepperClass(): void;
    _toggleStepClass(index: any, action: any, className: any): void;
    _bindKeysNavigation(): void;
    _toggleStepTabIndex(focusedElement: any, newTarget: any): void;
    _toggleOutlineStyles(focusedElement: any, newTarget: any): void;
    _toggleDisabled(): void;
    _toggleActive(index: any): void;
    _toggleCompleted(index: any): void;
    _hideInactiveSteps(): void;
    _setHeight(stepElement: any): void;
    _hideElement(stepContent: any): void;
    _showElement(stepContent: any): void;
    _animateHorizontalStep(index: any): void;
    _animateVerticalStep(index: any): void;
  }
}
