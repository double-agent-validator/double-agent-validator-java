import { Http } from '@angular/http';
import { DoubleAgentValidator } from './validator.service';
import { Angular2RemoteLoader } from './remote-loaders/angular2-remote-loader';
import { ValidatorDefinitionsLoader } from './definitions-loader.service';
import { Injectable, Injector } from '@angular/core';
import * as ajvNsAndConstructor from 'ajv';
import { DOUBLE_AGENT_VALIDATOR_SCHEMA_URL, DOUBLE_AGENT_VALIDATOR_SCHEMA_NS } from './validator.module';

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
  static factoryFn(injector: Injector, factory: DoubleAgentValidatorNg2Factory): Promise<void>  {
        let url: string = injector.get(DOUBLE_AGENT_VALIDATOR_SCHEMA_URL);
        let namespaces: string[] = injector.get(DOUBLE_AGENT_VALIDATOR_SCHEMA_NS);
        return new Promise<void>((resolve, reject) => {
          console.log('VALUES', url, namespaces);
          let errors = null;
          if (url == null) {
            errors = 'DoubleAgentValidator Module needs an url provided through the DOUBLE_AGENT_VALIDATOR_SCHEMA_URL token';
          }
          if (namespaces == null) {
            errors = `${errors ? errors : ''} DoubleAgentValidator Module needs the
             namespaces provided through the DOUBLE_AGENT_VALIDATOR_SCHEMA_NS token`;
          }
          if (errors) {
            reject(errors);
          }
          return factory.load(url, namespaces);
        });
  }

  /**
   * Creates an instance of DoubleAgentValidatorNg2Factory.
   *
   * @param {Http} http
   * @param {DoubleAgentValidator} doubleAgentValidator
   *
   * @memberOf DoubleAgentValidatorNg2Factory
   */
  constructor(private http: Http, private doubleAgentValidator: DoubleAgentValidator) {
  }

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
  load(url: string, namespaces: string[]): Promise<void> {
    let remoteLoader = new Angular2RemoteLoader(this.http);
    let validationsLoader = new ValidatorDefinitionsLoader(remoteLoader);
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
      validationsLoader.load(window, url, namespaces).then((ajv: ajvNsAndConstructor.Ajv) => {
        this.doubleAgentValidator['_ajv'] = ajv;
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
