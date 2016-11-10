import { Component } from '@angular/core';
import { ValidatorService } from './core/services/validator.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  formContribuinte: FormGroup;
  private contribuinte: any = null;

  constructor(validatorService: ValidatorService) {
    this.formContribuinte = validatorService.buildFormGroup('contribuinte', 1);
  }

  submterContribuinte(value: Object) {
    this.contribuinte = value;
  }
}
