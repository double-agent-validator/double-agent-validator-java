import { DoubleAgentValidator } from './validator.service';
import { Injector } from '@angular/core';
import { RemoteLoader } from './models/remote-loader';
/**
 *
 * This classs provide a facility to load json schema definitions into a DoubleAgentValidator instance and provide it
 * to Angular Dependency Injection
 * @export
 * @class DoubleAgentValidatorNg2Factory
 */
export declare class DoubleAgentValidatorNg2Factory {
    private doubleAgentValidator;
    private remoteLoader;
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
     * @param {DoubleAgentValidator} doubleAgentValidator
     * @param {remoteLoader} the remoteLoader which will be used to load the validation scripts
     *
     * @memberOf DoubleAgentValidatorNg2Factory
     */
    constructor(doubleAgentValidator: DoubleAgentValidator, remoteLoader: RemoteLoader);
    /**
     * Loads a script from a url, parses it and load into the ajv object.
     * At this moment is using a iframe to isolate the parse/evaluate of the code.
     * Maybe it would useful have a strategy loading using web worker
     * @param {string} url
     * @returns {Promise<void>}
     *
     * @memberOf DoubleAgentValidatorNg2Factory
     */
    load(url: string): Promise<void>;
}
