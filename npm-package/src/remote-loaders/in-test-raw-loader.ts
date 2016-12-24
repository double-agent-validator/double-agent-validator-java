import { RemoteLoader } from '../models/remote-loader';

/**
 * To be used in tests for Angular applications
 * We can rely on mechanisms like webpack raw-loader to read the script from the disk and pass it directly
 * through the OpaqueToken DOUBLE_AGENT_VALIDATOR_SCHEMA_URL. This way we can run tests without the need of an http request
 * @export
 * @class InTestRawLoader
 * @implements {RemoteLoader}
* */
export class InTestRawLoader implements RemoteLoader {
  getScript(doubleAgentRawContent: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      resolve(doubleAgentRawContent);
    });
  }
}
