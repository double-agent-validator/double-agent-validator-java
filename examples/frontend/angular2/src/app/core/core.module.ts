import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorService, VALIDATORS_NS } from './services/validator.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ValidatorService,
    {
      provide: VALIDATORS_NS, useValue: [
        'DoubleAgent.Example.JsonSchemaValidator'
      ]
    }
  ],
  exports: [
  ],
  declarations: []
})
export class CoreModule {
  constructor(validatorService: ValidatorService) {
    window['ValidatorService'] = ValidatorService;
  }
}
