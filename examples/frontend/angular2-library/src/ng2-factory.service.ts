import { Http } from '@angular/http';
import { DoubleAgentValidator } from './validator.service';
import { Angular2RemoteLoader } from './remote-loaders/angular2-remote-loader';
import { ValidatorDefinitionsLoader } from './definitions-loader.service';
import { Injectable } from '@angular/core';
import * as ajvNsAndConstructor from 'ajv';

@Injectable()
export class DoubleAgentValidatorNg2Factory {
  constructor(private http: Http, private doubleAgentValidator: DoubleAgentValidator) {
  }
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
    (<any>iframe).sandbox = 'allow-scripts allow-same-origin';
    document.body.appendChild(iframe);
    let window = iframe.contentWindow;
    return new Promise<void>((resolve, reject) => {
      validationsLoader.load(window, url, namespaces).then((ajv: ajvNsAndConstructor.Ajv) => {
        this.doubleAgentValidator['_ajv'] = ajv;
        window['DoubleAgentValidator'] = this.doubleAgentValidator;
        resolve(null);
      },
        (e) => {
          reject('coudl not create the DoubleAgentValidator instance: ' + e);
        });
    });
  }
}
