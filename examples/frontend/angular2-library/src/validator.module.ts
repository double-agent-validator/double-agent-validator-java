import { Injector, OpaqueToken, NgModule, APP_INITIALIZER } from '@angular/core';
import { DoubleAgentValidator } from './validator.service';
import { DoubleAgentValidatorNg2Factory } from './ng2-factory.service';

export const DOUBLE_AGENT_VALIDATOR_SCHEMA_URL = new OpaqueToken('DoubleAgentValidator.SCHEMA_URL');
export const DOUBLE_AGENT_VALIDATOR_SCHEMA_NS = new OpaqueToken('DoubleAgentValidator.SCHEMA_NAMESPACES');
@NgModule({
  providers: [
    DoubleAgentValidator,
    DoubleAgentValidatorNg2Factory,
    {
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector, factory: DoubleAgentValidatorNg2Factory) => {
        console.log('HERE', injector);
        let url: string = injector.get(DOUBLE_AGENT_VALIDATOR_SCHEMA_URL);
        let namespaces: string[] = injector.get(DOUBLE_AGENT_VALIDATOR_SCHEMA_NS);
        return new Promise<void>((resolve, reject) => {
          console.log('VALUES', url, namespaces);
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
        DoubleAgentValidatorNg2Factory,
        DoubleAgentValidator
      ]
    }
  ],
  exports: [  ]
})
export class DoubleAgentValidatorModule { }
