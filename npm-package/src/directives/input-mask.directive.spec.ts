import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { expect } from 'chai';
import { InputMaskDirective } from './input-mask.directive';
import { DoubleAgentFormGroupBuilder } from '../form/form-group-builder.service';
import { DoubleAgentValidator } from '../validator.service';
import { DoubleAgentFormControlValidatorBuilder } from '../form/form-control-validator-builder.service';
import * as jsdomNS from 'jsdom';
import { getMockForMask, getDoubleAgentMockedScriptContent } from './test-helpers';

let scriptContent = getDoubleAgentMockedScriptContent();

let jsdom = jsdomNS.jsdom;
jsdomNS.createVirtualConsole().sendTo(console);
let window: Window;

let doubleAgentValidator: DoubleAgentValidator;

describe(`InputMaskDirective`, () => {


  @Component({
    selector: 'not-used',
    template: `
    <form [formGroup]=form>
      <input type="text" formControlName="ni" >
    </form>
    `
  })
  class MyComponent {
    form: FormGroup;
    constructor(doubleAgentFormGroupBuilder: DoubleAgentFormGroupBuilder) {
      this.form = doubleAgentFormGroupBuilder.build('contribuinte-v1');
    }

    get niControl() {
      return this.form.controls['ni'];
    }
  }


  let fixture: ComponentFixture<MyComponent>;

  before((done) => {
    window = jsdom('<html><body>Página de Teste<script>' + scriptContent
      + '</script></body></html>', { url: 'http://localhost' }).defaultView;
    window.onload = (ev) => {
      doubleAgentValidator = new DoubleAgentValidator();
      doubleAgentValidator['scriptContext'] = window;
      done();
    };
  });
  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        MyComponent,
        InputMaskDirective
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: DoubleAgentValidator, useValue: doubleAgentValidator },
        DoubleAgentFormGroupBuilder,
        DoubleAgentFormControlValidatorBuilder
      ]
    });
    fixture = TestBed.createComponent(MyComponent);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('ni control should be invalid when value is empty', () => {
    let niControl = fixture.componentInstance.niControl;
    niControl.setValue('');
    expect(niControl.invalid).to.eq(true);
  });

  it('ni control should be valid when i pass a cpf value', () => {
    let niControl = fixture.componentInstance.niControl;
    niControl.setValue('111.111.111-21');
    expect(niControl.valid).to.eq(true);
  });

  it('ni control should be valid when i pass a cnpj value', () => {
    let niControl = fixture.componentInstance.niControl;
    niControl.setValue('00.000.000/0001-91');
    expect(niControl.valid).to.eq(true);
  });

  it('mask cnpj value', () => {
    fixture.detectChanges();
    let niControlWithMask = getMockForMask(fixture, 'ni', null);
    niControlWithMask.triggerInput('00000000000191');
    fixture.detectChanges();
    expect(niControlWithMask.writeValueStub.calledWith('00.000.000/0001-91')).to.be.true;
  });

  it('should be valid after mask cnpj', () => {
    fixture.detectChanges();
    let niControlWithMask = getMockForMask(fixture, 'ni', null);
    niControlWithMask.triggerInput('00000000000191');
    fixture.detectChanges();
    expect(fixture.componentInstance.niControl.valid).to.eq(true);
  });

  it('mask cpf value', () => {
    fixture.detectChanges();
    let niControlWithMask = getMockForMask(fixture, 'ni', null);
    niControlWithMask.triggerInput('00000000191');
    fixture.detectChanges();
    expect(niControlWithMask.writeValueStub.calledWith('000.000.001-91')).to.be.true;
  });

  it('should be valid after mask cpf', () => {
    fixture.detectChanges();
    let niControlWithMask = getMockForMask(fixture, 'ni', null);
    niControlWithMask.triggerInput('00000000191');
    fixture.detectChanges();
    expect(fixture.componentInstance.niControl.valid).to.eq(true);
  });

});
