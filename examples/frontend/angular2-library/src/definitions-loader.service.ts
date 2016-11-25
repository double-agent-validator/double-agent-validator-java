
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
  private _ajv: ajvNsAndConstructor.Ajv = new ajvNsAndConstructor({allErrors: true, v5: true});

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

  private loadScript(window: Window, script: string, schemas: string[]): Promise<ajvNsAndConstructor.Ajv> {
    return new Promise<ajvNsAndConstructor.Ajv>((resolve, reject) => {
      try {
        let loadSchemaCall = (schemas.length === 1)
          ? `DoubleAgent.JsonSchemaValidator.load(${schemas[0]}, ajv);`
          : `DoubleAgent.JsonSchemaValidator.loadMultiple([${schemas.join(',')}], ajv);`;
        window['ajv'] = this.ajv;
        window['_'] = _;
        window.document.write(`
          <script>
              ${script}
              ${loadSchemaCall}
          </script>
        `);
        resolve(this.ajv);
      } catch (e) {
        reject(e);
      }
    });

  }
}
