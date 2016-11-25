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
  /**
   *
   *
   * @private
   * @type {ValidationResult}
   * @memberOf DoubleAgentValidator
   */
  private noErrorResult: ValidationResult = { hasErrors: false, errors: null };

  private _ajv: ajvNsAndConstructor.Ajv;

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

  getSchema(schemaName: string): JsonSchema {
    return <JsonSchema>this.ajv.getSchema(schemaName).schema;
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
    return _.keys(_.omit(schema, this.defaultKeywords));
  }

  /**
  *
  *
  * @readonly
  * @type {string[]}
  * @memberOf DoubleAgentValidator
  */
  get schemasNames(): string[] {
    return _.map(
      this.ajv['_schemas'], (schema) => schema['id']
    ).filter((schema) => {
      return _.omit(['abc'], schema.id);
    });
  }

  // private methods
  private get defaultKeywords(): string[] {
    return [
      'type', 'additionalProperties', 'patternProperties', 'maximum',
      'minimum', 'multipleOf', 'maxLength', 'minLength', 'pattern',
      'format', 'maxItems', 'minItems', 'uniqueItems', 'items', 'maxProperties',
      'minProperties', 'required', 'dependencies', 'properties', '$ref', 'enum',
      'not', 'anyOf', 'oneOf', 'allOf', 'additionalItems', '$schema', 'id', 'title',
      'description', 'default'
    ];
  }

}
