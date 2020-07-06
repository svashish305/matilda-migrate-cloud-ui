import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PluginService } from '../services/plugin.service';

@Component({
  selector: 'app-task-general-config',
  templateUrl: './task-general-config.component.html',
  styleUrls: ['./task-general-config.component.scss']
})
export class TaskGeneralConfigComponent implements OnInit {
  @Input() task: any;
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
        Validators.required,
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
        });
  }

  onPluginChange(event: any) {
    
    this._pluginName = event.source.selected.viewValue;
    const filterPluginList = this.pluginList.filter(_plugin => _plugin.pluginId === event.value);
    console.log(filterPluginList);
    if(filterPluginList[0].pluginServices) {
      this.showServiceControl = true;
      this.serviceList = filterPluginList[0].pluginServices;
      this.service.setValidators([Validators.required]);
    }else{
      this.showServiceControl = false;
      this.serviceList = [];
      this.service.setValidators([Validators.nullValidator]);
      if(filterPluginList[0].pluginActions) {
        this.showActionControl = true;
        this.actionList = filterPluginList[0].pluginActions;
        this.action.setValidators([Validators.required]);
      }
    }
  }

  onServiceChange(event: any, pluginId: any) { 
    this.action.patchValue(null);
    this._serviceName = event.source.selected.viewValue;
      this.pluginList.forEach(_plugin => {
        if(_plugin.pluginId === pluginId) {
          _plugin.pluginServices.forEach(_service => {
            if(_service.pluginServiceId == event.value) {
              this.showActionControl = true;
              this.actionList = _service.pluginActions;
              this.action.setValidators([Validators.required]);
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
      this.taskGeneralConfig.emit(form);
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
