import { Injectable } from '@angular/core';
import { ValidationResult } from './models';
import * as ajv from 'ajv';

@Injectable()
export class DoubleAgentValidator {
  private ajv: ajv.Ajv;
  private noErrorResult: ValidationResult = { hasErrors: false, errors: null };
  constructor() {
    this.ajv = new ajv({ allErrors: true, v5: true });
  }

  loadSchema(schemaName: string, schemaObj: any) {
    this.ajv.addSchema(schemaObj, schemaName);
  }

  loadKeyword(keywordName: string, metadata: any, fn: (schema: Object, parentSchema: Object) => ajv.ValidateFunction) {
    this.ajv.addKeyword(keywordName, {
      schema: metadata,
      compile: fn
    });
  }

  loadFormat(formatName: string, format: ajv.FormatDefinition) {
    this.ajv.addFormat(formatName, format);
  }

  validate(schemaName: string, data: any): ValidationResult {
    let result: boolean = this.ajv.validate(schemaName, data);

    if (result) {
      return this.noErrorResult;
    } else {
      return {
        hasErrors: true,
        errors: this.ajv.errors
      };
    }
  }

}
