import { ValidatorDefinitionsLoader } from './definitions-loader.service';
import { DoubleAgentValidator } from './validator.service';
import * as nock from 'nock';
import { NodeRemoteLoader } from './remote-loaders/node-remote-loader';
import * as fs from 'fs';
import * as path from 'path';
import * as jsdomNS from 'jsdom';


import { expect } from 'chai';

describe('ValidatorDefinitionsLoader', () => {
  let doubleAgentValidator: DoubleAgentValidator;
  let loader: ValidatorDefinitionsLoader;
  let remoteLoader = new NodeRemoteLoader();
  let jsdom = jsdomNS.jsdom;
  jsdomNS.createVirtualConsole().sendTo(console);

  let window: Window;
  beforeEach(() => {
    loader = new ValidatorDefinitionsLoader(remoteLoader);
    window = jsdom('<html><body>Página de Teste</body></html>', { url: 'http://localhost' }).defaultView;

    // mock request
    let scriptContent = fs.readFileSync(path.resolve(__dirname, '../mock-data/script-test.js')).toString();
    nock('http://localhost:8080')
      .get('/validacao')
      .reply(200, scriptContent)
      ;
  });

  it('loads script from remote module', (done) => {
    loader.load(window, 'http://localhost:8080/validacao', ['DoubleAgent.Example.JsonSchemaValidator']).then((ajv) => {
      doubleAgentValidator = new DoubleAgentValidator(ajv);
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

