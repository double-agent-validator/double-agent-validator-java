import { Http } from '@angular/http';
import { DoubleAgentValidator } from './validator.service';
import { Injector } from '@angular/core';
/**
 *
 * This classs provide a facility to load json schema definitions into a DoubleAgentValidator instance and provide it
 * to Angular Dependency Injection
 * @export
 * @class DoubleAgentValidatorNg2Factory
 */
export declare class DoubleAgentValidatorNg2Factory {
    private http;
    private doubleAgentValidator;
    /**
     * This static function is utilized as a provider Factory to builds the DoubleAgentValidator
     * instance filled with json schemas from an given url into the Angular2  dependency injection
     *
     * @static
     * @param {Injector} injector
     * @param {DoubleAgentValidatorNg2Factory} factory
     * @returns {Promise<void>}
     *
     * @memberOf DoubleAgentValidatorNg2Factory
     */
    static factoryFn(injector: Injector, factory: DoubleAgentValidatorNg2Factory): Promise<void>;
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
     * Loads a script from a url, parses it and load into the ajv object.
     * At this moment is using a iframe to isolate the parse/evaluate of the code.
     * Maybe it would useful have a strategy loading using web worker
     * @param {string} url
     * @param {string[]} namespaces
     * @returns {Promise<void>}
     *
     * @memberOf DoubleAgentValidatorNg2Factory
     */
    load(url: string, namespaces: string[]): Promise<void>;
}
