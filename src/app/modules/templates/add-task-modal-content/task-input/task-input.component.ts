import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { PluginService } from '../services/plugin.service';
import { FormBase, Validator } from './dynamic-forms/models/form-base';


@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskInputComponent implements OnInit, OnChanges {
  @Input('dataSource') dataSource: FormBase[] = [];
  @Input() task: any;
  @Output('saveConfig') saveConfig = new EventEmitter();
  @Output('closeWidget') closeWidget = new EventEmitter();

  form: FormGroup;
  constructor(private _fb: FormBuilder, private _pluginService: PluginService) { }

  ngOnInit() {
    if (this.dataSource.length > 0) {
      this.form = this.toFormGroup(this.dataSource);
    } else {
      this.form = this.toFormGroup([]);
    }
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.dataSource.currentValue !== changes.dataSource.previousValue) {
      this.form = this.toFormGroup(changes.dataSource.currentValue);
    }
  }

  toFormGroup(data?: FormBase[]) {
    let group: any = {};

    data.forEach(field => {
      group[field.key] = new FormControl(field.value, this.bindValidations(field.validations));

    });
    return new FormGroup(group);
  }

  bindValidations(validations: Validator[]) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(validation => {
        validList.push(this.mapValidationPattern(validation));
      });
      return Validators.compose(validList);
    }
    return null;
  }

  mapValidationPattern(validation: Validator) {
    switch (validation.name) {
      case 'required':
        return Validators.required;

      case 'email':
        return Validators.email;

      case 'pattern':
        return Validators.pattern(validation.validator);

      default:
        break;
    }
  }

  mapFormControl(field: any) {
    return new FormControl(field.value, this.bindValidations(field.validations));
  }

  updateForm(event: any) {
    console.log(event);
    let value =  event.control.actionId + '_' + event.value;
    let remainingKeys = event.control.options.filter(_item => _item.key != event.value);
    remainingKeys = remainingKeys.map(_key => event.control.actionId + '_' + _key.key);
    
    let updateFieldArray: any[] = [];

    this._pluginService.getTaskFieldsByKey(event.control.actionId, event.control.key, value)
        .subscribe((data: FormBase[]) => {
          if(data) {
           
            updateFieldArray = this.dataSource.filter((_dataItem: any) => remainingKeys.includes(_dataItem.actionId));
            this.dataSource = this.dataSource.filter((_dataItem: any) => !remainingKeys.includes(_dataItem.actionId));
            updateFieldArray.forEach(_formControl => this.form.removeControl(_formControl.key));
            //this.form.updateValueAndValidity();

            updateFieldArray = data;
            this.dataSource = this.dataSource.concat(data);
            updateFieldArray.forEach(_newField => this.form.addControl(_newField.key, this.mapFormControl(_newField)));
            this.form.updateValueAndValidity();
          }
        });
  }

  updateFormForCheckbox(event: any) {
    let value =  event.control.actionId + '_' + event.control.key;
     
    let updateFieldArray: any[] = [];

    this._pluginService.getTaskFieldsByKey(event.control.actionId, event.control.key, value)
        .subscribe((data: FormBase[]) => {
          if(data.length > 0) {
            if(event.checked){
              updateFieldArray = data;
              this.dataSource = this.dataSource.concat(data);
              updateFieldArray.forEach(_newField => this.form.addControl(_newField.key, this.mapFormControl(_newField)));
              this.form.updateValueAndValidity();
            }else{
              updateFieldArray = this.dataSource.filter((_dataItem: any) => _dataItem.actionId === value);
              this.dataSource = this.dataSource.filter((_dataItem: any) => _dataItem.actionId !== value);
              updateFieldArray.forEach(_formControl => this.form.removeControl(_formControl.key));
              this.form.updateValueAndValidity();
            }
          }else{
            updateFieldArray = this.dataSource.filter((_dataItem: any) => _dataItem.actionId === value);
            this.dataSource = this.dataSource.filter((_dataItem: any) => _dataItem.actionId !== value);
            updateFieldArray.forEach(_formControl => this.form.removeControl(_formControl.key));
            this.form.updateValueAndValidity();
          }
        });
  }

  onSubmit(form: any, testForm?:any) {
    this.saveConfig.emit({configuration: form, itemFields: this.dataSource});
  }

  close() {
    this.closeWidget.emit(true);
  } 
}
