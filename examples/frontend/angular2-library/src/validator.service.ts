import { Injectable, Optional } from '@angular/core';
import { ValidationResult } from './models';
import * as ajvNsAndConstructor from 'ajv';
import * as _ from 'lodash';

/**
 *
 *
 * @export
 * @class DoubleAgentValidator
 */
@Injectable()
export class DoubleAgentValidator {
  /**
   *
   *
   * @private
   * @type {ValidationResult}
   * @memberOf DoubleAgentValidator
   */
  private noErrorResult: ValidationResult = { hasErrors: false, errors: null };

  /**
   * Creates an instance of DoubleAgentValidator.
   *
   * @param {ajvNsAndConstructor.Ajv} _ajv
   *
   * @memberOf DoubleAgentValidator
   */
  constructor(@Optional() private _ajv: ajvNsAndConstructor.Ajv) {
  }

  /**
   *
   *
   * @readonly
   * @type {ajvNsAndConstructor.Ajv}
   * @memberOf DoubleAgentValidator
   */
  get ajv(): ajvNsAndConstructor.Ajv {
    return this._ajv;
  }

  /**
   *
   *
   * @param {string} schemaName
   * @param {*} data
   * @returns {ValidationResult}
   *
   * @memberOf DoubleAgentValidator
   */
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

  /**
   *
   *
   * @readonly
   * @type {string[]}
   * @memberOf DoubleAgentValidator
   */
  get schemas(): string[] {
    return _.map(this.ajv['_schemas'], (schema) => schema['id']);
  }

  // method to return keywords

  // method to return known schemas

  // method to return known formats

  // method to build angular validator to the formControl

  // method to build angular validator to the formGroup

}
