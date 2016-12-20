import { ValidationResult } from './models';
import * as ajvNsAndConstructor from 'ajv';
import { JsonSchema } from './models/schema/json-schema';
import { ReplaySubject } from 'rxjs/ReplaySubject';
/**
 *
 *
 * @export
 * @class DoubleAgentValidator
 */
export declare class DoubleAgentValidator {
    private scriptContext;
    /**
     *
     *
     * @private
     * @type {ValidationResult}
     * @memberOf DoubleAgentValidator
     */
    private noErrorResult;
    isReady: ReplaySubject<void>;
    /**
     * Creates an instance of DoubleAgentValidator.
     *
     *
     * @memberOf DoubleAgentValidator
     */
    constructor();
    private _notifyReady();
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
    getSchema(schemaName: string): JsonSchema;
    /**
     *
     *
     * @param {JsonSchema} schema
     * @returns {string[]}
     *
     * @memberOf DoubleAgentValidator
     */
    getKeywords(schema: JsonSchema): string[];
    getFormats(): {};
    /**
    *
    *
    * @readonly
    * @type {string[]}
    * @memberOf DoubleAgentValidator
    */
    readonly schemasNames: string[];
}
