import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
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
  @Input() task: any;
  @Output('taskTemplateFormat') taskTemplateFormat = new EventEmitter<any>();
  @Output('closeWindow') closeWindow = new EventEmitter<any>();
  form: FormGroup;
  formatTypes: SelectInterface[] = [
    { value: "json", viewValue: "JSON" },
    { value: "yaml", viewValue: "YAML" }
  ];
  dataTypes: SelectInterface[] = [
    { value: "data", viewValue: "Data" },
    { value: "schema", viewValue: "Schema" }
  ];
  formTypeJ: boolean;
  formTypeY: boolean;
  radioD: boolean;
  radioB: boolean;
  selectedFormat;
  selectedDataType;
  dataFile = { "foo": "test", "bar": 2 };
  schemaFile = {
    "properties": {
      "foo": { "type": "string" }, "bar": { "type": "number", "maximum": 3 }
    }
  };
  dataFileJ;
  schemaFileJ;
  dataFileY;
  testVar: any;
  constructor(private _formBuilder: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initForm();
    this.schemaFileJ = JSON.stringify(this.schemaFile, undefined, 2);
    this.dataFileJ = JSON.stringify(this.dataFile, undefined, 2);
  }
  initForm() {
    this.form = this._formBuilder.group({
      format: ['', Validators.required],
      dataType: ['', Validators.nullValidator],
      //   formatDataJson: ['', Validators.compose([
      //     Validators.required,      
      //     this.isValidJSONFormat.bind(this)
      // ]),],
      formatDataJson: ['', Validators.nullValidator],
      formatDataSchema: ['', Validators.nullValidator],
      formatDataYaml: ['', Validators.nullValidator]
    });
  }
  onFormatChange(fType) {
    if ((fType == 'JSON') || (fType == 'json')) {
      this.formTypeY = false;
      this.formTypeJ = true;
    }
    if ((fType == 'YAML') || (fType == 'yaml')) {
      this.formTypeJ = false;
      this.formTypeY = true;

    }

  }
  onDataTypeChange(dType) {
    if ((dType == 'data') || (dType == 'Data')) {
      this.radioB = false;
      this.radioD = true;
    }
    if ((dType == 'schema') || (dType == 'Schema')) {
      this.radioD = false;
      this.radioB = true;

    }

  }
  onSubmit(form: any) {
    if (this.form.valid) {
      if ((form.format == 'JSON') || (form.format == 'json')) {
        let formData;
        let formSData;
        if ((form.formatDataSchema == 'null') || ((form.formatDataSchema == ""))) {
          this.isValidJson(form)
        }
        else {
          var Ajv = require('ajv');
          var ajv = new Ajv();
          formData = JSON.parse(form.formatDataJson);
          formSData = JSON.parse(form.formatDataSchema);
          var valid = ajv.validate(formSData, formData);
          if (!valid) {
            this.openSnackBar('Please Enter Valid JSON Data', 'error');
          }
          if (valid) {
            let templatePayload = {
              format: form.format,
              schema: form.formatDataSchema,
              data: form.formatDataJson
            }
            this.taskTemplateFormat.emit(templatePayload);
          }
        }

      }
      else if ((form.format == 'YAML') || (form.format == 'yaml')) {
        let yaml = require('js-yaml');
        // let fs   = require('fs');

        // Get document, or throw exception on error
        try {
          let doc = yaml.safeLoad(form.formatDataYaml)
        } catch (e) {
          this.snackBar.open('Please Enter Valid YAML Data', 'error');

        }
      }
    }
  }

  isValidJson(form: any) {
    try {
      JSON.parse(form.formatDataJson);
      let templatePayload = {
        format: form.format,
        data: form.formatDataJson
      }
      this.taskTemplateFormat.emit(templatePayload);
      return true;
    } catch (e) {
      this.openSnackBar('Please Enter Valid JSON Data', 'error');
      return false;
    }
  }

  close() {
    this.closeWindow.emit(true);
  }
  get format() {
    return this.form.get('format');
  }
  get dataType() {
    return this.form.get('dataType');
  }
  get formatDataJson() {
    return this.form.get('formatDataJson');
  }
  get formatDataSchema() {
    return this.form.get('formatDataSchema');
  }
  get formatDataYaml() {
    return this.form.get('formatDataYaml');
  }

  isValidJSONFormat(event, formType) {
    if (formType == 'data') {
      let json = event.formatDataJson;
      let obj = JSON.parse(json);
      let formattedJson = JSON.stringify(obj, null, 2);
      this.form.controls['formatDataJson'].setValue(formattedJson);
    }
    if (formType == 'schema') {
      let schema = event.formatDataSchema;
      let obj = JSON.parse(schema);
      let formattedJson = JSON.stringify(obj, null, 2);
      this.form.controls['formatDataSchema'].setValue(formattedJson);
    }

  }
  openSnackBar(message: string, snackType: string) {
  let snackBarRef=   this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, snackType: snackType, snackBar: this.snackBar },
      panelClass: [snackType],
    });
    snackBarRef.onAction().subscribe(() => {
      this.snackBar.dismiss();      
    })
  }  
  
}
