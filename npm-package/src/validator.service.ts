import { ValidationResult } from './models';
import * as ajvNsAndConstructor from 'ajv';
import * as _ from 'lodash';
import { JsonSchema } from './models/schema/json-schema';
import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

/**
 *
 *
 * @export
 * @class DoubleAgentValidator
 */
@Injectable()
export class DoubleAgentValidator {

  private scriptContext: Window;
  /**
   *
   *
   * @private
   * @type {ValidationResult}
   * @memberOf DoubleAgentValidator
   */
  private noErrorResult: ValidationResult = { hasErrors: false, errors: null };

  isReady: ReplaySubject<void> = new ReplaySubject<void>(1);

  /**
   * Creates an instance of DoubleAgentValidator.
   *
   *
   * @memberOf DoubleAgentValidator
   */
  constructor() {
  }

  private _notifyReady() {
    this.isReady.next(null);
  }

  /**
   *
   *
   * @readonly
   * @type {ajvNsAndConstructor.Ajv}
   * @memberOf DoubleAgentValidator
   */
  get ajv(): ajvNsAndConstructor.Ajv {
    return this.scriptContext['ajv'];
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
    let result: ValidationResult = this.scriptContext['DoubleAgent']['JsonSchemaValidator'].validate(schemaName, data);
    return result;
  }

  getSchema(schemaName: string): JsonSchema {
    debugger;
    return <JsonSchema>this.scriptContext['DoubleAgent']['JsonSchemaValidator'].getSchemaObject(schemaName);
  }


  /**
   *
   *
   * @param {JsonSchema} schema
   * @returns {string[]}
   *
   * @memberOf DoubleAgentValidator
   */
  getKeywords(schema: JsonSchema): string[] {
    return this.scriptContext['DoubleAgent']['JsonSchemaValidator'].getKeywords(schema);
  }

  getFormats(): {} {
    return this.scriptContext['DoubleAgent']['JsonSchemaValidator'].getFormats();
  }

  /**
  *
  *
  * @readonly
  * @type {string[]}
  * @memberOf DoubleAgentValidator
  */
  get schemasNames(): string[] {
    return this.scriptContext['DoubleAgent']['JsonSchemaValidator'].getSchemas();
  }



}
