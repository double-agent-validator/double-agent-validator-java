
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { DoubleAgentValidator } from './double-agent-validator.service';

@Injectable()
export class ValidatorDefinitionsLoader {

  get headers() {
    return new Headers({ 'Accept': 'application/javascript, text/javascript' });
  }
  constructor(private http: Http, private doubleAgentValidator: DoubleAgentValidator) {

  }

  async getScript(url: string): Promise<Response> {
    return this.http.get(url, {
      headers: this.headers
    }).toPromise();
  }

  async load(url: string, namespaces: string[]) {
    let response = await this.getScript(url);
    let scriptContent = response.text();

    await this.loadScript(scriptContent, namespaces);
  }

  async loadScript(script: string, schemas: string[]) {
    return new Promise<void>((resolve, reject) => {
      let iframe = document.createElement('iframe');
      iframe.style.border = '0px';
      iframe.style.width = '0px';
      iframe.style.height = '1px';
      document.appendChild(iframe);

      window['ajv'] = this.doubleAgentValidator['ajv'];
      let loadSchemaCall = (schemas.length === 1)
            ? `DoubleAgent.JsonSchemaValidator.load(${schemas[0]}, ajv);`
            : `DoubleAgent.JsonSchemaValidator.loadMultiple(${schemas.join(',')}, ajv);`;
      iframe.contentDocument.write(`
        <script>
          (function(ajv) {ValidatorDefinitionsLoader
            ${script};

            ${loadSchemaCall};
          })(window.parent['ajv']);
        <script>
      `);
      resolve();
    });

  }
}
