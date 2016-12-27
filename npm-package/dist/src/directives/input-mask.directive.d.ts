import { Renderer, ElementRef, Injector } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { DoubleAgentValidator } from '../validator.service';
/**
 * Applies a mask to user input following the configuration
 * passed-in the json-schema which originated the formControlName (if it is the case)
 *
 * @export
 * @class InputMaskDirective
 * @implements {OnInit}
 */
export declare class InputMaskDirective {
    private renderer;
    private elementRef;
    private doubleAgentValidator;
    private injector;
    constructor(renderer: Renderer, elementRef: ElementRef, doubleAgentValidator: DoubleAgentValidator, injector: Injector);
    formControlName(): FormControlName;
    getUiMask(value?: string): any;
    onInput(value: any): void;
    writeValue(value: string): void;
}
