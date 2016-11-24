import { Injectable } from '@angular/core';
import { ValidationResult } from './models';
import * as ajvNsAndConstructor from 'ajv';
import * as lodash from 'lodash';

@Injectable()
export class DoubleAgentValidator {
  private noErrorResult: ValidationResult = { hasErrors: false, errors: null };
  public ajv: ajvNsAndConstructor.Ajv = new ajvNsAndConstructor({ allErrors: true, v5: true});
  public _: lodash.LoDashStatic = lodash;

  constructor() { }

  validate(schemaName: string, data: any): ValidationResult {
    let result: boolean = this.ajv.validate(schemaName, data);

    if (result) {
      return this.noErrorResult;
    } else {
      return {
        hasErrors: true,
        errors: this.ajv.errors
      };
    }
  }

}
