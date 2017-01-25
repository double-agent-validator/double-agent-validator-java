import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { DoubleAgentValidator } from '../validator.service';
import { JsonSchema } from '../models/schema/json-schema';
import * as _ from 'lodash';
import { DoubleAgentFormControlValidatorBuilder } from './form-control-validator-builder.service';
import { DoubleAgentFormGroup } from './form-group';
import { DoubleAgentFormControl } from './form-control';

export interface FormGroupStates {
  [key: string]: FormControlState;
}

export type FormControlState  = string | { value: string, disabled: boolean };

/**
 * This class allows creates a formGroup which contains all the fields represented in an given schema
 * each one containing it's own angular validators
 * @export
 * @class DoubleAgentFormGroupBuilder
 */
@Injectable()
export class DoubleAgentFormGroupBuilder {

  /**
   * Creates an instance of FormGroupBuilder.
   *
   * @param {DoubleAgentValidator} doubleAgentValidator
   * @param {FormBuilder} formBuilder
   *
   * @memberOf FormGroupBuilder
   */
  constructor(
    private doubleAgentValidator: DoubleAgentValidator,
    private formControlValidatorBuilder: DoubleAgentFormControlValidatorBuilder,
    private formBuilder: FormBuilder
  ) { }


  /**
   * Builds a FormGroup containing all the attributes defined in the jsonSchema
   *
   * @param {string} schemaName
   * @returns {FormGroup}
   *
   * @memberOf FormGroupBuilder
   */
  build(schemaName: string, formGroupStates?: FormGroupStates): DoubleAgentFormGroup | FormGroup {

    // TODO validar se o esquema existe e retornar erro apropriado
    let jsonSchema: JsonSchema = this.doubleAgentValidator.getSchema(schemaName);

    if (!jsonSchema) {
      throw Error(`Schema ${schemaName} not found!`);
    }

    let formGroup: DoubleAgentFormGroup;
    let formGroupConfig = {};

    // percorre os atributos definidos no jsonSchema, adicionando um FormControl com os respectivos
    // validadores para cada campo no objeto formGroupConfig
    _.each(jsonSchema.properties, (property, propertyName) => {
      if (!_.has('$ref', property) || property['type'] === 'object') { // Igore the property if refer another object or is an object
        let formState: string | FormControlState = '';
        if (formGroupStates && formGroupStates[propertyName]) {
          formState = formGroupStates[propertyName];
        }
        let formControl: DoubleAgentFormControl =
          <DoubleAgentFormControl>new FormControl(formState, this.formControlValidatorBuilder.build(jsonSchema, propertyName));
        formControl.jsonSchemaProperty = jsonSchema.properties[propertyName];
        formGroupConfig[propertyName] = formControl;
      }
    });

    // cria uma instância do FormGroup a partir da configuração construída
    formGroup = <any>this.formBuilder.group(formGroupConfig);

    // subscribe to valueChange of control if it has valdiateOnChange ui keyword
    _.each(formGroup.controls, (formControl: DoubleAgentFormControl) => {
      if (formControl.jsonSchemaProperty['ui'] && formControl.jsonSchemaProperty['ui']['validateOnChange']) {
        formControl.valueChanges.subscribe(() => {
          _.each(formControl.jsonSchemaProperty['ui']['validateOnChange'], (propertyToValidate) => {
            if (formGroup.controls[propertyToValidate]) {
              formGroup.controls[propertyToValidate].updateValueAndValidity({ onlySelf: true });
            }
          });
        });
      }
    });

    // construir validador do FormGroup (keywords do objeto)
    this.addKeywordsValidator(jsonSchema, formGroup);

    formGroup.jsonSchema = jsonSchema;

    // retorna o Form Group
    return formGroup;
  }

  private addKeywordsValidator(schema: JsonSchema, formGroup: FormGroup) {
    let keywords = this.doubleAgentValidator.getKeywords(schema);

    let validator = this.buildAngularFormGroupValidator(schema.id, keywords, formGroup);

    formGroup.setValidators([validator]);
  }

  buildAngularFormGroupValidator(schemaName: string, keywords: string[], formGroup: FormGroup): ValidatorFn {
    return (control: AbstractControl) => {
      let validationResult = {
        jsonSchema: null
      };


      let data = formGroup.value;

      // runs the validation
      let result = this.doubleAgentValidator.validate(schemaName, data);

      if (result.hasErrors) {
        let errorsOfKeyword = result.errors.filter((error) => {
          return _.includes(keywords, error.keyword);
        });
        if (errorsOfKeyword.length > 0) {
          validationResult.jsonSchema = {
            errors: errorsOfKeyword
          };
          return validationResult;
        }
      }
      // retorna null no caso de não ter erros de validacao
      return null;
    };
  }

}
