import * as ajv from 'ajv';

export interface ValidationResult {
    hasErrors: boolean;
    errors?: ajv.ErrorObject[];
}
