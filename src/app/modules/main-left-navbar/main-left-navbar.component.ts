import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
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
    private location: Location,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private dataService: DataService
  ) {
    this.router.events.subscribe((val) => {
      if (location.path().includes("hub")) {
        this.hubSelected = true;
        this.templateSelected = false;
        this.workflowSelected = false;
      } else if (location.path().includes("templates")) {
        this.templateSelected = true;
        this.hubSelected = false;
        this.workflowSelected = false;
      } else if (location.path().includes("workflows")) {
        this.workflowSelected = true;
        this.hubSelected = false;
        this.templateSelected = false;
      }
    });
  }

  ngOnInit() {
    if (this.deviceService.isMobile()) {
      this.mobileDevice = true;
    }
  }

  hubIsSelected() {
    return {
      opacity: this.hubSelected ? 1 : 0.5,
    };
  }

  templateIsSelected() {
    return {
      opacity: this.templateSelected ? 1 : 0.5,
    };
  }

  workflowIsSelected() {
    return {
      opacity: this.workflowSelected ? 1 : 0.7,
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
      desc: "Template Description",
      ver: "templateVersionNumber",
      type: "NONE/TRIGGER/EVENT",
      owner: "TEMPLATE OWNER",
      progress: 10,
      groups: [
        {
          id: 1,
          name: "Infrastructure",
          order: 100,
          statusCd: "Defined",
          progress: 10,
          items: [
            {
              id: 123,
              name: "Create Stack Instance",
              description: "TaskDescription",
              order: 100,
              pluginName: "AWS",
              pluginId: 1,
              serviceId: "1",
              actionId: "1",
              serviceName: "vm",
              actionName: "Create",
              statusCd: "Configured",
              progress: 10,
              keyVault: {
                id: 1,
                name: "AWS",
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: "6/1/2020",
              endDate: "12/11/2020",
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: "before",
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
            {
              id: 456,
              name: "Create Stack Instance 2",
              description: "TaskDescription",
              order: 100,
              pluginName: "AWS",
              pluginId: 1,
              serviceId: "1",
              actionId: "1",
              serviceName: "vm",
              actionName: "Create",
              statusCd: "Configured",
              progress: 10,
              keyVault: {
                id: 1,
                name: "AWS",
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: "6/1/2020",
              endDate: "12/11/2020",
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: "before",
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
            {
              id: 789,
              name: "Create Stack Instance 3",
              description: "TaskDescription",
              order: 100,
              pluginName: "AWS",
              pluginId: 1,
              serviceId: "1",
              actionId: "1",
              serviceName: "vm",
              actionName: "Create",
              statusCd: "Configured",
              progress: 10,
              keyVault: {
                id: 1,
                name: "AWS",
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: "6/1/2020",
              endDate: "12/11/2020",
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: "before",
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
          ],
        },
        {
          id: 2,
          name: "Infrastructure",
          order: 100,
          statusCd: "Defined",
          progress: 10,
          items: [
            {
              id: 123,
              name: "Create Stack Instance",
              description: "TaskDescription",
              order: 100,
              pluginName: "AWS",
              pluginId: 1,
              serviceId: "1",
              actionId: "1",
              serviceName: "vm",
              actionName: "Create",
              statusCd: "Configured",
              progress: 10,
              keyVault: {
                id: 1,
                name: "AWS",
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: "6/1/2020",
              endDate: "12/11/2020",
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: "before",
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
            {
              id: 456,
              name: "Create Stack Instance 2",
              description: "TaskDescription",
              order: 100,
              pluginName: "AWS",
              pluginId: 1,
              serviceId: "1",
              actionId: "1",
              serviceName: "vm",
              actionName: "Create",
              statusCd: "Configured",
              progress: 10,
              keyVault: {
                id: 1,
                name: "AWS",
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: "6/1/2020",
              endDate: "12/11/2020",
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: "before",
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
            {
              id: 789,
              name: "Create Stack Instance 3",
              description: "TaskDescription",
              order: 100,
              pluginName: "AWS",
              pluginId: 1,
              serviceId: "1",
              actionId: "1",
              serviceName: "vm",
              actionName: "Create",
              statusCd: "Configured",
              progress: 10,
              keyVault: {
                id: 1,
                name: "AWS",
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: "6/1/2020",
              endDate: "12/11/2020",
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: "before",
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
          ],
        },
        {
          id: 3,
          name: "Infrastructure",
          order: 100,
          statusCd: "Defined",
          progress: 10,
          items: [
            {
              id: 123,
              name: "Create Stack Instance",
              description: "TaskDescription",
              order: 100,
              pluginName: "AWS",
              pluginId: 1,
              serviceId: "1",
              actionId: "1",
              serviceName: "vm",
              actionName: "Create",
              statusCd: "Configured",
              progress: 10,
              keyVault: {
                id: 1,
                name: "AWS",
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: "6/1/2020",
              endDate: "12/11/2020",
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: "before",
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
            {
              id: 456,
              name: "Create Stack Instance 2",
              description: "TaskDescription",
              order: 100,
              pluginName: "AWS",
              pluginId: 1,
              serviceId: "1",
              actionId: "1",
              serviceName: "vm",
              actionName: "Create",
              statusCd: "Configured",
              progress: 10,
              keyVault: {
                id: 1,
                name: "AWS",
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: "6/1/2020",
              endDate: "12/11/2020",
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: "before",
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
            {
              id: 789,
              name: "Create Stack Instance 3",
              description: "TaskDescription",
              order: 100,
              pluginName: "AWS",
              pluginId: 1,
              serviceId: "1",
              actionId: "1",
              serviceName: "vm",
              actionName: "Create",
              statusCd: "Configured",
              progress: 10,
              keyVault: {
                id: 1,
                name: "AWS",
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: "6/1/2020",
              endDate: "12/11/2020",
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: "before",
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
          ],
        },
      ],
      tags: [
        {
          id: 1,
          name: "Name1",
          value: "Value1",
          modifiedDate: "2020-06-12T14:29:18",
        },
      ],
      modifiedDate: "2020-06-12T14:29:18",
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
      desc: "Workflow Desc",
      ver: "workflowVersionNumber",
      type: "TRIGGER/EVENT",
      owner: "Workflow OWNER",
      progress: 10,
      groups: [
        {
          id: 123,
          name: "App1",
          order: 100,
          statusCd: "Defined",
          progress: 10,
          items: [
            {
              id: 1,
              name: "TemplateName by User",
              desc: "template Desc by User",
              order: 100,
              statusCd: "Defined",
              progress: 10,
            },
            {
              id: 2,
              name: "TemplateName by User 1",
              desc: "template Desc by User",
              order: 100,
              statusCd: "Defined",
              progress: 10,
            },
            {
              id: 3,
              name: "TemplateName by User",
              desc: "template Desc by User",
              order: 100,
              statusCd: "Defined",
              progress: 10,
            },
          ],
        },
        {
          id: 123,
          name: "App1",
          order: 100,
          statusCd: "Defined",
          progress: 10,
          items: [
            {
              id: 1,
              name: "TemplateName by User",
              desc: "template Desc by User",
              order: 100,
              statusCd: "Defined",
              progress: 10,
            },
            {
              id: 2,
              name: "TemplateName by User",
              desc: "template Desc by User",
              order: 100,
              statusCd: "Defined",
              progress: 10,
            },
            {
              id: 3,
              name: "TemplateName by User",
              desc: "template Desc by User",
              order: 100,
              statusCd: "Defined",
              progress: 10,
            },
          ],
        },
        {
          id: 123,
          name: "App1",
          order: 100,
          statusCd: "Defined",
          progress: 10,
          items: [
            {
              id: 1,
              name: "TemplateName by User",
              desc: "template Desc by User",
              order: 100,
              statusCd: "Defined",
              progress: 10,
            },
            {
              id: 2,
              name: "TemplateName by User",
              desc: "template Desc by User",
              order: 100,
              statusCd: "Defined",
              progress: 10,
            },
            {
              id: 3,
              name: "TemplateName by User",
              desc: "template Desc by User",
              order: 100,
              statusCd: "Defined",
              progress: 10,
            },
          ],
        },
      ],
      tags: [
        {
          id: 1,
          name: "Name1",
          value: "Value1",
          modifiedDate: "2020-06-12T14:29:18",
        },
      ],
      keyVault: [
        {
          id: 1,
          name: "AWS",
          credentials: [
            {
              id: 1,
              name: "awsacc1",
            },
          ],
        },
        {
          id: 2,
          name: "Jenkins",
          credentials: [
            {
              id: 1,
              name: "jenkinsacc1",
            },
          ],
        },
      ],
    };
    this.dataService.addWave(newWorkflow).subscribe((res: any) => {
      this.router.navigate([`/workflows/${res.id}`]);
    });
  }
}
