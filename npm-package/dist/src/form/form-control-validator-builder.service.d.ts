import { ValidatorFn } from '@angular/forms';
import { JsonSchema } from '../models/schema/json-schema';
import { DoubleAgentValidator } from '../validator.service';
export declare class DoubleAgentFormControlValidatorBuilder {
    private doubleAgentValidator;
    constructor(doubleAgentValidator: DoubleAgentValidator);
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
    build(schema: JsonSchema, property: string): ValidatorFn;
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
    buildAngularValidator(schemaName: string, propertyOrFormData?: string | {}): ValidatorFn;
}
