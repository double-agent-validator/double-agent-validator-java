import { FormControl } from '@angular/forms';
import { JsonSchemaProperty } from '../models/schema/json-schema-property';

export interface DoubleAgentFormControl extends FormControl {
  jsonSchemaProperty: JsonSchemaProperty;
}
