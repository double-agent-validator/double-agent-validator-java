import { RemoteLoader } from '../models/remote-loader';
import { DoubleAgentValidator } from '../validator.service';
/**
 * To be used in tests for Angular applications
 * We can rely on mechanisms like webpack raw-loader to read the script from the disk and pass it directly
 * through the OpaqueToken DOUBLE_AGENT_VALIDATOR_SCHEMA_URL. This way we can run tests without the need of an http request
 * @export
 * @class InTestRawLoader
 * @implements {RemoteLoader}
* */
export declare class InTestRawLoader implements RemoteLoader {
    constructor(doubleAgentScriptContent: string, doubleAgentValidator: DoubleAgentValidator);
    getScript(doubleAgentRawContent: string): Promise<string>;
}
