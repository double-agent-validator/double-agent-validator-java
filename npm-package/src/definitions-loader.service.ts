
import { Injectable } from '@angular/core';
import { RemoteLoader } from './models/remote-loader';

/**
 *
 * This class loads a script from an url, parses it and fill an ajv instance with theirs definitions
 * @export
 * @class ValidatorDefinitionsLoader
 */
@Injectable()
export class ValidatorDefinitionsLoader {

  _window: Window;
  /**
   *
   *
   * @readonly
   * @type {ValidatorExecutionContext}
   * @memberOf ValidatorDefinitionsLoader
   */
  get validatorExecutionContext(): Window {
    return this._window;
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
   * @returns {Promise<ajvNsAndConstructor.Ajv>}
   *
   * @memberOf ValidatorDefinitionsLoader
   */
  load(window: Window, url: string): Promise<void> {
    return this.remoteLoader.getScript(url).then((scriptContent) => {
      return this.loadScript(window, scriptContent);
    });
  }

  private loadScript(window: Window, script: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        // handler to check any error on script evalution
        window['DoubleAgentValidatorErrorHandler'] = (e) => {
          reject(e);
        };

        window.document.write(`
          <script>
            try {
              ${script}
            } catch(e) {
              DoubleAgentValidatorErrorHandler(e);
            }
          </script>
        `);
        this._window = window;
        resolve(null);
      } catch (e) {
        reject(e);
      }
    });

  }
}
