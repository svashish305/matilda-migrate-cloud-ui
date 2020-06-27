import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  constructor(private _httpClient: HttpClient) { }

  getTaskInputFields(actionId: any) {
    return this._httpClient.get('../../../../../assets/migration/taskFields.json');
  }
}
