import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  public getWaves() {
    return this.httpClient.get(this.REST_API_SERVER + '/waves');
  }

  public getTemplates() {
    return this.httpClient.get(this.REST_API_SERVER + '/templates');
  }

  public getAccounts() {
    return this.httpClient.get(this.REST_API_SERVER + '/accounts');
  }

  public getApps() {
    //this.REST_API_SERVER + '/apps'
    return this.httpClient.get('../assets/migration/app.json');
  }

  public getWave(waveId) {
    return this.httpClient.get(this.REST_API_SERVER + `/waves/${waveId}`);
  }

  public getTemplate(templateId) {
    return this.httpClient.get(
      this.REST_API_SERVER + `/templates/${templateId}`
    );
  }

  public getAccount(accountId) {
    return this.httpClient.get(this.REST_API_SERVER + `/accounts/${accountId}`);
  }

  public getApp(appId) {
    return this.httpClient.get('../assets/migration/app1.json');
  }

  public addWave(wave) {
    return this.httpClient.post(this.REST_API_SERVER + '/waves', wave);
  }

  public addTemplate(template) {
    return this.httpClient.post(this.REST_API_SERVER + '/templates', template);
  }

  public addAccount(account) {
    return this.httpClient.post(this.REST_API_SERVER + '/accounts', account);
  }

  public addApp(app) {
    return this.httpClient.post(this.REST_API_SERVER + '/apps', app);
  }

  public updateTemplate(templateId, template) {
    return this.httpClient.patch(
      this.REST_API_SERVER + '/templates/' + templateId,
      template
    );
  }

  public updateWave(waveId, wave) {
    return this.httpClient.patch(
      this.REST_API_SERVER + '/waves/' + waveId,
      wave
    );
  }

  public updateAccount(accountId, account) {
    return this.httpClient.patch(
      this.REST_API_SERVER + '/accounts/' + accountId,
      account
    );
  }

  public updateApp(appId, app) {
    return this.httpClient.patch(this.REST_API_SERVER + '/apps/' + appId, app);
  }

  public deleteWave(waveId) {
    return this.httpClient.delete(this.REST_API_SERVER + '/waves/' + waveId);
  }

  public deleteTemplate(templateId) {
    return this.httpClient.delete(
      this.REST_API_SERVER + '/templates/' + templateId
    );
  }

  public deleteAccount(accountId) {
    return this.httpClient.delete(
      this.REST_API_SERVER + '/accounts/' + accountId
    );
  }

  public deleteApplication(appId) {
    return this.httpClient.delete(this.REST_API_SERVER + '/apps/' + appId);
  }

  public upload(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient.post(this.REST_API_SERVER, formData);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
