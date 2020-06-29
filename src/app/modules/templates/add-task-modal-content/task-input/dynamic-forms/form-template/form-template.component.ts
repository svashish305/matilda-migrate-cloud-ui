import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
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
  @Output() dropdownChange = new EventEmitter();
  @Output() CheckboxChange = new EventEmitter();
  @Output() radioButtonChange = new EventEmitter();
  min: Date = new Date();
  constructor() { }

  ngOnInit() {
  }

  checkForRequiredField(dataItem: FormBase) {
   const reqField = dataItem.validations.filter(_validation => _validation.name === 'required');
   return reqField.length === 0 ? false : true;
  }

  onDropdownChange(event: any, dataItem: FormBase) {
    this.dropdownChange.emit({value: event.value, control: dataItem});
  }

  onCheckboxChange(event: any, dataItem: FormBase) {
    console.log(event);
    this.CheckboxChange.emit({value: event.checked, control: dataItem});
  }

  onRadioButtonChange(event: any, dataItem: FormBase) {
    this.radioButtonChange.emit({value: event.value, control: dataItem})
  }

}
