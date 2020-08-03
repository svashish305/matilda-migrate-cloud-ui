import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  private BASE_URL = environment.baseurl;

  constructor(private _http: HttpClient) { }

  getAllWorkflows() {
    return this._http.get(this.BASE_URL + '/workflow/selectall');
  }

  getWorkflowById(workflowId: any) {
    return this._http.get(this.BASE_URL + `/workflow/${workflowId}/select`);
  }

  updateWorkflow(payload: any, workflowId?: any) {
    return this._http.put(this.BASE_URL + '/workflow/save', payload);
  }

  deleteWorkflow(workflowId: any) {
    return this._http.delete(this.BASE_URL + `/workflow/${workflowId}/delete`);
  }

  updateTag(payload: any, workflowId: any) {
    return this._http.post(this.BASE_URL + `/workflow/${workflowId}/tag/save`, payload);
  }

  getAllAccounts() {
    return this._http.get(this.BASE_URL + `/account/selectall`);
  }

  updateWorkflowAccounts(workflowId: any, payload: any) {
    return this._http.put(this.BASE_URL + `/account/workflow/${workflowId}/save`, payload);
  }

}
