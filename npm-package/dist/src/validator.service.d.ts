import { ValidationResult } from './models';
import * as ajvNsAndConstructor from 'ajv';
/**
 *
 *
 * @export
 * @class DoubleAgentValidator
 */
export declare class DoubleAgentValidator {
    private _ajv;
    /**
     *
     *
     * @private
     * @type {ValidationResult}
     * @memberOf DoubleAgentValidator
     */
    private noErrorResult;
    /**
     * Creates an instance of DoubleAgentValidator.
     *
     * @param {ajvNsAndConstructor.Ajv} _ajv
     *
     * @memberOf DoubleAgentValidator
     */
    constructor(_ajv: ajvNsAndConstructor.Ajv);
    /**
     *
     *
     * @readonly
     * @type {ajvNsAndConstructor.Ajv}
     * @memberOf DoubleAgentValidator
     */
    readonly ajv: ajvNsAndConstructor.Ajv;
    /**
     *
     *
     * @param {string} schemaName
     * @param {*} data
     * @returns {ValidationResult}
     *
     * @memberOf DoubleAgentValidator
     */
    validate(schemaName: string, data: any): ValidationResult;
    /**
     *
     *
     * @readonly
     * @type {string[]}
     * @memberOf DoubleAgentValidator
     */
    readonly schemas: string[];
}
