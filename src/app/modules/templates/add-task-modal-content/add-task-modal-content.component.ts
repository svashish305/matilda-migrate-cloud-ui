import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-task-modal-content',
  templateUrl: './add-task-modal-content.component.html',
  styleUrls: ['./add-task-modal-content.component.scss'],
})
export class AddTaskModalContentComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  plugins: SelectInterface[] = [
    { value: 'p-0', viewValue: 'AWS' },
    { value: 'p-1', viewValue: 'Pizza' },
    { value: 'p-2', viewValue: 'Tacos' },
  ];
  services: SelectInterface[] = [
    { value: 's-0', viewValue: 'RDS' },
    { value: 's-1', viewValue: 'Pizza' },
    { value: 's-2', viewValue: 'Tacos' },
  ];
  actions: SelectInterface[] = [
    { value: 'create-0', viewValue: 'Create' },
    { value: 'update-1', viewValue: 'Update' },
    { value: 'delete-2', viewValue: 'Delete' },
  ];
  accounts: SelectInterface[] = [
    { value: 'aws-acc-0', viewValue: 'AWS Account 1' },
    { value: 'aws-acc-1', viewValue: 'AWS Account 2' },
    { value: 'aws-acc-2', viewValue: 'AWS Account 3' },
  ];
  types: SelectInterface[] = [
    { value: 'type-0', viewValue: 'T2 Micro' },
    { value: 'type-1', viewValue: 'Type 2' },
    { value: 'type-2', viewValue: 'Type 3' },
  ];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }
}
