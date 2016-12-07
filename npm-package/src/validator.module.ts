import { Injector, OpaqueToken, NgModule, APP_INITIALIZER } from '@angular/core';
import { DoubleAgentValidator } from './validator.service';
import { DoubleAgentValidatorNg2Factory } from './ng2-factory.service';
import { DoubleAgentFormGroupBuilder, DoubleAgentFormControlValidatorBuilder } from './form';

export const DOUBLE_AGENT_VALIDATOR_SCHEMA_URL = new OpaqueToken('DoubleAgentValidator.SCHEMA_URL');
export const DOUBLE_AGENT_VALIDATOR_SCHEMA_WITH_DEPENDENCIES = new OpaqueToken('DoubleAgentValidator.SCHEMA_WITH_DEPENDENCIES');

@NgModule({
  providers: [
    DoubleAgentValidator,
    DoubleAgentValidatorNg2Factory,
    DoubleAgentFormGroupBuilder,
    DoubleAgentFormControlValidatorBuilder,
    {
      provide: APP_INITIALIZER,
      useFactory: (injector, doubleAgentValidatorNg2Factory, doubleAgentValidator) => { return   () => DoubleAgentValidatorNg2Factory.factoryFn(injector, doubleAgentValidatorNg2Factory) },
      deps: [
        Injector,
        DoubleAgentValidatorNg2Factory,
        DoubleAgentValidator
      ],
      multi: true
    }
  ],
  exports: [  ]
})
export class DoubleAgentValidatorModule { }
