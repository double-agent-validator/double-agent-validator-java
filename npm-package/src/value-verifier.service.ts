import { Injectable } from '@angular/core';
import { DoubleAgentValidator } from './validator.service';
import { DoubleAgentFormGroup } from './form/form-group';
import { FormControlName } from '@angular/forms';

@Injectable()
export class DoubleAgentValueVerifier {
  constructor(
    private doubleAgentValidator: DoubleAgentValidator
  ) { }

  filter(formControlName: FormControlName, value: any): any {
    let schemaName = (<DoubleAgentFormGroup>formControlName.control.parent).parent['schemaName'];
    let propertyName = formControlName.name;

    let schema = this.doubleAgentValidator.getSchema(schemaName);
    let property = schema.properties[propertyName];

    if (property) {
      if (property['pattern'] || property['format']) {
        let formatName = property['format'];
        let pattern: RegExp = null;
        if (formatName) {
          pattern = this.doubleAgentValidator.getFormats[formatName];
        } else {
          pattern = property['pattern'];
        }

        if (pattern.test(value)) {
          return value;
        } else {
          return null;
        }
      }
      return value;
    }
  }
}
