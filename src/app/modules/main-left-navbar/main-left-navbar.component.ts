import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DataService } from 'src/services/data.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-main-left-navbar',
  templateUrl: './main-left-navbar.component.html',
  styleUrls: ['./main-left-navbar.component.scss'],
})
export class MainLeftNavbarComponent implements OnInit {
  isMigrateCollapsed = true;
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
      if (location.path().includes('hub')) {
        this.isMigrateCollapsed = false;
        this.hubSelected = true;
        this.templateSelected = false;
        this.workflowSelected = false;
      } else if (location.path().includes('templates')) {
        this.isMigrateCollapsed = false;
        this.templateSelected = true;
        this.hubSelected = false;
        this.workflowSelected = false;
      } else if (location.path().includes('workflows')) {
        this.isMigrateCollapsed = false;
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

  rotateOnClick(migrateCollapsed) {
    let transform;
    if (migrateCollapsed) {
      transform = 'rotate(0deg)';
    } else {
      transform = 'rotate(180deg)';
    }
    return {
      transform,
    };
  }

  isSelected(selected) {
    return {
      opacity: selected ? 1 : 0.5,
    };
  }

  workflowIsSelected() {
    return {
      opacity: this.workflowSelected ? 1 : 0.7,
    };
  }

  setActiveColor(selected) {
    return {
      color: selected ? '#fff' : '#012b7a',
    };
  }

  addActiveInd(selected) {
    return {
      borderRight: selected ? '3px solid white' : 'none',
      backgroundColor: selected ? 'cornflowerblue' : 'initial',
    };
  }

  addTemplate() {
    const id = uuid.v4();
    const newTemplate = {
      id: id,
      name: 'Untitled Template',
      desc: 'Template Description',
      ver: 'templateVersionNumber',
      type: 'NONE/TRIGGER/EVENT',
      owner: 'TEMPLATE OWNER',
      progress: 10,
      status: 'Defined',
      statusCode: 1,
      groups: [
        {
          id: 1234,
          name: 'Infrastructure',
          order: 100,
          status: 'Defined',
          statusCode: 1,
          progress: 10,
          items: [
            {
              id: 123,
              name: 'Create Stack Instance',
              description: 'TaskDescription',
              order: 100,
              pluginName: 'AWS',
              pluginId: 1,
              serviceId: '1',
              actionId: '1',
              serviceName: 'vm',
              actionName: 'Create',
              status: 'Configured',
              statusCode: 2,
              progress: 10,
              keyVault: {
                id: 1,
                name: 'AWS',
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: '6/1/2020',
              endDate: '12/11/2020',
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: 'before',
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
            {
              id: 456,
              name: 'Create Stack Instance 2',
              description: 'TaskDescription',
              order: 100,
              pluginName: 'AWS',
              pluginId: 1,
              serviceId: '1',
              actionId: '1',
              serviceName: 'vm',
              actionName: 'Create',
              status: 'Configured',
              statusCode: 2,
              progress: 10,
              keyVault: {
                id: 1,
                name: 'AWS',
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: '6/1/2020',
              endDate: '12/11/2020',
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: 'before',
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
            {
              id: 789,
              name: 'Create Stack Instance 3',
              description: 'TaskDescription',
              order: 100,
              pluginName: 'AWS',
              pluginId: 1,
              serviceId: '1',
              actionId: '1',
              serviceName: 'vm',
              actionName: 'Create',
              status: 'Configured',
              statusCode: 2,
              progress: 10,
              keyVault: {
                id: 1,
                name: 'AWS',
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: '6/1/2020',
              endDate: '12/11/2020',
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: 'before',
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
          ],
        },
        {
          id: 4567,
          name: 'Infrastructure 2',
          order: 100,
          status: 'Defined',
          statusCode: 1,
          progress: 10,
          items: [
            {
              id: 123,
              name: 'Create Stack Instance',
              description: 'TaskDescription',
              order: 100,
              pluginName: 'AWS',
              pluginId: 1,
              serviceId: '1',
              actionId: '1',
              serviceName: 'vm',
              actionName: 'Create',
              status: 'Configured',
              statusCode: 2,
              progress: 10,
              keyVault: {
                id: 1,
                name: 'AWS',
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: '6/1/2020',
              endDate: '12/11/2020',
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: 'before',
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
            {
              id: 456,
              name: 'Create Stack Instance 2',
              description: 'TaskDescription',
              order: 100,
              pluginName: 'AWS',
              pluginId: 1,
              serviceId: '1',
              actionId: '1',
              serviceName: 'vm',
              actionName: 'Create',
              status: 'Configured',
              statusCode: 2,
              progress: 10,
              keyVault: {
                id: 1,
                name: 'AWS',
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: '6/1/2020',
              endDate: '12/11/2020',
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: 'before',
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
            {
              id: 789,
              name: 'Create Stack Instance 3',
              description: 'TaskDescription',
              order: 100,
              pluginName: 'AWS',
              pluginId: 1,
              serviceId: '1',
              actionId: '1',
              serviceName: 'vm',
              actionName: 'Create',
              status: 'Configured',
              statusCode: 2,
              progress: 10,
              keyVault: {
                id: 1,
                name: 'AWS',
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: '6/1/2020',
              endDate: '12/11/2020',
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: 'before',
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
          ],
        },
        {
          id: 6789,
          name: 'Infrastructure 3',
          order: 100,
          status: 'Defined',
          statusCode: 1,
          progress: 10,
          items: [
            {
              id: 123,
              name: 'Create Stack Instance',
              description: 'TaskDescription',
              order: 100,
              pluginName: 'AWS',
              pluginId: 1,
              serviceId: '1',
              actionId: '1',
              serviceName: 'vm',
              actionName: 'Create',
              status: 'Configured',
              statusCode: 2,
              progress: 10,
              keyVault: {
                id: 1,
                name: 'AWS',
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: '6/1/2020',
              endDate: '12/11/2020',
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: 'before',
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
            {
              id: 456,
              name: 'Create Stack Instance 2',
              description: 'TaskDescription',
              order: 100,
              pluginName: 'AWS',
              pluginId: 1,
              serviceId: '1',
              actionId: '1',
              serviceName: 'vm',
              actionName: 'Create',
              status: 'Configured',
              statusCode: 2,
              progress: 10,
              keyVault: {
                id: 1,
                name: 'AWS',
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: '6/1/2020',
              endDate: '12/11/2020',
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: 'before',
                },
              ],
              notification:
                '{"type":"email/hook","id":"1","payload":"emailid/url"}',
            },
            {
              id: 789,
              name: 'Create Stack Instance 3',
              description: 'TaskDescription',
              order: 100,
              pluginName: 'AWS',
              pluginId: 1,
              serviceId: '1',
              actionId: '1',
              serviceName: 'vm',
              actionName: 'Create',
              status: 'Configured',
              statusCode: 2,
              progress: 10,
              keyVault: {
                id: 1,
                name: 'AWS',
              },
              input:
                '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
              output: null,
              startDate: '6/1/2020',
              endDate: '12/11/2020',
              duration: null,
              dependencies: [
                {
                  groupId: 1234,
                  taskId: 345345,
                  mode: 'before',
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
          name: 'Name1',
          value: 'Value1',
          modifiedDate: '2020-06-12T14:29:18',
        },
      ],
      modifiedDate: '2020-06-12T14:29:18',
    };

    this.dataService.addTemplate(newTemplate).subscribe((res: any) => {
      this.router.navigate([`/templates/${res.id}`]);
    });
  }

  addWorkflow() {
    const id = uuid.v4();
    const newWorkflow = {
      id: id,
      name: 'Untitled Workflow',
      desc: 'Workflow Desc',
      ver: 'workflowVersionNumber',
      type: 'TRIGGER/EVENT',
      owner: 'Workflow OWNER',
      progress: 10,
      groups: [
        {
          id: 123,
          name: 'App1',
          order: 100,
          status: 'Defined',
          statusCode: 1,
          progress: 10,
          items: [
            {
              id: '1',
              name: 'Template 1',
              desc: 'Template Description',
              ver: 'templateVersionNumber',
              type: 'NONE/TRIGGER/EVENT',
              owner: 'TEMPLATE OWNER',
              progress: 10,
              status: 'Defined',
              statusCode: 1,
              order: 100,
              groups: [
                {
                  id: 1234,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 4567,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 6789,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
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
                  name: 'Name1',
                  value: 'Value1',
                  modifiedDate: '2020-06-12T14:29:18',
                },
              ],
              modifiedDate: '2020-06-12T14:29:18',
            },
            {
              id: '2',
              name: 'Template 2',
              desc: 'Template Description',
              ver: 'templateVersionNumber',
              type: 'NONE/TRIGGER/EVENT',
              owner: 'TEMPLATE OWNER',
              progress: 10,
              status: 'Defined',
              statusCode: 1,
              order: 100,
              groups: [
                {
                  id: 1234,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 4567,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 6789,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
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
                  name: 'Name1',
                  value: 'Value1',
                  modifiedDate: '2020-06-12T14:29:18',
                },
              ],
              modifiedDate: '2020-06-12T14:29:18',
            },
            {
              id: '3',
              name: 'Template 3',
              desc: 'Template Description',
              ver: 'templateVersionNumber',
              type: 'NONE/TRIGGER/EVENT',
              owner: 'TEMPLATE OWNER',
              progress: 10,
              status: 'Defined',
              statusCode: 1,
              order: 100,
              groups: [
                {
                  id: 1234,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 4567,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 6789,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
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
                  name: 'Name1',
                  value: 'Value1',
                  modifiedDate: '2020-06-12T14:29:18',
                },
              ],
              modifiedDate: '2020-06-12T14:29:18',
            },
          ],
        },
        {
          id: 123,
          name: 'App2',
          order: 100,
          status: 'Defined',
          statusCode: 1,
          progress: 10,
          items: [
            {
              id: '1',
              name: 'Template 1',
              desc: 'Template Description',
              ver: 'templateVersionNumber',
              type: 'NONE/TRIGGER/EVENT',
              owner: 'TEMPLATE OWNER',
              progress: 10,
              status: 'Defined',
              statusCode: 1,
              order: 100,
              groups: [
                {
                  id: 1234,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 4567,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 6789,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
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
                  name: 'Name1',
                  value: 'Value1',
                  modifiedDate: '2020-06-12T14:29:18',
                },
              ],
              modifiedDate: '2020-06-12T14:29:18',
            },
            {
              id: '2',
              name: 'Template 2',
              desc: 'Template Description',
              ver: 'templateVersionNumber',
              type: 'NONE/TRIGGER/EVENT',
              owner: 'TEMPLATE OWNER',
              progress: 10,
              status: 'Defined',
              statusCode: 1,
              order: 100,
              groups: [
                {
                  id: 1234,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 4567,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 6789,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
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
                  name: 'Name1',
                  value: 'Value1',
                  modifiedDate: '2020-06-12T14:29:18',
                },
              ],
              modifiedDate: '2020-06-12T14:29:18',
            },
            {
              id: '3',
              name: 'Template 3',
              desc: 'Template Description',
              ver: 'templateVersionNumber',
              type: 'NONE/TRIGGER/EVENT',
              owner: 'TEMPLATE OWNER',
              progress: 10,
              status: 'Defined',
              statusCode: 1,
              order: 100,
              groups: [
                {
                  id: 1234,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 4567,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 6789,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
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
                  name: 'Name1',
                  value: 'Value1',
                  modifiedDate: '2020-06-12T14:29:18',
                },
              ],
              modifiedDate: '2020-06-12T14:29:18',
            },
          ],
        },
        {
          id: 123,
          name: 'App1',
          order: 100,
          status: 'Defined',
          statusCode: 1,
          progress: 10,
          items: [
            {
              id: '1',
              name: 'Template 1',
              desc: 'Template Description',
              ver: 'templateVersionNumber',
              type: 'NONE/TRIGGER/EVENT',
              owner: 'TEMPLATE OWNER',
              progress: 10,
              status: 'Defined',
              statusCode: 1,
              order: 100,
              groups: [
                {
                  id: 1234,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 4567,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 6789,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
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
                  name: 'Name1',
                  value: 'Value1',
                  modifiedDate: '2020-06-12T14:29:18',
                },
              ],
              modifiedDate: '2020-06-12T14:29:18',
            },
            {
              id: '2',
              name: 'Template 2',
              desc: 'Template Description',
              ver: 'templateVersionNumber',
              type: 'NONE/TRIGGER/EVENT',
              owner: 'TEMPLATE OWNER',
              progress: 10,
              status: 'Defined',
              statusCode: 1,
              order: 100,
              groups: [
                {
                  id: 1234,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 4567,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 6789,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
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
                  name: 'Name1',
                  value: 'Value1',
                  modifiedDate: '2020-06-12T14:29:18',
                },
              ],
              modifiedDate: '2020-06-12T14:29:18',
            },
            {
              id: '3',
              name: 'Template 3',
              desc: 'Template Description',
              ver: 'templateVersionNumber',
              type: 'NONE/TRIGGER/EVENT',
              owner: 'TEMPLATE OWNER',
              progress: 10,
              status: 'Defined',
              statusCode: 1,
              order: 100,
              groups: [
                {
                  id: 1234,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 4567,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                  ],
                },
                {
                  id: 6789,
                  name: 'Infrastructure',
                  order: 100,
                  status: 'Defined',
                  statusCode: 1,
                  progress: 10,
                  items: [
                    {
                      id: 123,
                      name: 'Create Stack Instance',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 456,
                      name: 'Create Stack Instance 2',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
                        },
                      ],
                      notification:
                        '{"type":"email/hook","id":"1","payload":"emailid/url"}',
                    },
                    {
                      id: 789,
                      name: 'Create Stack Instance 3',
                      description: 'TaskDescription',
                      order: 100,
                      pluginName: 'AWS',
                      pluginId: 1,
                      serviceId: '1',
                      actionId: '1',
                      serviceName: 'vm',
                      actionName: 'Create',
                      status: 'Configured',
                      statusCode: 2,
                      progress: 10,
                      keyVault: {
                        id: 1,
                        name: 'AWS',
                      },
                      input:
                        '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
                      output: null,
                      startDate: '6/1/2020',
                      endDate: '12/11/2020',
                      duration: null,
                      dependencies: [
                        {
                          groupId: 1234,
                          taskId: 345345,
                          mode: 'before',
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
                  name: 'Name1',
                  value: 'Value1',
                  modifiedDate: '2020-06-12T14:29:18',
                },
              ],
              modifiedDate: '2020-06-12T14:29:18',
            },
          ],
        },
      ],
      tags: [
        {
          id: 1,
          name: 'Name1',
          value: 'Value1',
          modifiedDate: '2020-06-12T14:29:18',
        },
      ],
      keyVault: [
        {
          id: 1,
          name: 'AWS',
          credentials: [
            {
              id: 1,
              name: 'awsacc1',
            },
          ],
        },
        {
          id: 2,
          name: 'Jenkins',
          credentials: [
            {
              id: 1,
              name: 'jenkinsacc1',
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
