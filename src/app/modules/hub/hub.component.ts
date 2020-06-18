import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services/data.service";
import { Router } from "@angular/router";
import { DeviceDetectorService } from "ngx-device-detector";

@Component({
  selector: "app-hub",
  templateUrl: "./hub.component.html",
  styleUrls: ["./hub.component.scss"],
})
export class HubComponent implements OnInit {
  searchKey;
  isTemplateFavouritesCollapsed: false;
  isTemplateCollapsed: false;
  isWorkflowFavouritesCollapsed: false;
  isWorkflowCollapsed: false;

  templates: any[] = [];
  workflows: any[] = [];

  isMobile = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {}

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

  setBadgeBgColor(stageState = "Defined") {
    let backgroundColor = "#99a1a9";
    switch (stageState) {
      case "Defined":
        backgroundColor = "#99a1a9";
        break;
      case "Configured":
        backgroundColor = "#012b7a";
        break;
      case "In Progress":
        backgroundColor = "#006bd4";
        break;
      case "Success":
        backgroundColor = "#0ba73d";
        break;
      case "Failed":
        backgroundColor = "#d91b1b";
        break;
      case "Paused":
        backgroundColor = "#fc9528";
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

  /**
   *
   * @description searches the wavelist using the search key
   */

  search(e) {
    // if (!this.searchKey) {
    //   this.templates = this.rawtemplates;
    //   return true;
    // }
    // this.templates = this.rawtemplates.filter((x) => {
    //   return x.name.toLowerCase().search(this.searchKey.toLowerCase()) !== -1;
    // });
  }
}
