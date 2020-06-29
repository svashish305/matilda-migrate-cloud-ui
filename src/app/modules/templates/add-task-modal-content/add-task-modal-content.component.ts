import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PluginService } from './services/plugin.service';
import { FormBase } from './task-input/dynamic-forms/models/form-base';


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
  public pluginFields: FormBase[] = [];
  @Output() onSaveConfig = new EventEmitter();
  @Output() onClose = new EventEmitter();
  firstFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _pluginService: PluginService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required],
    });
    this._pluginService.getTaskInputFields(1)
        .subscribe((data:any[]) => this.pluginFields = data);
  }

  saveConfig(event: any) {
    this.onSaveConfig.emit(event);
  }

  closeWidget(event:any) {
    this.onClose.emit(event);
  }
}
