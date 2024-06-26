import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PluginService {
  private BASE_URL = environment.pluginBaseUrl;

  constructor(private _httpClient: HttpClient) { }

  getTaskInputFields(actionId: any) {
    return this._httpClient.get(this.BASE_URL + `/plugin/service/action/${actionId}/inputs`);
  }

  getTaskFieldsByKey(actionId: any, actionFieldKey: any, selectedFieldKey: any) {
    return this._httpClient.get('');
  }

  getPlugins() {
    let url = this.BASE_URL + '/plugin/details/select';
    return this._httpClient.get(url);
  }

  getServicesByPluginId(pluginId: any) {
    let url = this.BASE_URL + `plugins/${pluginId}/services/actions/select`;
    return this._httpClient.get('../../../../../assets/migration/plugin-services.json');
  }


}
