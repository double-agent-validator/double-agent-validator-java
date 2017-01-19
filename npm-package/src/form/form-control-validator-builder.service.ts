import { Injectable } from '@angular/core';
import { AbstractControl, Validators, ValidatorFn, FormControlName, FormControl, FormGroup } from '@angular/forms';
import { JsonSchema } from '../models/schema/json-schema';
import { DoubleAgentValidator } from '../validator.service';
import * as _ from 'lodash';
import { DoubleAgentFormControl } from './form-control';

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

    if (schema.required && schema.required.indexOf(property) >= 0) {
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
        let jsonSchemaFormControl = <DoubleAgentFormControl>control;
        if (jsonSchemaFormControl.jsonSchemaProperty &&
          jsonSchemaFormControl.jsonSchemaProperty.ui &&
          jsonSchemaFormControl.jsonSchemaProperty.ui.dependents && control.root && control.root['controls']) {
          _.each(jsonSchemaFormControl.jsonSchemaProperty.ui.dependents, function (propertyName) {
            data[propertyName] = control.root['controls'][propertyName].value;
          });
        }

      } else {
        data = propertyOrFormData;
      }

      // runs the validation
      let result = this.doubleAgentValidator.validate(schemaName, data);

      if (result.hasErrors) {


        // if a specific property was provided, then only returns error refering that property
        if (_.isString(propertyOrFormData)) {
          /*let errorsOfProperty = result.errors.filter((error) => {
            return error.dataPath.match(`\.${propertyOrFormData}`);
          });
          if (errorsOfProperty.length > 0) {
            validationResult.jsonSchema = {
              errors: errorsOfProperty
            };
            return validationResult;
          }*/
          _.each(result.errors, (error) => {
            if (error.dataPath) {
              let propertyName = error.dataPath.substring(1);
              let form: FormGroup = (<any>control.root);
              if (form && form.controls[propertyName]) {
                if (!form.controls[propertyName].errors) {
                  form.controls[propertyName].errors = [];
                }
                if (!form.controls[propertyName].errors['jsonSchema']) {
                  form.controls[propertyName].errors['jsonSchema'] = { errors: [] }
                }
                form.controls[propertyName].errors['jsonSchema'].errors.push(error);
                control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
              }
            }
          });
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
