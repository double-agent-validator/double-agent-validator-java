import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

let url = 'http://localhost:4200/api/validacao';
let schemaNamespaces = ['DoubleAgent.Example.JsonSchemaValidator'];

import { DoubleAgentValidatorModule, DOUBLE_AGENT_VALIDATOR_SCHEMA_NS, DOUBLE_AGENT_VALIDATOR_SCHEMA_URL }
  from 'double-agent-validator';

  console.log('DOUBLE AGENT MODULE', DoubleAgentValidatorModule);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DoubleAgentValidatorModule,
    CoreModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      {
        provide: DOUBLE_AGENT_VALIDATOR_SCHEMA_URL,
        useValue: url
      },
      {
        provide: DOUBLE_AGENT_VALIDATOR_SCHEMA_NS,
        useValue: schemaNamespaces
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
