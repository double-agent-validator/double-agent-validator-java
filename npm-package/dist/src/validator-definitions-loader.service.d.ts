import { DoubleAgentValidator } from './double-agent-validator.service';
import { RemoteLoader } from './models/remote-loader';
export declare class ValidatorDefinitionsLoader {
    private remoteLoader;
    private doubleAgentValidator;
    constructor(remoteLoader: RemoteLoader, doubleAgentValidator: DoubleAgentValidator);
    load(window: Window, url: string, namespaces: string[]): Promise<void>;
    private loadScript(window, script, schemas);
}
