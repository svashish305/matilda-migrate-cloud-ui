import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationsService } from 'angular2-notifications';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
declare var require: any;

interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-add-task-modal-content",
  templateUrl: "./add-task-modal-content.component.html",
  styleUrls: ["./add-task-modal-content.component.scss"],
})
export class AddTaskModalContentComponent implements OnInit {
  @Input('isMobile') isMobile;
  @Output('saveTaskData') saveTaskData = new EventEmitter<any>();
  @Output('closeTaskForm') closeTaskForm = new EventEmitter<any>();  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  plugins: SelectInterface[] = [
    { value: "p-0", viewValue: "AWS" },
    { value: "p-1", viewValue: "Pizza" },
    { value: "p-2", viewValue: "Tacos" },
  ];
  services: SelectInterface[] = [
    { value: "s-0", viewValue: "RDS" },
    { value: "s-1", viewValue: "Pizza" },
    { value: "s-2", viewValue: "Tacos" },
  ];
  actions: SelectInterface[] = [
    { value: "create-0", viewValue: "Create" },
    { value: "update-1", viewValue: "Update" },
    { value: "delete-2", viewValue: "Delete" },
  ];
  accounts: SelectInterface[] = [
    { value: "aws-acc-0", viewValue: "AWS Account 1" },
    { value: "aws-acc-1", viewValue: "AWS Account 2" },
    { value: "aws-acc-2", viewValue: "AWS Account 3" },
  ];
  types: SelectInterface[] = [
    { value: "type-0", viewValue: "T2 Micro" },
    { value: "type-1", viewValue: "Type 2" },
    { value: "type-2", viewValue: "Type 3" },
  ];
  formatTypes: SelectInterface[] = [
    { value: "json", viewValue: "JSON" },
    { value: "yaml", viewValue: "YAML" }
  ];
  formTypeJ: boolean;
  formTypeY: boolean;
  radioB:any;
  radioD:any;
  selectedFormat;
  dataFile = {"foo": "test", "bar": 2};
  schemaFile = {
    "properties": {
      "foo": { "type": "string" },
      "bar": { "type": "number", "maximum": 3 }
    }
  };
  dataFileJ;
  schemaFileJ;
  dataFileY;
  chosenItem:boolean = true;
  errorMessage: boolean = false;
  constructor(private _formBuilder: FormBuilder,private _notificationService: NotificationsService,private _ngZone: NgZone) {}
  ngOnInit() {
    this.selectedFormat = this.formatTypes[0].value;
   this.onFormatChange(this.formatTypes[0].viewValue);
   this.radioChange(true);
   this.schemaFileJ = JSON.stringify(this.schemaFile,undefined, 2);
   this.dataFileJ = JSON.stringify(this.dataFile,undefined, 2);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ["", Validators.required],
    });
     }
  onFormatChange(e){
   if((e == 'JSON') || (e =='json')){
     this.formTypeY = false;
     this.formTypeJ = true;
       }
   if((e == 'YAML') || (e =='yaml')){
    this.formTypeJ = false;
    this.formTypeY = true;

   }

  }
  radioChange(e){
    if(e == true){
      this.chosenItem = true;
      this.radioD = true; 
      this.radioB = false;
    }
    else{
      this.chosenItem = false;
      this.radioD = false;
      this.radioB = true;
    }
  }
  saveTask(){
    if((this.selectedFormat == 'JSON') || (this.selectedFormat == 'json')){
      let formData;
      let formSData;
      if(this.schemaFileJ == 'null'){
       this.isValidJson(this.dataFileJ)
      } 
     else{
      var  Ajv = require('ajv');
      var ajv = new Ajv();
      formData =  JSON.parse(this.dataFileJ);
      formSData =  JSON.parse(this.schemaFileJ);
      var valid = ajv.validate(formSData, formData);
      if (!valid) {
        this.errorMessage = true;
        this._notificationService.error('Error Occurred', 'Please Enter Valid JSON');
      }
      if(valid) {
        let templatePayload = {
          format:this.selectedFormat,
          schema:this.schemaFileJ,
          data:this.dataFileJ
        }
        this.saveTaskData.emit(templatePayload);
      }  
    }
    
    }
    else if((this.selectedFormat == 'YAML') || (this.selectedFormat == 'yaml')){
      let yaml = require('js-yaml');
      // let fs   = require('fs');
       
      // Get document, or throw exception on error
      try {
        let doc = yaml.safeLoad(this.dataFileY)
      } catch (e) {
        // this._notificationService.error('Error Occurred', 'Please Enter Valid YAML');
      }
    }
    }
     isValidJson(json) {
      try {
          JSON.parse(json);
          let templatePayload = {
            format:this.selectedFormat,         
            data:this.dataFileJ
          }
          this.saveTaskData.emit(templatePayload); 
          return true;
      } catch (e) {      
        this._notificationService.error('Error Occurred', 'Please Enter Valid JSON')
          return false;
      }
  }
  
  closeTask(){
    this.closeTaskForm.emit();
  }
}
