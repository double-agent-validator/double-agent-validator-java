import { OnInit, Renderer, ElementRef } from '@angular/core';
import { FormControlName } from '@angular/forms';
/**
 * The FormControls created with the DoubleAgentValidatorFormBuilder
 * will have properties defined in the keyworkd maxLength or ui.maxLength
 * or minLength or ui.minLength reflected to the input field associated to the formControlName
 *
 * @export
 * @class InputHtml5AttributesDirective
 */
export declare class InputHtml5AttributesDirective implements OnInit {
    private renderer;
    private formControlName;
    private elementRef;
    private controlJsonProperty;
    constructor(renderer: Renderer, formControlName: FormControlName, elementRef: ElementRef);
    findInputElement(): HTMLInputElement;
    ngOnInit(): void;
}
