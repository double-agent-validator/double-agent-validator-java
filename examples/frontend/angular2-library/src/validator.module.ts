import { Injector, OpaqueToken, NgModule, APP_INITIALIZER } from '@angular/core';
import { DoubleAgentValidator } from './validator.service';
import { DoubleAgentValidatorNg2Factory } from './ng2-factory.service';

export const DOUBLE_AGENT_VALIDATOR_SCHEMA_URL = new OpaqueToken('DoubleAgentValidator.SCHEMA_URL');
export const DOUBLE_AGENT_VALIDATOR_SCHEMA_NS = new OpaqueToken('DoubleAgentValidator.SCHEMA_NAMESPACES');
@NgModule({
  imports: [],
  exports: [DoubleAgentValidator, DoubleAgentValidatorNg2Factory],
  declarations: [],
  providers: [
    DoubleAgentValidator,
    DoubleAgentValidatorNg2Factory,
    {
      provide: APP_INITIALIZER,
      useFactory: (factory: DoubleAgentValidatorNg2Factory, injector: Injector) => {
        let url: string = injector.get(DOUBLE_AGENT_VALIDATOR_SCHEMA_URL);
        let namespaces: string[] = injector.get(DOUBLE_AGENT_VALIDATOR_SCHEMA_NS);
        return new Promise<void>((resolve, reject) => {
          let errors = null;
          if (url == null) {
            errors = 'DoubleAgentValidator Module needs an url provided through the DOUBLE_AGENT_VALIDATOR_SCHEMA_URL token';
          }
          if (namespaces == null) {
            errors = `${errors ? errors : ''} DoubleAgentValidator Module needs the
             namespaces provided through the DOUBLE_AGENT_VALIDATOR_SCHEMA_NS token`;
          }
          if (errors) {
            reject(errors);
          }
          return factory.load(url, namespaces);
        });
      },
      deps: [
        Injector,
        DOUBLE_AGENT_VALIDATOR_SCHEMA_URL,
        DoubleAgentValidator,
        DoubleAgentValidatorNg2Factory
      ]
    }
  ],
})
export class DoubleAgentValidatorModule { }
