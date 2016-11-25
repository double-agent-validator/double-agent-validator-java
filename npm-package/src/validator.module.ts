import { Injector, OpaqueToken, NgModule, APP_INITIALIZER } from '@angular/core';
import { DoubleAgentValidator } from './validator.service';
import { DoubleAgentValidatorNg2Factory } from './ng2-factory.service';
import { DoubleAgentFormGroupBuilder, DoubleAgentFormControlValidatorBuilder } from './form';

export const DOUBLE_AGENT_VALIDATOR_SCHEMA_URL = new OpaqueToken('DoubleAgentValidator.SCHEMA_URL');
export const DOUBLE_AGENT_VALIDATOR_SCHEMA_NS = new OpaqueToken('DoubleAgentValidator.SCHEMA_NAMESPACES');
@NgModule({
  providers: [
    DoubleAgentValidator,
    DoubleAgentValidatorNg2Factory,
    DoubleAgentFormGroupBuilder,
    DoubleAgentFormControlValidatorBuilder,
    {
      provide: APP_INITIALIZER,
      useFactory: DoubleAgentValidatorNg2Factory.factoryFn,
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
