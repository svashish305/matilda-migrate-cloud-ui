import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
declare var require: any;
interface SelectInterface {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit-task-template',
  templateUrl: './edit-task-template.component.html',
  styleUrls: ['./edit-task-template.component.scss']
})
export class EditTaskTemplateComponent implements OnInit {
  @Input('isMobile') isMobile;
  @Output('saveTaskData') saveTaskData = new EventEmitter<any>();
  @Output('closeTaskForm') closeTaskForm = new EventEmitter<any>();  
  formatTypes: SelectInterface[] = [
    { value: "json", viewValue: "JSON" },
    { value: "yaml", viewValue: "YAML" }
  ];
  dataTypes:SelectInterface[]= [
    { value: "data", viewValue: "Data" },
    { value: "schema", viewValue: "Schema" }
  ];
  formTypeJ: boolean;
  formTypeY: boolean;
  radioD:boolean;
  radioB:boolean;
  selectedFormat;
  selectedDataType;
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
  errorMessage: boolean = false;
  constructor(private _notificationService: NotificationsService) { }

  ngOnInit() {
    this.selectedFormat = this.formatTypes[0].value;
    this.selectedDataType = this.dataTypes[0].value;
    this.onFormatChange(this.formatTypes[0].viewValue);
    this.onDataTypeChange(this.dataTypes[0].viewValue);
    this.schemaFileJ = JSON.stringify(this.schemaFile,undefined, 2);
    this.dataFileJ = JSON.stringify(this.dataFile,undefined, 2);
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
   onDataTypeChange(e){
    if((e == 'data') || (e =='Data')){
      this.radioD = true; 
       this.radioB = false;
        }
    if((e == 'schema') || (e =='Schema')){
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
