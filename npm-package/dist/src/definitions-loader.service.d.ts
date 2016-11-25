import { RemoteLoader } from './models/remote-loader';
import * as ajvNsAndConstructor from 'ajv';
/**
 *
 * This class loads a script from an url, parses it and fill an ajv instance with theirs definitions
 * @export
 * @class ValidatorDefinitionsLoader
 */
export declare class ValidatorDefinitionsLoader {
    private remoteLoader;
    private _ajv;
    /**
     *
     *
     * @readonly
     * @type {ajvNsAndConstructor.Ajv}
     * @memberOf ValidatorDefinitionsLoader
     */
    readonly ajv: ajvNsAndConstructor.Ajv;
    /**
     * Creates an instance of ValidatorDefinitionsLoader.
     *
     * @param {RemoteLoader} remoteLoader
     *
     * @memberOf ValidatorDefinitionsLoader
     */
    constructor(remoteLoader: RemoteLoader);
    /**
     *
     *
     * @param {Window} window
     * @param {string} url
     * @param {string[]} namespaces
     * @returns {Promise<ajvNsAndConstructor.Ajv>}
     *
     * @memberOf ValidatorDefinitionsLoader
     */
    load(window: Window, url: string, namespaces: string[]): Promise<ajvNsAndConstructor.Ajv>;
    private loadScript(window, script, schemas);
}
