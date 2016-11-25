import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DoubleAgentValidator, DoubleAgentFormGroupBuilder } from 'double-agent-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formContribuinte: FormGroup;
  private contribuinte: any = null;

  constructor(private doubleAgentValidator: DoubleAgentValidator, private formGroupBuilder: DoubleAgentFormGroupBuilder) {

  }

  ngOnInit() {
    this.doubleAgentValidator.isReady.subscribe(() => {
      // <any> here is needed because of small diferences between angular 2 versions in the AbstractControl definition
      this.formContribuinte = <any>this.formGroupBuilder.build('contribuinte-v1');
    });

  }

  submterContribuinte(value: Object) {
    this.contribuinte = value;
  }
}
