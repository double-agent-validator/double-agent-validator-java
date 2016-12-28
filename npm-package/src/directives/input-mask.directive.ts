import { Directive, HostListener, Renderer, ElementRef, Injector } from '@angular/core';
import { FormControlName } from '@angular/forms';

import * as VMasker from 'vanilla-masker';
import { DoubleAgentValidator } from '../validator.service';
import { DoubleAgentFormControl } from '../form/form-control';
import { findInArray } from '../helpers';

/**
 * Applies a mask to user input following the configuration
 * passed-in the json-schema which originated the formControlName (if it is the case)
 *
 * @export
 * @class InputMaskDirective
 * @implements {OnInit}
 */
@Directive({
  selector: '[formControlName]'
})
export class InputMaskDirective {

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    private doubleAgentValidator: DoubleAgentValidator,
    private injector: Injector
  ) {

  }

  formControlName(): FormControlName {
      return <FormControlName> this.injector.get(FormControlName);
  }


  getUiMask(value?: string) {
    let jsonProperty = (<DoubleAgentFormControl>this.formControlName().control).jsonSchemaProperty;
    if (jsonProperty && jsonProperty['ui']) {
      if (Array.isArray(jsonProperty['ui']['mask'])) {
        let masksArray = jsonProperty['ui']['mask'];
        let mask = findInArray(masksArray, (item) => {
          return new RegExp(item['matcher']).test(value)
        });
        return mask ? mask['value'] : null;

      } else {
        return jsonProperty['ui'] ? jsonProperty['ui']['mask'] : null;
      }
    }
    return null;
  }

  @HostListener('input', ['$event.target.value']) onInput(value: any) {
    // Write back to model
    if (value) {
      let mask = this.getUiMask(value);
      // write formatted to to control view
      if (mask) {
        value = VMasker.toPattern(value, mask);
      }
      this.writeValue(value);
    }
  }

  writeValue(value: string) {
    this.formControlName().control.setValue(value);
  }
}
