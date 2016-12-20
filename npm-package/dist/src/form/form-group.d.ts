import { FormGroup } from '@angular/forms';
import { JsonSchema } from '../models/schema';
export interface DoubleAgentFormGroup extends FormGroup {
    jsonSchema: JsonSchema;
}
