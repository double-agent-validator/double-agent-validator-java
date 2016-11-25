import { ValidationResult } from './models';
import * as ajvNsAndConstructor from 'ajv';
export declare class DoubleAgentValidator {
    private _ajv;
    private noErrorResult;
    constructor(_ajv: ajvNsAndConstructor.Ajv);
    readonly ajv: ajvNsAndConstructor.Ajv;
    validate(schemaName: string, data: any): ValidationResult;
    readonly schemas: string[];
}
