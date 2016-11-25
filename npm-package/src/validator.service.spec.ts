import { DoubleAgentValidator } from './validator.service';
import Ajv = require('ajv');
import { expect } from 'chai';

describe('DoubleAgentValidator', () => {
  let subject: DoubleAgentValidator;

  before(() => {
    subject = new DoubleAgentValidator(new Ajv({allErrors: true, v5: true}));

    subject.ajv.addFormat('cpf', /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/);
    subject.ajv.addFormat('cnpj', /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/);

    subject.ajv.addSchema({
      id: 'contribuinte',
      type: 'object',
      required: ['id', 'ni', 'nome'],
      properties: {
        'id': {
          type: 'number'
        },
        'ni': {
          type: 'string',
          format: 'cnpj'
        },
        'nome': {
          type: 'string'
        }
      }
    });
  });

  it('hasErrors return true when validation fails', () => {
    expect(subject.validate('contribuinte', {}).hasErrors).to.be.equal(true);
  });
});
