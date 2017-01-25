import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { InputMaskDirective } from './input-mask.directive';

import * as sinon from 'sinon';


export function getDoubleAgentMockedScriptContent() {
  let scriptContent = '';
  try {
    scriptContent = require('raw-loader!../../mock-data/script-test.js');
  } catch (e) {
    let readScript = `let fs = require('fs');
                  var path = require('path');
                  scriptContent = String(fs.readFileSync(path.join(__dirname, '../../mock-data/script-test.js')));`;
    eval(readScript);
  }
  return scriptContent;
}

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
  let maskDirectiveWriteValue = sinon.stub(maskDirective, 'writeValue', setValueMockFn);
  return {
    maskDirective: maskDirective,
    writeValueStub: maskDirectiveWriteValue,
    element: element,
    triggerInput: (inputValue: String) => {
      element.triggerEventHandler('input', { target: { value: inputValue } });
    },
    getValueAfterMask: () => {
      return valueAfterMask;
    }
  };
}
