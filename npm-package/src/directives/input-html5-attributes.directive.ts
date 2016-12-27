import { Directive, OnInit, Renderer, ElementRef } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { JsonSchemaProperty } from '../models/schema/json-schema-property';
import { DoubleAgentFormControl } from '../form/form-control';


/**
 * The FormControls created with the DoubleAgentValidatorFormBuilder
 * will have properties defined in the keyworkd maxLength or ui.maxLength
 * or minLength or ui.minLength reflected to the input field associated to the formControlName
 *
 * @export
 * @class InputHtml5AttributesDirective
 */
@Directive({
  selector: '[formControlName]'
})
export class InputHtml5AttributesDirective implements OnInit {
  private controlJsonProperty: JsonSchemaProperty;

  constructor(
    private renderer: Renderer,
    private formControlName: FormControlName,
    private elementRef: ElementRef
  ) {
  }

  findInputElement(): HTMLInputElement  {
    if (this.elementRef.nativeElement instanceof HTMLInputElement) {
      return this.elementRef.nativeElement;
    } else {
      let rootElement = <Element> this.elementRef.nativeElement;
      let elementChildren = Array.from(rootElement.children);
      for (let el of elementChildren) {
        if (el instanceof HTMLInputElement) {
          return el;
        }
      }
      return null;
    }
  }

  ngOnInit() {
    this.controlJsonProperty = (<DoubleAgentFormControl>this.formControlName.control).jsonSchemaProperty;
    if (!this.controlJsonProperty) { return; } // return if does not have jsonSchemaProperty defined

    let element = this.findInputElement();
    if (!element) { return; } // return if the element is not a input

    if (this.controlJsonProperty['maxLength']) {
      this.renderer.setElementAttribute(
        element,
        'maxlength',
        this.controlJsonProperty['maxLength']
      );
    }

    if (this.controlJsonProperty['ui'] && this.controlJsonProperty['ui']['maxLength']) {
      this.renderer.setElementAttribute(
        element,
        'maxlength',
        this.controlJsonProperty['ui']['maxLength']
      );
    }

    if (this.controlJsonProperty['minLength']) {
      this.renderer.setElementAttribute(
        element,
        'minlength',
        this.controlJsonProperty['minLength']
      );
    }

    if (this.controlJsonProperty['ui'] && this.controlJsonProperty['ui']['minLength']) {
      this.renderer.setElementAttribute(
        element,
        'minlength',
        this.controlJsonProperty['ui']['minLength']
      );
    }

  }
}
