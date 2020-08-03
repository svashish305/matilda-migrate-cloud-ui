import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PluginService } from './services/plugin.service';
import { FormBase } from './task-input/dynamic-forms/models/form-base';
import { Item } from 'src/app/utils/models/data.model';

@Component({
  selector: 'app-add-task-modal-content',
  templateUrl: './add-task-modal-content.component.html',
  styleUrls: ['./add-task-modal-content.component.scss'],
})
export class AddTaskModalContentComponent implements OnInit {
  public pluginFields: FormBase[] = [];
  @Input() task: Item;
  @Output() onSaveConfig = new EventEmitter();
  @Output() onSaveGeneralConfig = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Output() onSaveTemplateFormat = new EventEmitter();

  constructor(private _pluginService: PluginService) { }

  ngOnInit() {

    this.getPluginFields();
  }

  saveConfig(event: any) {
    this.onSaveConfig.emit(event);
  }

  closeWindow(event: any) {
    this.onClose.emit(event);
  }

  taskGeneralConfig(generalConfig: any) {
    this.onSaveGeneralConfig.emit(generalConfig);
    this.getPluginFields();
  }
  taskTemplateFormat(templateFormat: any) {
    this.onSaveTemplateFormat.emit(templateFormat);
  }

  getPluginFields() {
    if (this.task.actionId) {
      if (this.task.input) {
        this.pluginFields = this.task.itemFields;
      } else {
        this._pluginService
          .getTaskInputFields(this.task.actionId)
          .subscribe((data: any[]) => (this.pluginFields = data));
      }
    }
  }
}
