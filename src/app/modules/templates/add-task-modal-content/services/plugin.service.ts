import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PluginService {
  private PLUGIN_URL = '/plugin/service/action/';

  constructor(private _httpClient: HttpClient) { }

  getTaskInputFields(actionId: any) {
    return this._httpClient.get('../../../../../assets/migration/taskFields.json');
  }

  getTaskFieldsByKey(actionId: any, actionFieldKey: any, selectedFieldKey: any) {
    return this._httpClient.get('');
  }


}
