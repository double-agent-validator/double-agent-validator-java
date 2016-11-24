
import { Injectable } from '@angular/core';
import { RemoteLoader } from './models/remote-loader';
import * as _ from 'lodash';
import * as ajvNsAndConstructor from 'ajv';
@Injectable()
export class ValidatorDefinitionsLoader {
  private _ajv: ajvNsAndConstructor.Ajv = new ajvNsAndConstructor({allErrors: true, v5: true});

  get ajv(): ajvNsAndConstructor.Ajv {
    return this._ajv;
  }
  constructor(private remoteLoader: RemoteLoader) {
  }

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
              ${loadSchemaCall};
          </script>
        `);
        resolve(this.ajv);
      } catch (e) {
        reject(e);
      }
    });

  }
}
