import { RemoteLoader } from './models/remote-loader';
import * as ajvNsAndConstructor from 'ajv';
export declare class ValidatorDefinitionsLoader {
    private remoteLoader;
    private _ajv;
    readonly ajv: ajvNsAndConstructor.Ajv;
    constructor(remoteLoader: RemoteLoader);
    load(window: Window, url: string, namespaces: string[]): Promise<ajvNsAndConstructor.Ajv>;
    private loadScript(window, script, schemas);
}
