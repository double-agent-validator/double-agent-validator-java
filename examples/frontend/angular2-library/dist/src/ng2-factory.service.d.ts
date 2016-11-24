import { Http } from '@angular/http';
import { DoubleAgentValidator } from './validator.service';
export declare class DoubleAgentValidatorNg2Factory {
    private http;
    private doubleAgentValidator;
    constructor(http: Http, doubleAgentValidator: DoubleAgentValidator);
    load(url: string, namespaces: string[]): Promise<void>;
}
