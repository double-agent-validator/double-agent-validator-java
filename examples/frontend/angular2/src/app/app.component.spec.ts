/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  DoubleAgentValidator,
  RemoteLoader,
  InTestRawLoader,
  DOUBLE_AGENT_VALIDATOR_SCHEMA_URL,
  DoubleAgentValidatorNg2Factory,
  DoubleAgentFormControlValidatorBuilder,
  DoubleAgentFormGroupBuilder
} from 'double-agent-validator';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DoubleAgentValidatorModule } from 'double-agent-validator';
import { AppModule } from './app.module';


let doubleAgentScriptContent = require('raw-loader!../assets/schema.js');

describe('App: Abner', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
      imports: [
        AppModule
      ],
      providers: [

        { provide: DOUBLE_AGENT_VALIDATOR_SCHEMA_URL, useValue: doubleAgentScriptContent },
        {
          provide: RemoteLoader,
          useClass: InTestRawLoader
        }
      ]
    }).get(DoubleAgentValidator);
  }));

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should validate nascimento', async(() => {
    let fixture = TestBed.createComponent<AppComponent>(AppComponent);
    let app = fixture.componentInstance;
    app.ngOnInit();
    app.formContribuinte.controls['nascimento'].setValue('22/01/1984');
    expect(app.formContribuinte.controls['nascimento'].valid).toBeTruthy();
  }));

  it('nascimento is invalid if it is empty', async(() => {
    let fixture = TestBed.createComponent<AppComponent>(AppComponent);
    let app = fixture.componentInstance;
    app.ngOnInit();
    app.formContribuinte.controls['nascimento'].setValue('');
    expect(app.formContribuinte.controls['nascimento'].valid).toBeFalsy();
  }));
});


