import { Inject, Injectable } from '@angular/core';
import { RemoteLoader } from '../models/remote-loader';
import { DoubleAgentValidator } from '../validator.service';
import { DoubleAgentValidatorNg2Factory } from '../ng2-factory.service';
import { DOUBLE_AGENT_VALIDATOR_SCHEMA_URL } from '../validator.module';

/**
 * To be used in tests for Angular applications
 * We can rely on mechanisms like webpack raw-loader to read the script from the disk and pass it directly
 * through the OpaqueToken DOUBLE_AGENT_VALIDATOR_SCHEMA_URL. This way we can run tests without the need of an http request
 * @export
 * @class InTestRawLoader
 * @implements {RemoteLoader}
* */
@Injectable()
export class InTestRawLoader implements RemoteLoader {

  constructor(
    @Inject(DOUBLE_AGENT_VALIDATOR_SCHEMA_URL) doubleAgentScriptContent: string,
    doubleAgentValidator: DoubleAgentValidator) {
    let daFactory = new DoubleAgentValidatorNg2Factory(doubleAgentValidator, this);
    daFactory.load(doubleAgentScriptContent).then(() => { });
  }
  getScript(doubleAgentRawContent: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      resolve(doubleAgentRawContent);
    });
  }
}
