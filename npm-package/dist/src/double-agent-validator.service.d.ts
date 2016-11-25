import { ValidationResult } from './models';
import * as ajvNsAndConstructor from 'ajv';
export declare class DoubleAgentValidator {
    ajv: ajvNsAndConstructor.Ajv;
    private noErrorResult;
    constructor(ajv: ajvNsAndConstructor.Ajv);
    validate(schemaName: string, data: any): ValidationResult;
    readonly schemas: string[];
}
