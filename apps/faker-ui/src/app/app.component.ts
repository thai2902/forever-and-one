import { Component, ViewEncapsulation } from '@angular/core';
import { FAKER } from './const/faker-namespace';
import * as jsc from 'to-json-schema';
import { SIG } from './const/faker-signature';
import * as faker from 'faker';
import * as moment from 'moment';
import jsf from 'json-schema-faker';
declare var JSONSchemaFaker: any;
JSONSchemaFaker.extend('faker', function() {
    // return require('faker');
    console.log('fakerfaker', faker);
    
    return faker;
});

JSONSchemaFaker.option({
  minItems: 123
});
console.log('-------JSONSchemaFaker', JSONSchemaFaker);
console.log('-------window', window);



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
      this.generateFromSchema();
      console.log('--> sample', this.sample);
    } catch (error) {
      console.log(error);
    }
  }

  updateSchema(event) {
    try {
      this.schema = JSON.parse(event);
    } catch (error) {
      // this.schema = {error: 'Parse error'}
    }
  }

  generateFromSchema() {
    const _sample = [];
    for (let i=0; i<50; i++) {
        _sample.push(JSONSchemaFaker.generate(this.schema))
    }
    this.sample = _sample;
  }
}

export class SchemaInjector {
  static inject(obj: any) {
    const required = [];
    if (obj.type === 'object' && obj.properties) {
      Object.keys(obj.properties).forEach(k => {
        if (obj.properties[k].type === 'string' || obj.properties[k].type === 'integer') {
          let type, faker;
          for(let i=0; i<SIG.length; i++) {
            if(new RegExp(SIG[i].regx, 'i').test(k)) {
              type = SIG[i].type;
              faker = SIG[i].faker;
              break;
            }
          }
          obj.properties[k]['type'] = type;
          obj.properties[k]['x-faker'] = faker || 'lorem.words';
          required.push(k);
        }
      })
    }
    // if (obj.type === 'array' && obj.items) {
    //   return SchemaInjector.inject(obj.items);
    // }
    obj.required = required;
    return obj;
  }
}


