import { DoubleAgentValidator } from './validator.service';
import { ValidatorDefinitionsLoader } from './definitions-loader.service';
import { Injectable, Injector } from '@angular/core';

import { DOUBLE_AGENT_VALIDATOR_SCHEMA_URL } from './validator.module';
import { RemoteLoader } from './models/remote-loader';

/**
 *
 * This classs provide a facility to load json schema definitions into a DoubleAgentValidator instance and provide it
 * to Angular Dependency Injection
 * @export
 * @class DoubleAgentValidatorNg2Factory
 */

@Injectable()
export class DoubleAgentValidatorNg2Factory {

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
  static factoryFn(injector: Injector, factory: DoubleAgentValidatorNg2Factory) {
    // return (): Promise<void> => {
    let url: string = injector.get(DOUBLE_AGENT_VALIDATOR_SCHEMA_URL);
    return new Promise<void>((resolve, reject) => {
      let errors = null;
      if (url == null) {
        errors = 'DoubleAgentValidator Module needs an url provided through the DOUBLE_AGENT_VALIDATOR_SCHEMA_URL token';
      }
      if (errors) {
        reject(errors);
      }
      factory.load(url).then(() => resolve()).catch(() => reject());
    });
    // }

  }

  /**
   * Creates an instance of DoubleAgentValidatorNg2Factory.
   *
   * @param {DoubleAgentValidator} doubleAgentValidator
   * @param {remoteLoader} the remoteLoader which will be used to load the validation scripts
   *
   * @memberOf DoubleAgentValidatorNg2Factory
   */
  constructor(
    private doubleAgentValidator: DoubleAgentValidator,
    private remoteLoader: RemoteLoader) {
  }

  /**
   * Loads a script from a url, parses it and load into the ajv object.
   * At this moment is using a iframe to isolate the parse/evaluate of the code.
   * Maybe it would useful have a strategy loading using web worker
   * @param {string} url
   * @returns {Promise<void>}
   *
   * @memberOf DoubleAgentValidatorNg2Factory
   */
  load(url: string): Promise<void> {
    let validationsLoader = new ValidatorDefinitionsLoader(this.remoteLoader);
    let iframe = document.createElement('iframe');
    iframe.id = 'DoubleAgentValidator';
    iframe.border = '0';
    iframe.src = 'about:blank';
    iframe.style.background = 'transparent';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    (<any>iframe).sandbox = 'allow-scripts allow-same-origin allow-modals';
    document.body.appendChild(iframe);
    let window = iframe.contentWindow;
    return new Promise<void>((resolve, reject) => {
      validationsLoader.load(window, url).then(() => {
        this.doubleAgentValidator['scriptContext'] = window;
        window['DoubleAgentValidator'] = this.doubleAgentValidator;
        this.doubleAgentValidator['_notifyReady']();
        resolve(null);
      },
        (e) => {
          reject('Could not create the DoubleAgentValidator instance: ' + e);
        });
    });
  }

}
