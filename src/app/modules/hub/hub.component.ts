import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TemplateService } from '../templates/services/template.service';
import { WorkflowService } from '../workflows/services/workflow.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss'],
})
export class HubComponent implements OnInit {
  searchKey;
  isTemplateFavouritesCollapsed = false;
  isTemplateCollapsed = false;
  isWorkflowFavouritesCollapsed = false;
  isWorkflowCollapsed = false;

  templates: any[] = [];
  templateFavStatus: boolean[];
  favTemplates: any[] = [];
  workflowFavStatus: boolean[];
  workflows: any[] = [];
  favWorkflows: any[] = [];

  isMobile = false;
  avatarUrl: any;

  public selectedTabIndex: number = 2;

  constructor(
    private dataService: DataService,
    private router: Router,
    private _templateService: TemplateService,
    private _workflowService: WorkflowService,
    private deviceService: DeviceDetectorService,
    private sanitizer: DomSanitizer
  ) {
    this.templateFavStatus = [];
    this.workflowFavStatus = [];
  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();

    this.getTemplates();
    this.getWorkflows();
  }

  getTemplates() {
    // this._templateService.getAllTemplates().subscribe((templates: any)=>{
    //   this.templates = templates;
    // });
    this.dataService.getTemplates().subscribe((templates: any) => {
      this.templates = templates;
    });
  }

  getWorkflows() {
    // this._workflowService.getAllWorkflows().subscribe((waves: any) => {
    //   this.workflows = waves;
    // });
    this.dataService.getWaves().subscribe((waves: any) => {
      this.workflows = waves;
    });
  }

  toggleTemplateFavourite(template, event) {
    event.stopPropagation();
    this.templateFavStatus[template.id] = !this.templateFavStatus[template.id];
    if (this.templateFavStatus[template.id] == true) {
      this.favTemplates.push(template);
      this.templates = this.templates.filter((t) => t.id != template.id);
    } else {
      this.favTemplates = this.favTemplates.filter(
        (ft) => ft.id != template.id
      );
      this.templates.push(template);
    }
  }

  toggleWorkflowFavourite(workflow, event) {
    event.stopPropagation();
    this.workflowFavStatus[workflow.id] = !this.workflowFavStatus[workflow.id];
    if (this.workflowFavStatus[workflow.id] == true) {
      this.favWorkflows.push(workflow);
      this.workflows = this.workflows.filter((t) => t.id != workflow.id);
    } else {
      this.favWorkflows = this.favWorkflows.filter(
        (ft) => ft.id != workflow.id
      );
      this.workflows.push(workflow);
    }
  }

  setBadgeBgColor(stageState = 'Defined') {
    let backgroundColor = '#99a1a9';
    switch (stageState) {
      case 'Defined':
        backgroundColor = '#99a1a9';
        break;
      case 'Configured':
        backgroundColor = '#012b7a';
        break;
      case 'In Progress':
        backgroundColor = '#006bd4';
        break;
      case 'Success':
        backgroundColor = '#0ba73d';
        break;
      case 'Failed':
        backgroundColor = '#d91b1b';
        break;
      case 'Paused':
        backgroundColor = '#fc9528';
        break;
      default:
        break;
    }
    return { backgroundColor };
  }

  goToTemplate(templateId) {
    this.router.navigate([`/templates/${templateId}`], {
      queryParamsHandling: 'merge',
    });
  }

  goToWorkflow(workflowId) {
    this.router.navigate([`/workflows/${workflowId}`], {
      queryParamsHandling: 'merge',
    });
  }

  sanitizeUrl(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
  getTemplateName(templateName){
    let initialLetter;
    let letterArray = [];
    let stringArr = templateName.split(/(?<=^\S+)\s/);
    stringArr.forEach(it => {
      initialLetter = it.substring(1, 0);
      letterArray.push(initialLetter);
    });
    let tempName = letterArray[0] + ' '+ letterArray[1];
    return tempName;
    
  }
}
