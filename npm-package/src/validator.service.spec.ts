import { DoubleAgentValidator } from './validator.service';
import Ajv = require('ajv');
import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import * as jsdomNS from 'jsdom';

import * as _ from 'lodash';

describe('DoubleAgentValidator', () => {
  let subject: DoubleAgentValidator;
  let jsdom = jsdomNS.jsdom;
  jsdomNS.createVirtualConsole().sendTo(console);
  let scriptContent = fs.readFileSync(path.resolve(__dirname, '../mock-data/script-test.js')).toString();
  let window: Window;

  before((done) => {

    window = jsdom('<html><body>Página de Teste<script>' + scriptContent
      + '</script></body></html>', { url: 'http://localhost' }).defaultView;

    window.onload = (ev) => {

      subject = new DoubleAgentValidator();
      subject['scriptContext'] = window;
      done();
    };
  });



  it('hasErrors return true when validation fails', () => {
    expect(subject.validate('contribuinte-v1', {}).hasErrors).to.be.equal(true);
  });
});
