import { ValidatorDefinitionsLoader } from './definitions-loader.service';
import { DoubleAgentValidator } from './validator.service';
import * as nock from 'nock';
import { NodeRemoteLoader } from './remote-loaders/node-remote-loader';
// import * as fs from 'fs';
import * as path from 'path';
import * as jsdomNS from 'jsdom';


import { expect } from 'chai';
import { InTestRawLoader } from './remote-loaders/in-test-raw-loader';

let scriptContent = require('raw-loader!../mock-data/script-test.js');
let doubleAgentValidator = new DoubleAgentValidator();

describe('ValidatorDefinitionsLoader', () => {

  let loader: ValidatorDefinitionsLoader;
  let remoteLoader = new InTestRawLoader(scriptContent, doubleAgentValidator);
  let jsdom = jsdomNS.jsdom;
  jsdomNS.createVirtualConsole().sendTo(console);

  let window: Window;
  beforeEach(() => {
    loader = new ValidatorDefinitionsLoader(remoteLoader);
    window = jsdom('<html><body>Página de Teste</body></html>', { url: 'http://localhost' }).defaultView;
  });

  it('loads script from remote module', (done) => {
    loader.load(window, scriptContent).then(() => {
      doubleAgentValidator = new DoubleAgentValidator();
      doubleAgentValidator['scriptContext'] = window;
      let result = doubleAgentValidator.validate('contribuinte-v1', {
        id: 1,
        nome: 'John',
        ni: '00000000000191',
        nacionalidade: 'brasileiro'
      });
      expect(result.hasErrors).to.be.equal(false);


      done();
    });
  });
});

