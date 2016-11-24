import { inject } from '@angular/core/testing';
import { ValidatorDefinitionsLoader } from './validator-definitions-loader.service';
import { Http } from '@angular/http';
import { DoubleAgentValidator } from './double-agent-validator.service';

describe('ValidatorDefinitionsLoader', () => {
  let loader: ValidatorDefinitionsLoader;
  let doubleAgentValidator: DoubleAgentValidator;

  beforeEach(inject([Http, DoubleAgentValidator], (http: Http, _doubleAgentValidator: DoubleAgentValidator) => {
    loader = new ValidatorDefinitionsLoader(http, _doubleAgentValidator);
    doubleAgentValidator = _doubleAgentValidator;
  }));

  it('loads script from remote module', (done) => {
    loader.load('http://localhost:8080/validacao', ['DoubleAgent.Example.JsonSchemaValidator']).then(() => {
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
