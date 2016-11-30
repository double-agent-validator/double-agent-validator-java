# App Angular 2 With DoubleAgentValidator

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.19-3.


```bash
npm i -S double-agent-validator@^1.0.4
```


## Setup

```typescript
import { DoubleAgentValidatorModule, DOUBLE_AGENT_VALIDATOR_SCHEMA_URL }
  from 'double-agent-validator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DoubleAgentValidatorModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      {
        provide: DOUBLE_AGENT_VALIDATOR_SCHEMA_URL,
        useValue: 'http://localhost:4200/assets/schema.js' /* here you should point to your double-validator backend endpoint */
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
