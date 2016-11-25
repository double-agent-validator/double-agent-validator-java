import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { DoubleAgentValidator } from '../validator.service';
import { DoubleAgentFormControlValidatorBuilder } from './form-control-validator-builder.service';
/**
 * This class allows creates a formGroup which contains all the fields represented in an given schema
 * each one containing it's own angular validators
 * @export
 * @class DoubleAgentFormGroupBuilder
 */
export declare class DoubleAgentFormGroupBuilder {
    private doubleAgentValidator;
    private formControlValidatorBuilder;
    private formBuilder;
    /**
     * Creates an instance of FormGroupBuilder.
     *
     * @param {DoubleAgentValidator} doubleAgentValidator
     * @param {FormBuilder} formBuilder
     *
     * @memberOf FormGroupBuilder
     */
    constructor(doubleAgentValidator: DoubleAgentValidator, formControlValidatorBuilder: DoubleAgentFormControlValidatorBuilder, formBuilder: FormBuilder);
    /**
     * Builds a FormGroup containing all the attributes defined in the jsonSchema
     *
     * @param {string} schemaName
     * @returns {FormGroup}
     *
     * @memberOf FormGroupBuilder
     */
    build(schemaName: string): FormGroup;
    private addKeywordsValidator(schema, formGroup);
    buildAngularFormGroupValidator(schemaName: string, keywords: string[], formGroup: FormGroup): ValidatorFn;
}
