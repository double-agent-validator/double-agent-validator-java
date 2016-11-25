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

### 1. Install the package in your application:


```
npm i --save double-agent-validator
```


### 2. In your AppModule initialization inject a factory to get the validation script from the backend and fill-in the DoubleAgentValdiator service with the schemas, keywords and formats.


```typescript


import {  NgModule } from '@angular/core';
import { DoubleAgentValidatorModule, DOUBLE_AGENT_VALIDATOR_SCHEMA_URL, DOUBLE_AGENT_VALIDATOR_SCHEMA_NS} from 'double-agent-validator';

let url = 'http://localhost:8080/schemas';
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

#### Great!!! You just did it, now the following services are available on your Angular 2 App:

##### DoubleAgentValidatorService

This class allow you to validate some data in a service layer using its `validate` method, which checks some data
againts an specific schema you pass to the service.


Your service will be something like the example bellow:

```typescript

import { DoubleAgentValidator } from 'double-agent-validator';
import { ValidationResult } from 'double-agent-validator/models';

@Injectable()
class MyService {
  constructor(private doubleAgentValidator: DoubleAgentValidator) {

  }


  validateContribuinte(): ValidationResult {
    /***
    // returns something like this
    {
      hasErrors: true;
      errors: [
        keyword: 'required',
        dataPath: '.id',
        message: 'field is missing'
      ];
    }
    */
    return this.doubleAgentValidator.validate('contribuinte-v1', data);
  }
}
```



##### DoubleAgentFormGroupBuilder

This class can be used to build FormGroup containing the controls representing each property in the schema including the respective validators.


**Example:**

```typescript
import { DoubleAgentFormGroupBuilder } from 'double-agent-validator';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'my-form',
  template: `
  <form [formGroup]="formGroup">
    <div class="form-group">
      <label for="nome">Nome: </label>
      <input type="text" id="nome" formControlName="nome"> 
    </div>
    <!-- your another controls for the others properties goes here too -->
  </form>`
})
export class MyFormComponent {
    private shemaName = 'contribuinte-v1';
    private formGroup: FormGroup;
    constructor(private doubleAgentFormGroupBuilder: DoubleAgentFormGroupBuilder) {
      this.formGroup = doubleAgentFormGroupBuilder.build(this.schemaName);
    }
}
```


## TODO

- Test coverage

- Better isolation on validators execution

- Provide the service to allow error messages mapping

- Website to share the library api documentation  
