import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PluginService } from '../services/plugin.service';
import { Item } from 'src/app/utils/models/data.model';

@Component({
  selector: 'app-task-general-config',
  templateUrl: './task-general-config.component.html',
  styleUrls: ['./task-general-config.component.scss']
})
export class TaskGeneralConfigComponent implements OnInit {
  @Input() task: Item;
  @Output() taskGeneralConfig = new EventEmitter();
  @Output() closeWindow = new EventEmitter();
  form: FormGroup;
  pluginList: any[] = [];
  serviceList: any[] = [];
  actionList: any[] = [];
  _pluginName: string = '';
  _serviceName: string = '';
  _actionName: string = '';
  showServiceControl: boolean = false;
  showActionControl: boolean = false;
  constructor(private _formBuilder: FormBuilder, private _pluginService: PluginService) { }

  ngOnInit() {
   
    this.initForm();
    this.getPlugins();
    
  }

  initForm() {
    this.form = this._formBuilder.group({
      name: ['', Validators.compose([
        Validators.nullValidator,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),],
      description: [],
      pluginId: [, Validators.required],
      serviceId: [],
      actionId: []
    });

  }

  getPlugins() {
    this._pluginService.getPlugins()
        .subscribe((data:any[]) => {
          this.pluginList = data;
          if(this.task.pluginId) {
            this.plugin.patchValue(this.task.pluginId);
            this.onPluginChange(this.task.pluginId, 'auto');
          }
        });
  }

  onPluginChange(event: any, triggerType?: string) {
    this.service.reset();
    this.action.reset();
   
    this._pluginName = triggerType ? this.task.pluginName : event.source.selected.viewValue;
    let pluginId = triggerType ? this.task.pluginId : event.value;
    const filterPluginList = this.pluginList.filter(_plugin => _plugin.pluginId === pluginId);
    
    if(filterPluginList[0].pluginServices) {
      this.showServiceControl = true;
      this.serviceList = filterPluginList[0].pluginServices;
      this.service.setValidators([Validators.required]);
      if(triggerType){
        this.service.patchValue(this.task.serviceId);
        if(this.task.actionId) {
          this.onServiceChange(this.task.serviceId, this.task.pluginId, 'auto');
        }
      }
      this.service.updateValueAndValidity();
    }else{
      this.showServiceControl = false;
      this.serviceList = [];
      this.service.setValidators([Validators.nullValidator]);
      this.service.updateValueAndValidity();
      if(filterPluginList[0].pluginActions) {
        this.showActionControl = true;
        this.actionList = filterPluginList[0].pluginActions;
        this.action.setValidators([Validators.required]);
        if(triggerType){
          this.action.patchValue(this.task.actionId.toString);
        }
        this.action.updateValueAndValidity();
      }
    }
  }

  onServiceChange(event: any, pluginId: any, triggerType?: string) { 
    this.action.reset();
    this._serviceName = triggerType ? this.task.serviceName : event.source.selected.viewValue;
    let serviceId = triggerType ? this.task.serviceId : event.value;
      this.pluginList.forEach(_plugin => {
        if(_plugin.pluginId === pluginId) {
          _plugin.pluginServices.forEach(_service => {
            if(_service.pluginServiceId == serviceId) {
              this.showActionControl = true;
              this.actionList = _service.pluginActions;
              this.action.setValidators([Validators.required]);
              if(triggerType) {
                this.action.patchValue(this.task.actionId.toString());
              }
              this.action.updateValueAndValidity();
            }
          });
        }
      });
  }

  onActionChange(event: any) {
    this._actionName = event.source.selected.viewValue;
  }

  onSubmit(form: any) {
    if(this.form.valid){
      const previousActionId = this.task.actionId;

      this.task.pluginId = form.pluginId;
      this.task.serviceId = form.serviceId;
      this.task.actionId = form.actionId;
      this.task.pluginName = this._pluginName;
      this.task.serviceName = this._serviceName;
      this.task.actionName = this._actionName;

      if(previousActionId) {
        if(previousActionId !== this.task.actionId) {
          this.task.input = null;
          this.task.itemFields = [];
        }
      }

      this.taskGeneralConfig.emit(this.task);
    }
  }

  close() {
    this.closeWindow.emit(true);
  }

  get name() {
    return this.form.get('name');
  }
  get description() {
    return this.form.get('description');
  }
  get plugin() {
    return this.form.get('pluginId');
  }
  get service() {
    return this.form.get('serviceId');
  }
  get action() {
    return this.form.get('actionId');
  }
}
