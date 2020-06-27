import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBase, Validator } from './dynamic-forms/models/form-base';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskInputComponent implements OnInit, OnChanges {
  @Input('dataSource') dataSource: FormBase[] = [];
  form: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    if (this.dataSource.length > 0) {
      this.form = this.toFormGroup(this.dataSource);
    } else {
      this.form = this.toFormGroup([]);
    }

    console.log(this.dataSource);
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    if(changes.dataSource.currentValue !== changes.dataSource.previousValue) {
      this.form = this.toFormGroup(changes.dataSource.currentValue);
    }
  }

  toFormGroup(data?: FormBase[]) {
    let group: any = {};

    data.forEach(field => {
      group[field.key] = new FormControl(field.value, this.bindValidations(field.validations));

    });
    console.log(group);
    return new FormGroup(group);
  }

  bindValidations(validations: Validator[]) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(validation => {
        validList.push(this.mapValidationPattern(validation));
      });
      console.log(validList);
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

}
