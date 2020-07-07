import { Component, OnInit,  EventEmitter, Output, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PluginService } from './services/plugin.service';
import { FormBase } from './task-input/dynamic-forms/models/form-base';

@Component({
  selector: "app-add-task-modal-content",
  templateUrl: "./add-task-modal-content.component.html",
  styleUrls: ["./add-task-modal-content.component.scss"],
})
export class AddTaskModalContentComponent implements OnInit {
  public pluginFields: FormBase[] = [];
  @Input() task: any;
  @Output() onSaveConfig = new EventEmitter();
  @Output() onSaveGeneralConfig = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Output() onSaveTemplateFormat = new EventEmitter();
  firstFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _pluginService: PluginService) {}

  ngOnInit() {
    this._pluginService.getTaskInputFields(1)
        .subscribe((data:any[]) => this.pluginFields = data);
  }

  saveConfig(event: any) {
    this.onSaveConfig.emit(event);
  }

  closeWindow(event:any) {
    this.onClose.emit(event);
  }

  taskGeneralConfig(generalConfig: any) {
    this.onSaveGeneralConfig.emit(generalConfig);
  }
  taskTemplateFormat(templateFormat:any){
    this.onSaveTemplateFormat.emit(templateFormat);
  }
}
