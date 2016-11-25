DoubleAgentValidator
=======

This package serves as complement to the java library called doubleagentvalidator.

This is a javascript library which allow to reuse the same json schemas used in the backend rest application to validates the data at the frontend.

This libs depends on:

* [ajv]()
* [lodash]()
* [angular2]()


How to use:
-------- 


In your AppModule initialization inject a factory to get the validation script from the backend and fill-in the DoubleAgentValdiator service with the schemas, keywords and formats.


```typescript


import {  NgModule } from '@angular/core';
import { DoubleAgentValidatorModule, DOUBLE_AGENT_VALIDATOR_SCHEMA_URL, DOUBLE_AGENT_VALIDATOR_SCHEMA_NS} from 'double-agent-validator';

let url = 'http://localhost:8080/validacao';
let schemaNamespaces = ['DoubleAgent.Example.JsonSchemaValidator'];

@NgModule(
  {
    imports: [ DoubleAgentValidatorModule ],
    providers: [
      {
        provide: DOUBLE_AGENT_VALIDATOR_SCHEMA_URL,
        useValue: url
      },
      {
        provide: DOUBLE_AGENT_VALIDATOR_SCHEMA_NS,
        useValue: schemaNamespaces
      }
    ]
  }
)
export class AppModule { }
``` 
