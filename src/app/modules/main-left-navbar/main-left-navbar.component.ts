import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DeviceDetectorService } from "ngx-device-detector";
import { DataService } from "src/services/data.service";
import * as uuid from "uuid";

@Component({
  selector: "app-main-left-navbar",
  templateUrl: "./main-left-navbar.component.html",
  styleUrls: ["./main-left-navbar.component.scss"],
})
export class MainLeftNavbarComponent implements OnInit {
  isCollapsed = true;

  hubSelected = false;
  templateSelected = false;
  workflowSelected = false;

  mobileDevice = false;

  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    if (this.deviceService.isMobile()) {
      this.mobileDevice = true;
    }

    if (this.router.url.includes("hub")) {
      this.hubSelected = true;
    } else if (this.router.url.includes("templates")) {
      this.templateSelected = true;
    } else if (this.router.url.includes("workflows")) {
      this.workflowSelected = true;
    }
  }

  hubIsSelected() {
    return {
      opacity: this.hubSelected ? 1 : 0.3,
    };
  }

  templateIsSelected() {
    return {
      opacity: this.templateSelected ? 1 : 0.3,
    };
  }

  workflowIsSelected() {
    return {
      opacity: this.workflowSelected ? 1 : 0.3,
    };
  }

  setHubActiveColor() {
    return {
      color: this.hubSelected ? "#fff" : "#012b7a",
    };
  }

  setTemplateActiveColor() {
    return {
      color: this.templateSelected ? "#fff" : "#012b7a",
    };
  }

  setWorkflowActiveColor() {
    return {
      color: this.workflowSelected ? "#fff" : "#012b7a",
    };
  }

  addHubActiveInd() {
    return {
      borderRight: this.hubSelected ? "3px solid white" : "none",
    };
  }

  addTemplateActiveInd() {
    return {
      borderRight: this.templateSelected ? "3px solid white" : "none",
    };
  }

  addWorkflowActiveInd() {
    return {
      borderRight: this.workflowSelected ? "3px solid white" : "none",
    };
  }

  addTemplate() {
    const id = uuid.v4();
    const newTemplate = {
      id: id,
      name: "Untitled Template",
      data: {
        id: id,
        name: "Untitled Template",
        description: "Default Description",
        status: "Configured",
        progressPercentage: 50,
      },
    };
    this.dataService.addTemplate(newTemplate).subscribe((res: any) => {
      this.router.navigate([`/templates/${res.id}`]);
    });
  }

  addWorkflow() {
    const id = uuid.v4();
    const newWorkflow = {
      id: id,
      name: "Untitled Workflow",
      data: {
        name: "Untitled Workflow",
        description: "Default Wave Description",
        waveTypes: [
          {
            id: "1",
            name: "Wave1-APP",
            triggerType: "Normal",
            status: "Configured",
            progressPercentage: 50,
            collapsed: false,
            templates: [
              {
                id: 1,
                name: "Tomcat",
                description: "Tomcat Install Configuration",
                data: {
                  id: 1,
                  name: "Tomcat",
                  description: "Tomcat Install Configuration",
                },
                status: "Configured",
                progressPercentage: 50,
                startDate: "2 April 2020",
                endDate: "14 April 2020",
              },
              {
                id: 2,
                name: "Sqlserver install",
                description: "Install Configuration",
                data: {
                  id: 2,
                  name: "Sqlserver install",
                  description: "Install Configuration",
                },
                status: "Configured",
                progressPercentage: 50,
                startDate: "2 April 2020",
                endDate: "14 April 2020",
              },
              {
                id: 3,
                name: "Template Name Application VM creation",
                description: "Install Configuration",
                data: {
                  id: 3,
                  name: "Template Name Application VM creation",
                  description: "Install Configuration",
                },
                status: "Configured",
                progressPercentage: 50,
                startDate: "31 March 2020",
                endDate: "9 April 2020",
              },
            ],
          },
          {
            id: "2",
            name: "Wave1-DB",
            status: "Configured",
            progressPercentage: 50,
            collapsed: false,
            triggerType: "Event",
            templates: [
              {
                id: 1,
                name: "Data factory",
                description: "Factory Install Steps",
                data: {
                  id: 1,
                  name: "Data factory",
                  description: "Factory Install Steps",
                },
                status: "Configured",
                progressPercentage: 50,
                startDate: "4 April 2020",
                endDate: "20 April 2020",
              },
              {
                id: 2,
                name: "Data Warehouse configuration",
                description: "DB Install Configuration",
                data: {
                  id: 2,
                  name: "Data Warehouse configuration",
                  description: "DB Install Configuration",
                },
                status: "Configured",
                progressPercentage: 50,
                startDate: "2 April 2020",
                endDate: "15 April 2020",
              },
            ],
          },
          {
            id: "3",
            name: "Wave1-Testing",
            status: "Configured",
            progressPercentage: 50,
            collapsed: false,
            triggerType: "Schedule | Every Monday 2 PM IST",
            templates: [
              {
                id: 1,
                name: "Post deployment validation",
                status: "Success",
                progressPercentage: 100,
                startDate: "Apr 15",
                endDate: "Apr 15",
              },
              {
                id: 2,
                name: "Security Scan infra",
                status: "Failed",
                progressPercentage: 0,
                startDate: "",
                endDate: "",
              },
            ],
          },
          {
            id: "4",
            name: "Wave1-Testing2",
            status: "Configured",
            progressPercentage: 50,
            collapsed: false,
            triggerType: "Normal",
            templates: [
              {
                id: 1,
                name: "Post deployment validation",
                status: "Configured",
                progressPercentage: 50,
                startDate: "Apr 15",
                endDate: "Apr 15",
              },
              {
                id: 2,
                name: "Security Scan infra",
                status: "Configured",
                progressPercentage: 50,
                startDate: "",
                endDate: "",
              },
            ],
          },
        ],
      },
    };
    this.dataService.addWave(newWorkflow).subscribe((res: any) => {
      this.router.navigate([`/workflows/${res.id}`]);
    });
  }
}
