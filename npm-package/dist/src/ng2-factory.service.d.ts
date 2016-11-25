import { Http } from '@angular/http';
import { DoubleAgentValidator } from './validator.service';
/**
 *
 * This classs load the script with the schemas, formats and keywords from
 * a remote url, parses it in an isolated environment ('iframe') and
 * loads to the ajv object
 * @export
 * @class DoubleAgentValidatorNg2Factory
 */
export declare class DoubleAgentValidatorNg2Factory {
    private http;
    private doubleAgentValidator;
    /**
     * Creates an instance of DoubleAgentValidatorNg2Factory.
     *
     * @param {Http} http
     * @param {DoubleAgentValidator} doubleAgentValidator
     *
     * @memberOf DoubleAgentValidatorNg2Factory
     */
    constructor(http: Http, doubleAgentValidator: DoubleAgentValidator);
    /**
     * loads a script from a url, parses it and load into the ajv object
     *
     * @param {string} url
     * @param {string[]} namespaces
     * @returns {Promise<void>}
     *
     * @memberOf DoubleAgentValidatorNg2Factory
     */
    load(url: string, namespaces: string[]): Promise<void>;
}
