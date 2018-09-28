import { Component, ViewEncapsulation } from '@angular/core';
import { FAKER } from './const/faker-namespace';
import * as jsc from 'to-json-schema';
import { SIG } from './const/faker-signature';

declare var JSONSchemaFaker: any;
JSONSchemaFaker.extend('faker', function() {
  return require('faker');
});

@Component({
  selector: 'forever-and-one-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'faker-ui';

  fk = FAKER;
  jsonText: string = `{
    "name": "",
    "username": "",
    "email": "",
    "address": "",
    "dob": "",
    "time": ""
  }`;
  sample: any;
  schema: any;


  codeMirrorConf1 = {
    lineNumbers: true,
    theme: 'material',
    mode: 'application/json',
    foldGutter: true
  }

  codeMirrorConf2 = {
    lineNumbers: true,
    theme: 'material',
    mode: 'application/json',
    foldGutter: true
  }

  constructor() {
    this.schema = JSON.parse(this.jsonText);
  }
  generate() {
    try {
      const jsonObj = JSON.parse(this.jsonText);
      const rawSchema = jsc(jsonObj);
      console.log('--> rawSchema',rawSchema);
      this.schema = SchemaInjector.inject(rawSchema);
      console.log('--> schema', this.schema);
      JSONSchemaFaker.resolve(this.schema).then((sample) => {
        this.sample = sample;
        console.log('--> sample', this.sample);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export class SchemaInjector {
  static inject(obj: any) {
    const required = [];
    if (obj.properties) {
      Object.keys(obj.properties).forEach(k => {
        if (obj.properties[k].type === 'string' || obj.properties[k].type === 'integer') {
          let type;
          for(let i=0; i<SIG.length; i++) {
            if(new RegExp(SIG[i].regx, 'i').test(k)) {
              type = SIG[i].type;
              break;
            }
          }
          obj.properties[k]['x-faker'] = type || 'lorem.words';
          required.push(k);
        }
      })
    }
    obj.required = required;
    return obj;
  }
}


