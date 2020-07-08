import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

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

  constructor(
    private dataService: DataService,
    private router: Router,
    private deviceService: DeviceDetectorService
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
    this.dataService.getTemplates().subscribe((templates: any) => {
      this.templates = templates;
    });
  }

  getWorkflows() {
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
      preserveQueryParams: true,
    });
  }

  goToWorkflow(workflowId) {
    this.router.navigate([`/workflows/${workflowId}`], {
      preserveQueryParams: true,
    });
  }
}
