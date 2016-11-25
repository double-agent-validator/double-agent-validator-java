
import { Injectable } from '@angular/core';
import { RemoteLoader } from './models/remote-loader';
import * as _ from 'lodash';
import * as ajvNsAndConstructor from 'ajv';

/**
 *
 * This class loads a script from an url, parses it and fill an ajv instance with theirs definitions
 * @export
 * @class ValidatorDefinitionsLoader
 */
@Injectable()
export class ValidatorDefinitionsLoader {
  private _ajv: ajvNsAndConstructor.Ajv = new ajvNsAndConstructor({ allErrors: true, v5: true });

  /**
   *
   *
   * @readonly
   * @type {ajvNsAndConstructor.Ajv}
   * @memberOf ValidatorDefinitionsLoader
   */
  get ajv(): ajvNsAndConstructor.Ajv {
    return this._ajv;
  }

  /**
   * Creates an instance of ValidatorDefinitionsLoader.
   *
   * @param {RemoteLoader} remoteLoader
   *
   * @memberOf ValidatorDefinitionsLoader
   */
  constructor(private remoteLoader: RemoteLoader) {
  }

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
  load(window: Window, url: string, namespaces: string[]): Promise<ajvNsAndConstructor.Ajv> {
    return this.remoteLoader.getScript(url).then((scriptContent) => {
      return this.loadScript(window, scriptContent, namespaces);
    });
  }

  private loadScript(iframeWindow: Window, script: string, schemas: string[]): Promise<ajvNsAndConstructor.Ajv> {
    return new Promise<ajvNsAndConstructor.Ajv>((resolve, reject) => {
      try {
        let loadSchemaCall = (schemas.length === 1)
          ? `DoubleAgent.JsonSchemaValidator.load(${schemas[0]}, ajv);`
          : `DoubleAgent.JsonSchemaValidator.loadMultiple([${schemas.join(',')}], ajv);`;
        iframeWindow['ajv'] = this.ajv;
        iframeWindow['_'] = _;

        let qtySchemas = _.keys(this.ajv['_schemas']).length;

        iframeWindow['DoubleAgentValidator_SCHEMAS_QTY'] = qtySchemas;

        // handler to check any error on script evalution
        iframeWindow['DoubleAgentValidatorErrorHandler'] = (e) => {
          reject(e);
        };

        // handler to check if schemas were loaded into ajv
        iframeWindow['DoubleAgentValidatorCheckSuccess'] = () => {
          if (! (_.keys(iframeWindow['ajv']['_schemas']).length > iframeWindow['DoubleAgentValidator_SCHEMAS_QTY'])) {
            // window.parent.alert('Application could not be loaded. No schemas were loaded!');
            reject('Application could not be loaded. No schemas were loaded!');
          } else {
            console.log('DoubleAgentValidator => ', 'SUCESSFULL CHECk!!!!!!!!!!!!!!!!!!!!!!!!!');
          }
        };
        iframeWindow.document.write(`
          <script>
            try {
              ${script}
              ${loadSchemaCall};
              DoubleAgentValidatorCheckSuccess();
            } catch(e) {
              DoubleAgentValidatorErrorHandler(e);
            }
          </script>
        `);
        resolve(this.ajv);
      } catch (e) {
        reject(e);
      }
    });

  }
}
