import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { DoubleAgentValidator } from '../validator.service';
import { JsonSchema } from '../models/schema/json-schema';
import * as _ from 'lodash';
import { DoubleAgentFormControlValidatorBuilder } from './form-control-validator-builder.service';

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
  build(schemaName: string): FormGroup {

    // TODO validar se o esquema existe e retornar erro apropriado
    let jsonSchema: JsonSchema = this.doubleAgentValidator.getSchema(schemaName);
    let formGroup: FormGroup;
    let formGroupConfig = {};

    // percorre os atributos definidos no jsonSchema, adicionando um FormControl com os respectivos
    // validadores para cada campo no objeto formGroupConfig
    _.each(jsonSchema.properties, (attribute, attributeName) => {
      // TODO get state value from property default
      formGroupConfig[attributeName] = new FormControl('', this.formControlValidatorBuilder.build(jsonSchema, attributeName));
    });


    console.log('formGroupConfig', formGroupConfig);
    // cria uma instância do FormGroup a partir da configuração construída
    formGroup = this.formBuilder.group(formGroupConfig);

    console.log('formGroup', formGroup);

    // construir validador do FormGroup (keywords do objeto)
    this.addKeywordsValidator(jsonSchema, formGroup);


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
      console.log('Validating data', data);

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
