import { RemoteLoader } from './models/remote-loader';
/**
 *
 * This class loads a script from an url, parses it and fill an ajv instance with theirs definitions
 * @export
 * @class ValidatorDefinitionsLoader
 */
export declare class ValidatorDefinitionsLoader {
    private remoteLoader;
    _window: Window;
    /**
     *
     *
     * @readonly
     * @type {ValidatorExecutionContext}
     * @memberOf ValidatorDefinitionsLoader
     */
    readonly validatorExecutionContext: Window;
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
     * @returns {Promise<ajvNsAndConstructor.Ajv>}
     *
     * @memberOf ValidatorDefinitionsLoader
     */
    load(window: Window, url: string): Promise<void>;
    private loadScript(window, script);
}
