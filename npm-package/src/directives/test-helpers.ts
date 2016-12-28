import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { InputMaskDirective } from './input-mask.directive';

import * as sinon from 'sinon';

export function getFormElement(fixture: ComponentFixture<any>, controlName: string) {
  return fixture.debugElement.query(By.css(`input[formcontrolname=${controlName}]`));
}

export function getMockForMask(fixture: ComponentFixture<any>, controlName: string, formGroup: FormGroup) {
  let element: DebugElement = getFormElement(fixture, controlName);
  let maskDirective: InputMaskDirective = element.injector.get(InputMaskDirective);
  let valueAfterMask = '';
  let setValueMockFn = (value) => {
    valueAfterMask = value;
  };
  sinon.stub(maskDirective, 'writeValue', setValueMockFn);
  return {
    maskDirective: maskDirective,
    element: element,
    triggerInput: (inputValue: String) => {
      element.triggerEventHandler('input', { target: { value: inputValue } });
    },
    getValueAfterMask: () => {
      return valueAfterMask;
    }
  };
}
