
import { Injectable } from '@angular/core';
import { DoubleAgentValidator } from './double-agent-validator.service';
import { RemoteLoader } from './models/remote-loader';

@Injectable()
export class ValidatorDefinitionsLoader {

  constructor(private remoteLoader: RemoteLoader, private doubleAgentValidator: DoubleAgentValidator) { }

  async load(window: Window, url: string, namespaces: string[]) {
    let scriptContent = await this.remoteLoader.getScript(url);
    return this.loadScript(window, scriptContent, namespaces);
  }

  private async loadScript(window: Window, script: string, schemas: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let loadSchemaCall = (schemas.length === 1)
        ? `DoubleAgent.JsonSchemaValidator.load(${schemas[0]}, ajv);`
        : `DoubleAgent.JsonSchemaValidator.loadMultiple([${schemas.join(',')}], ajv);`;
      // console.log(this.getSchemas(this.doubleAgentValidator));
      window['ajv'] = this.doubleAgentValidator.ajv;
      window['_'] = this.doubleAgentValidator._;
      window.document.write(`
        <script>
            ${script}
            ${loadSchemaCall};
            window['a'] = 1;
        </script>
      `);
      // console.log('A', window['a']);
      // console.log(this.getSchemas(this.doubleAgentValidator));
      resolve();
    });

  }

  private getSchemas(doubleAgentValidator: DoubleAgentValidator) {
    return doubleAgentValidator._.map(doubleAgentValidator.ajv['_schemas'], (schema) => schema['id']);
  }
}
