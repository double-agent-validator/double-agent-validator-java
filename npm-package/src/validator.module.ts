import { Injector, OpaqueToken, NgModule, APP_INITIALIZER } from '@angular/core';
import { DoubleAgentValidator } from './validator.service';
import { DoubleAgentValidatorNg2Factory } from './ng2-factory.service';
import { DoubleAgentFormGroupBuilder, DoubleAgentFormControlValidatorBuilder } from './form';
import { RemoteLoader } from './models/remote-loader';
import { Angular2RemoteLoader } from './remote-loaders/angular2-remote-loader';
import { DoubleAgentValueVerifier } from './value-verifier.service';
import { InputMaskDirective } from './directives/input-mask.directive';
import { InputHtml5AttributesDirective } from './directives/input-html5-attributes.directive';

export const DOUBLE_AGENT_VALIDATOR_SCHEMA_URL = new OpaqueToken('DoubleAgentValidator.SCHEMA_URL');
export const DOUBLE_AGENT_VALIDATOR_SCHEMA_WITH_DEPENDENCIES = new OpaqueToken('DoubleAgentValidator.SCHEMA_WITH_DEPENDENCIES');

@NgModule({
  declarations: [
    InputMaskDirective,
    InputHtml5AttributesDirective
  ],
  providers: [
    DoubleAgentValidator,
    DoubleAgentValidatorNg2Factory,
    DoubleAgentFormGroupBuilder,
    DoubleAgentValueVerifier,
    DoubleAgentFormControlValidatorBuilder,
    {
      provide: RemoteLoader,
      useClass: Angular2RemoteLoader
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (injector, doubleAgentValidatorNg2Factory, doubleAgentValidator) => { return () => DoubleAgentValidatorNg2Factory.factoryFn(injector, doubleAgentValidatorNg2Factory) },
      deps: [
        Injector,
        DoubleAgentValidatorNg2Factory,
        DoubleAgentValidator
      ],
      multi: true
    }
  ],
  exports: [
    InputMaskDirective,
    InputHtml5AttributesDirective
  ]
})
export class DoubleAgentValidatorModule { }
