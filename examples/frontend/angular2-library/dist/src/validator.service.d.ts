import { ValidationResult } from './models';
import * as ajvNsAndConstructor from 'ajv';
export declare class DoubleAgentValidator {
    private noErrorResult;
    private _ajv;
    constructor();
    readonly ajv: ajvNsAndConstructor.Ajv;
    validate(schemaName: string, data: any): ValidationResult;
    readonly schemas: string[];
}
