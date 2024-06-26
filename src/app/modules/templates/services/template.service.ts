import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private BASE_URL = environment.baseurl;

  constructor(private _http: HttpClient) { }

  getAllTemplates() {
    return this._http.get(this.BASE_URL + '/template/selectall');
  }

  getTemplateById(templateId: any) {
    return this._http.get(this.BASE_URL + `/template/${templateId}/select`);
  }

  createTemplate(payload: any) {
    return this._http.post(this.BASE_URL + '/template/create', payload);
  }

  updateTemplate(payload: any, templateId?: any) {
    return this._http.put(this.BASE_URL + '/template/save', payload);
  }

  deleteTemplate(templateId: any) {
    return this._http.delete(this.BASE_URL + `/template/${templateId}/delete`);
  }

  importTemplates(templateId: any, payload: any) {
    return this._http.post(this.BASE_URL + `/template/${templateId}/import`, payload);
  }

  createTag(payload: any, templateId: any) {
    return this._http.post(this.BASE_URL + `/template/${templateId}/tag/create`, payload);
  }

  updateTag(payload: any, templateId: any) {
    return this._http.post(this.BASE_URL + `/template/${templateId}/tag/save`, payload);
  }

  deleteTag(tagId: any) {
    return this._http.delete(this.BASE_URL + `/template/tag/${tagId}/delete`);
  }

}
