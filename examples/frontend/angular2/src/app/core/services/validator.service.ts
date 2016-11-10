import { Injectable, Inject, OpaqueToken } from '@angular/core';
import * as Ajv from 'ajv';
import * as _ from 'lodash';
import { ValidationResult } from '../../shared/models/validation-result';

import { FormGroup, FormBuilder, ValidatorFn, Validators, AbstractControl, FormControl } from '@angular/forms';

// import { FormControlCollection } from '../../shared/models/form-control-collection';

import { JsonSchema } from '../../shared/models/json-schema';

declare var DoubleAgent: any;

let NO_ERROR_OBJECT: ValidationResult = { hasErrors: false };

export const VALIDATORS_NS = new OpaqueToken('VALIDATORS_NS');

window['ajv'] = new Ajv({ allErrors: true, verbose: false });

declare var ajv: Ajv.Ajv;

window['ajvInitialized'] = false;

@Injectable()
export class ValidatorService {

  initialized = false;

  constructor(
    @Inject(VALIDATORS_NS) private validatorNamespaces,
    private builder: FormBuilder
  ) {
    if (!window['ajvInitialized']) {
      this.init();
      window['ajvInitialized'] = true;
    }
  }

  init() {
    this.loadValidatorsData();
    console.log('Validators initialized');
  }

  /**
   * Obtem referencia aos objetos de namespaces de validacao a partir da injeção do
   * valor do token VALIDATORS_NS
   */
  get namespaces(): Object[] {
    return _.map(this.validatorNamespaces, (nsName: string) => {
      let nsObject = _.result(window, nsName.split('.'));
      return nsObject ? nsObject : null;
    });
  }

  loadValidatorsData() {

      _.each(this.namespaces, (namespace) => {
        DoubleAgent.JsonSchemaValidator.load(namespace);
      });
      this.initialized = true;
    
  }

  /**
   * Esta função cria o validador Angular correspondente a um schema e opcionalmente uma propriedade
   *
   * @param {string} schema
   * @param {number} version
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

      if (this.initialized) {
        // constrói o objeto com o dado a ser validado
        let data = {};
        if (_.isString(propertyOrFormData)) {
          data[propertyOrFormData] = control.value;
        } else {
          data = propertyOrFormData;
        }

        console.log('Validating data', data);
        // executa a validação
        let result = this.validate(schemaName, data);

        if (result.hasErrors) {
          // se o nome de uma propriedade foi passada, só retorna erro se houver erros referentes a esta propriedade
          if (_.isString(propertyOrFormData)) {
            let errorsOfProperty = result.errors.filter((error) => {
              return error.dataPath.match(`\.${propertyOrFormData}`);
            });
            if (errorsOfProperty.length > 0) {
              validationResult.jsonSchema = {
                errors:  errorsOfProperty
              };
              return validationResult;
            }
          } else {
            // se não teve uma propriedade passada retorna erro com todos os erros passados
            validationResult.jsonSchema = {
              errors: result.errors
            };
            return validationResult;
          }
        }
        // retorna null no caso de não ter erros de validacao
        return null;

      }

      return validationResult;
    }
  }

  private buildSchemaName(schema: string, version: number) {
    return `${schema}-v${version}`;
  }

  schemaByNameAndVersion(schema: string, version: number): JsonSchema {
    return <JsonSchema>ajv.getSchema(this.buildSchemaName(schema, version)).schema;
  }

  validate(schemaName: string, data: any, dataPath?: string): ValidationResult {
    if (!this.initialized) {
      throw new Error('Validation service was not initialized correctly!');
    }
    let validateFn = ajv.compile({
      '$ref': schemaName
    });

    let result = validateFn(data, dataPath);

    if (!result) {
      return {
        hasErrors: true,
        errors: validateFn.errors
      };
    } else {
      return NO_ERROR_OBJECT;
    }
  }

  /**
   * Constrói um formGroup contendo todos os campos definindos no JsonSchema
   */
  buildFormGroup(schemaName: string, version: number): FormGroup {

    // TODO validar se o esquema existe e retornar erro apropriado
    let jsonSchema: JsonSchema = this.schemaByNameAndVersion(schemaName, version);
    let formGroup: FormGroup;
    let formGroupConfig = {};

    // TODO construir validador do FormGroup (keywords do objeto)

    // // 
    // let contribuinte = {
    //   cnpj: '00000000000191',
    //   nome: 'BB',
    //   _externalChecks: {
    //     niAtivoBaseRFB: enum[null, 'S', 'N']
    //   }
    // }

    // let schema = {
    //   type: 'object',
    //   id: 'contribuinte-v1',
    //   checarBaseRFB: true,
    //   properties: {
    //     id: {
    //       type: 'number'
    //     },
    //     ni: {
    //       type: 'strig',
    //       format: 'cnpj'
    //     }
    //   }
    // }

    // let keywords = [{
    //   checarBaseRFB: function(sch, data) {
    //     if (data._externalChecks && data._externalChecks['niAtivoBaseRFB'] == 'S') {

    //     }
    //   }
    // }]

    



    // percorre os atributos definidos no jsonSchema, adicionando um FormControl com os respectivos
    // validadores para cada campo no objeto formGroupConfig
    _.each(jsonSchema.properties, (attribute, attributeName) => {
      // TODO get state value from property default
      formGroupConfig[attributeName] = new FormControl('', this.buildValidatorsFor(jsonSchema, attributeName));
    });


    console.log('formGroupConfig', formGroupConfig);
    // cria uma instância do FormGroup a partir da configuração construída
    formGroup = this.builder.group(formGroupConfig);

    console.log('formGroup', formGroup);

    // retorna o Form Group
    return formGroup;
  }

 /**
   * Constrói a composição de validadores para o jsonSchema passado
   */
  private buildValidatorsFor(schema: JsonSchema, property: string) {
    let validators: ValidatorFn[] = [];
    console.log('SCHEMA and property', schema, property);
    if (schema.required && schema.required.indexOf(property) >= 0) {
      console.log('Required validator found', property);
      validators.push(Validators.required);
    }
    validators.push(this.buildAngularValidator(schema.id, property));
    return Validators.compose(validators);
  }
}
