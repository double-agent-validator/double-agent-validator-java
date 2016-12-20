import { DoubleAgentValidator } from './validator.service';
import { FormControlName } from '@angular/forms';
export declare class DoubleAgentValueVerifier {
    private doubleAgentValidator;
    constructor(doubleAgentValidator: DoubleAgentValidator);
    filter(formControlName: FormControlName, value: any): any;
}
