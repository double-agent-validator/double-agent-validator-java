import { Injectable, Optional } from '@angular/core';
import { ValidationResult } from './models';
import * as ajvNsAndConstructor from 'ajv';
import * as _ from 'lodash';

@Injectable()
export class DoubleAgentValidator {
  private noErrorResult: ValidationResult = { hasErrors: false, errors: null };

  constructor(@Optional() private _ajv: ajvNsAndConstructor.Ajv) {
  }

  get ajv(): ajvNsAndConstructor.Ajv {
    return this._ajv;
  }

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

  get schemas(): string[] {
    return _.map(this.ajv['_schemas'], (schema) => schema['id']);
  }

  // method to return keywords

  // method to return known schemas

  // method to return known formats

  // method to build angular validator to the formControl

  // method to build angular validator to the formGroup

}
