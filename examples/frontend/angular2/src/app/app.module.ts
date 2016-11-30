import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

let url = 'http://localhost:4200/assets/schema.js';

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
        useValue: url
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
