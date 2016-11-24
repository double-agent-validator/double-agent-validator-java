import { ValidatorDefinitionsLoader } from './definitions-loader.service';
import { DoubleAgentValidator } from './validator.service';

import { NodeRemoteLoader } from './remote-loaders/node-remote-loader';

import * as jsdomNS from 'jsdom';

import { expect } from 'chai';

describe('ValidatorDefinitionsLoader', () => {
  let doubleAgentValidator: DoubleAgentValidator;
  let loader: ValidatorDefinitionsLoader;
  let remoteLoader: NodeRemoteLoader = new NodeRemoteLoader();
  let jsdom = jsdomNS.jsdom;
  let window: Window;
  beforeEach(() => {
    loader = new ValidatorDefinitionsLoader(remoteLoader);
    window = jsdom('<html><body>Página de Teste</body></html>').defaultView;
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
