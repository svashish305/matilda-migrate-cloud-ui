import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private REST_API_SERVER = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  public getWaves() {
    return this.httpClient.get(this.REST_API_SERVER + "/waves");
  }

  public getTemplates() {
    return this.httpClient.get(this.REST_API_SERVER + "/templates");
  }

  public getStages() {
    return this.httpClient.get(this.REST_API_SERVER + "/stages");
  }

  public getTasks() {
    return this.httpClient.get(this.REST_API_SERVER + "/tasks");
  }

  public getAccounts() {
    return this.httpClient.get(this.REST_API_SERVER + "/accounts");
  }

  public getWave(waveId) {
    return this.httpClient.get(this.REST_API_SERVER + `/waves/${waveId}`);
  }

  public getTemplate(templateId) {
    return this.httpClient.get(
      this.REST_API_SERVER + `/templates/${templateId}`
    );
  }

  public getStage(stageId) {
    return this.httpClient.get(this.REST_API_SERVER + `/stages/${stageId}`);
  }

  public getTask(taskId) {
    return this.httpClient.get(this.REST_API_SERVER + `/tasks/${taskId}`);
  }

  public getAccount(accountId) {
    return this.httpClient.get(this.REST_API_SERVER + `/accounts/${accountId}`);
  }

  public addWave(wave) {
    return this.httpClient.post(this.REST_API_SERVER + "/waves", wave);
  }

  public addTemplate(template) {
    return this.httpClient.post(this.REST_API_SERVER + "/templates", template);
  }

  public addStage(stage) {
    return this.httpClient.post(this.REST_API_SERVER + "/stages", stage);
  }

  public addTask(task) {
    return this.httpClient.post(this.REST_API_SERVER + "/tasks", task);
  }

  public addAccount(account) {
    return this.httpClient.post(this.REST_API_SERVER + "/accounts", account);
  }

  public updateTemplate(templateId, template) {
    return this.httpClient.patch(
      this.REST_API_SERVER + "/templates/" + templateId,
      template
    );
  }

  public updateWave(waveId, wave) {
    return this.httpClient.patch(
      this.REST_API_SERVER + "/waves/" + waveId,
      wave
    );
  }

  public updateAccount(accountId, account) {
    return this.httpClient.patch(
      this.REST_API_SERVER + "/accounts/" + accountId,
      account
    );
  }

  public deleteWave(waveId) {
    return this.httpClient.delete(this.REST_API_SERVER + "/waves/" + waveId);
  }

  public deleteTemplate(templateId) {
    return this.httpClient.delete(
      this.REST_API_SERVER + "/templates/" + templateId
    );
  }

  public deleteStage(stageId) {
    return this.httpClient.delete(this.REST_API_SERVER + "/stages/" + stageId);
  }

  public deleteTask(taskId) {
    return this.httpClient.delete(this.REST_API_SERVER + "/tasks/" + taskId);
  }

  public deleteAccount(accountId) {
    return this.httpClient.delete(
      this.REST_API_SERVER + "/accounts/" + accountId
    );
  }

  public upload(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append("fileKey", fileToUpload, fileToUpload.name);
    return this.httpClient.post(this.REST_API_SERVER, formData);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknown error!";
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
