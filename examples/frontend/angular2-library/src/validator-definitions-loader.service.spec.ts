import { ValidatorDefinitionsLoader } from './validator-definitions-loader.service';
import { DoubleAgentValidator } from './double-agent-validator.service';

import { NodeRemoteLoader } from './remote-loaders/node-remote-loader';
import * as jsdomNS from 'jsdom';
import * as jsdom from 'jsdom';

describe('ValidatorDefinitionsLoader', () => {
  let doubleAgentValidator: DoubleAgentValidator;
  let loader: ValidatorDefinitionsLoader;
  let remoteLoader: NodeRemoteLoader = new NodeRemoteLoader();
  let jsdom = jsdomNS.jsdom;
  let window: Window;
  beforeEach(() => {
    doubleAgentValidator = new DoubleAgentValidator();
    loader = new ValidatorDefinitionsLoader(remoteLoader, doubleAgentValidator);
    window = jsdom('<html><body>Página de Teste</body></html>').defaultView;
  });

  it('loads script from remote module', (done) => {
    loader.load(window, 'http://localhost:8080/validacao', ['DoubleAgent.Example.JsonSchemaValidator']).then(() => {
      doubleAgentValidator.validate('contribuinte-v1', {
        id: 1,
        nome: 'John',
        ni: '00000000000191',
        nacionalidade: 'brasileiro'
      });
      done();
    });
  });
});

