import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBase } from '../models/form-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormTemplateComponent implements OnInit {
  @Input('dataItem') dataItem: FormBase;
  @Input() form: FormGroup;
  min: Date = new Date();
  constructor() { }

  ngOnInit() {
    console.log(this.dataItem)
  }

  checkForRequiredField(dataItem: FormBase) {
   const reqField = dataItem.validations.filter(_validation => _validation.name === 'required');
   return reqField.length === 0 ? false : true;
  }

}
