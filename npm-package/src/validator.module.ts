import { Injector, ModuleWithProviders, OpaqueToken, NgModule, APP_INITIALIZER, Injectable } from '@angular/core';
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

let injector, doubleAgentFactory;

export function FactoryBuilder() {
  return DoubleAgentValidatorNg2Factory.factoryFn(injector, doubleAgentFactory);
}

export function DoubleAgentValidatorInitializerFactory(injectorP: Injector, doubleAgentFactoryP: DoubleAgentValidatorNg2Factory) {
  let factoryBuilder = FactoryBuilder;
  injector = injectorP;
  doubleAgentFactory = doubleAgentFactoryP;
  return factoryBuilder;
}

export const DoubleAgentValidatorProviders = [
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
    useFactory: DoubleAgentValidatorInitializerFactory,
    deps: [
      Injector,
      DoubleAgentValidatorNg2Factory
    ],
    multi: true
  }
];

@NgModule({
  declarations: [
    InputMaskDirective,
    InputHtml5AttributesDirective
  ],
  providers: [
    DoubleAgentValidatorProviders
  ],
  exports: [
    InputMaskDirective,
    InputHtml5AttributesDirective
  ]
})
export class DoubleAgentValidatorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DoubleAgentValidatorModule,
      providers: DoubleAgentValidatorProviders
    };
  }
}
