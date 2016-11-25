import { Injectable } from '@angular/core';
import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { JsonSchema } from '../models/schema/json-schema';
import { DoubleAgentValidator } from '../validator.service';
import * as _ from 'lodash';

@Injectable()
export class DoubleAgentFormControlValidatorBuilder {

  constructor(private doubleAgentValidator: DoubleAgentValidator) {
  }

  /**
   * Returns the validator representing some attribute in the schema
   * which will be used to Angular 2 validates the user input
   *
   * @param {string} schemaName
   * @param {string} fieldName
   * @returns {ValidatorFn}
   *
   * @memberOf FormControlValidatorBuilder
   */
  build(schema: JsonSchema, property: string): ValidatorFn {
    let validators: ValidatorFn[] = [];
    console.log('SCHEMA and property', schema, property);
    if (schema.required && schema.required.indexOf(property) >= 0) {
      console.log('Required validator found', property);
      validators.push(Validators.required);
    }
    validators.push(this.buildAngularValidator(schema.id, property));
    return Validators.compose(validators);
  }

  /**
   * This creates a Angular validator corresponding a json schema and optionally
   * only for a given property
   *
   * @param {string} schema
   * @param {string} property
   * @returns {ValidatorFn}
   *
   * @memberOf ValidacaoService
   */
  buildAngularValidator(schemaName: string, propertyOrFormData?: string | {}): ValidatorFn {
    return (control: AbstractControl) => {
      let validationResult = {
        jsonSchema: null
      };


      // builds the data which will be validated
      let data = {};
      if (_.isString(propertyOrFormData)) {
        data[propertyOrFormData] = control.value;
      } else {
        data = propertyOrFormData;
      }

      console.log('Validating data', data);

      // runs the validation
      let result = this.doubleAgentValidator.validate(schemaName, data);

      if (result.hasErrors) {
        // if a specific property was provided, then only returns error refering that property
        if (_.isString(propertyOrFormData)) {
          let errorsOfProperty = result.errors.filter((error) => {
            return error.dataPath.match(`\.${propertyOrFormData}`);
          });
          if (errorsOfProperty.length > 0) {
            validationResult.jsonSchema = {
              errors: errorsOfProperty
            };
            return validationResult;
          }
        } else {
          // if no specific property was passed, so return all errors found
          validationResult.jsonSchema = {
            errors: result.errors
          };
          return validationResult;
        }
      } else {
        // retorna null no caso de não ter erros de validacao
        return null;

      }
    };
  }
}
