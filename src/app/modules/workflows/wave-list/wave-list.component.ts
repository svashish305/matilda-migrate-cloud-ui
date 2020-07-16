import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { DataService } from 'src/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { StatusCodes } from 'src/app/enums/enums';

interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-wave-list',
  templateUrl: './wave-list.component.html',
  styleUrls: ['./wave-list.component.scss'],
})
export class WaveListComponent implements OnInit {
  @Input() waveData: any = {};
  @Output() rowClicked: EventEmitter<any> = new EventEmitter();

  edit;
  searchKey;
  showBackdrop;
  @ViewChild('waveList') waveList;

  rawwaves: any[] = [];
  waves: any[] = [];
  accounts: any[] = [];
  accountCollapseState: Map<any, boolean> = new Map();
  selectedAccount: any;

  editAccountFormGroup: FormGroup;
  accountProvider: any;
  accountName: string;
  accountClientID: any;
  accountRegion: any;

  rightSidebarToggleState: boolean = false;
  selectedTemplateInSidebar: any;

  providers: SelectInterface[] = [
    { value: 'AWS', viewValue: 'AWS' },
    { value: 'p-1', viewValue: 'Pizza' },
    { value: 'p-2', viewValue: 'Tacos' },
  ];

  workflowTypes: SelectInterface[] = [
    { value: 'time', viewValue: 'Time' },
    { value: 'trigger', viewValue: 'Trigger' },
  ];

  selectedWorkflowType: any;

  primaryColor: ThemePalette = 'primary';

  drag = true;
  groupCollapseList: boolean[];

  isMobile = false;

  statusCodes = StatusCodes;

  constructor(
    private dataService: DataService,
    private deviceService: DeviceDetectorService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.groupCollapseList = [];
  }

  ngOnInit() {
    console.log('wavedata ', this.waveData);

    this.selectedWorkflowType = this.workflowTypes[0].value;

    this.getWaves();
    this.getAccounts();

    this.isMobile = this.deviceService.isMobile();
  }

  getWaves() {
    this.dataService.getWaves().subscribe((data: any[]) => {
      this.rawwaves = data;
      this.waves = data;
    });
  }

  getAccounts() {
    this.dataService.getAccounts().subscribe((data: any[]) => {
      this.accounts = data;
    });
  }

  getWorkflowType() {
    this.waveData.type = this.selectedWorkflowType;
    return this.selectedWorkflowType;
  }

  optionClicked(wfType) {
    this.waveData.type = wfType;
    this.dataService
      .updateTemplate(this.waveData.id, this.waveData)
      .subscribe((newWave: any) => {
        console.log('new wave type ', newWave.type);
      });
  }

  setBadgeBgColor(statusCode = 1) {
    let backgroundColor = '#99a1a9';
    switch (statusCode) {
      case 1:
        backgroundColor = '#99a1a9';
        break;
      case 2:
        backgroundColor = '#012b7a';
        break;
      case 3:
        backgroundColor = '#006bd4';
        break;
      case 4:
        backgroundColor = '#0ba73d';
        break;
      case 5:
        backgroundColor = '#d91b1b';
        break;
      case 6:
        backgroundColor = '#fc9528';
        break;
      default:
        break;
    }
    return { backgroundColor };
  }

  toggleWorkflowHeight(collapsed) {
    let height;
    if (this.isMobile) {
      if (collapsed) {
        height = '0';
      } else {
        height = '5.563em';
      }
    } else {
      if (collapsed) {
        height = '1em';
      } else {
        height = '5.563em';
      }
    }
    return { height };
  }

  collapseAll(checked: boolean) {
    if (checked) {
      for (let i = 0; i < this.waveData.groups.length; i++) {
        this.groupCollapseList[i] = true;
      }
    } else {
      for (let i = 0; i < this.waveData.groups.length; i++) {
        this.groupCollapseList[i] = false;
      }
    }
  }

  onCheck(event) {
    event.stopPropagation();
  }

  toggleHeight(accountId) {
    let height;
    if (this.accountCollapseState[accountId]) {
      height = '18.125em';
    }
    return { height };
  }

  openDialog(template: TemplateRef<any>) {
    const dialogRef = this.dialog.open(template, {
      width: '36.1111111%',
      height: '66.3333333%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditAccountModal(template: TemplateRef<any>, accountId) {
    this.dataService.getAccount(accountId).subscribe((res) => {
      this.selectedAccount = res;

      this.accountName = this.selectedAccount.name;
      this.accountProvider = this.selectedAccount.data.provider;
      this.accountClientID = this.selectedAccount.data.clientID;
      this.accountRegion = this.selectedAccount.data.region;

      const dialogRef = this.dialog.open(template, {
        width: '36.1111111%',
        height: '66.3333333%',
        data: {
          selectedAccount: this.selectedAccount,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }

  editAccount(accountId) {
    const updatedAccount = {
      name: this.accountName,
      data: {
        provider: this.accountProvider,
        clientID: this.accountClientID,
        region: this.accountRegion,
      },
    };
    this.dataService
      .updateAccount(accountId, updatedAccount)
      .subscribe((res: any) => {
        console.log('updated account details ', updatedAccount);
      });
  }

  toggleRightSidebar(template: any) {
    this.rightSidebarToggleState = !this.rightSidebarToggleState;
    this.selectedTemplateInSidebar = template;
  }

  /**
   *
   * @description triggers when resize is released
   */
  onResizeEnd(event) {
    console.log(event);
    this.appyResize(event);
  }

  /**
   *
   * @description resizes the template details container
   */
  appyResize(event?) {
    const wrapperWidth = document.getElementById('wave-content-id').offsetWidth;
    const templateHolder = document.getElementById('template-holder');
    const contentHolder = document.getElementById('wave-main-content');
    let width;
    if (templateHolder) {
      const resizerWidth = templateHolder.offsetWidth;
      width = event ? resizerWidth - event.edges.left : 430;
      templateHolder.style.width = width + 'px';
    } else {
      width = 0;
    }
  }

  /**
   *
   * @param edit - edit specifies whether user is editing or not
   * @description opens or closes the template details
   */
  openDetails(edit) {
    this.edit = edit;
    if (!edit) {
      this.showBackdrop = false;
      this.waveData.groups.forEach((waveType) => {
        waveType.templates.forEach((template) => {
          template.selected = false;
        });
      });
    }
    setTimeout(() => {
      this.appyResize();
    }, 0);
  }

  /**
   *
   * @description Adds new group to wave
   */
  addNewGroup() {
    console.log(this.waveList);
    const id = Math.random().toString(6);
    this.waveData.groups.unshift({
      id: id,
      name: 'New group',
      theme: this.waveList.getRandomColor(),
      edit: true,
      templates: [],
    });
  }

  /**
   *
   * @description generates new color for groups
   */
  getRandomColor() {
    return '#' + Math.random().toString(16).substr(-6);
  }

  /**
   *
   * @description reorders the template to other groups or within the groups
   */
  drop(event: CdkDragDrop<string[]>) {
    let template: any = event.container.data[event.previousIndex];
    console.log('order before drag ', template.order);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    if (event.currentIndex === 0) {
      if (event.container.data.length > 0) {
        if (event.container.data.length !== event.currentIndex + 1) {
          template.order =
            0 + event.container.data[event.currentIndex + 1]['order'] / 2;
        } else {
          template.order = 100;
        }
      } else {
        template.order = 100;
      }
    } else if (event.currentIndex === event.container.data.length - 1) {
      template.order =
        100 + event.container.data[event.container.data.length - 2]['order'];
    } else {
      template.order =
        (event.container.data[event.currentIndex - 1]['order'] +
          event.container.data[event.currentIndex + 1]['order']) /
        2;
    }
    console.log('order after drag ', template.order);
  }

  /**
   *
   * @description reorders groups
   */
  mainDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.waveData.groups,
      event.previousIndex,
      event.currentIndex
    );
  }

  /**
   *
   * @param template - for which the details has to be shown
   * @description emits event to open template details
   */
  rowClick(template) {
    this.router.navigate([
      `workflows/${this.waveData.id}/templates/${template.id}`,
    ]);
    this.rowClicked.emit(true);
    console.log('row clicked');
  }

  /**
   *
   * @param waveType - for which new template has to be added
   * @description Adds new template to group
   */
  addTemplate(waveType) {
    const id = uuid.v4();
    const newTemplate = {
      id: id,
      name: 'Untitled Template',
      desc: 'Template Description',
      ver: 'templateVersionNumber',
      type: 'NONE/TRIGGER/EVENT',
      owner: 'TEMPLATE OWNER',
      progress: 10,
      groups: [
        {
          id: 1,
          name: 'Infrastructure',
          order: 100,
          status: 'Defined',
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
          id: 2,
          name: 'Infrastructure',
          order: 100,
          status: 'Defined',
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
          id: 3,
          name: 'Infrastructure',
          order: 100,
          status: 'Defined',
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
    waveType.items.push(newTemplate);
    waveType.newTemplate = '';
  }

  removeTemplate(waveType, templateId) {
    waveType.items = waveType.items.filter((item) => item.id !== templateId);
  }

  templateSettings(waveType, templateId, event) {
    event.stopPropagation();
  }

  /**
   *
   * @description clears entered template name and hides add button
   */
  inputFocusOut(event, waveType) {
    setTimeout(() => {
      waveType.showAdd = false;
      waveType.newTemplate = '';
    }, 200);
  }

  /**
   *
   * @description passes the ids of groups to angular material to make them reorderable
   */
  getConnectedList() {
    return this.waveData.groups.map((x) => `${x.id}`);
  }

  /**
   *
   * @description reorders the dragged group
   */
  dropGroup(event: CdkDragDrop<string[]>) {
    let group: any = event.container.data[event.previousIndex];
    console.log('group order before drag ', group.order);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    if (event.currentIndex === 0) {
      if (event.container.data.length > 0) {
        if (event.container.data.length !== event.currentIndex + 1) {
          group.order =
            0 + event.container.data[event.currentIndex + 1]['order'] / 2;
        } else {
          group.order = 100;
        }
      } else {
        group.order = 100;
      }
    } else if (event.currentIndex === event.container.data.length - 1) {
      group.order =
        100 + event.container.data[event.container.data.length - 2]['order'];
    } else {
      group.order =
        (event.container.data[event.currentIndex - 1]['order'] +
          event.container.data[event.currentIndex + 1]['order']) /
        2;
    }
    console.log('group order after drag ', group.order);
  }

  /**
   *
   * @param waveType - for which actions has to be opened
   * @description shows group level actions
   */
  openGroupLevelActions(waveType) {
    waveType.openActions = !waveType.openActions;
    this.waveData.groups.forEach((type) => {
      if (type.id !== waveType.id) {
        type.openActions = false;
      }
    });
  }

  /**
   *
   * @param waveType - which is being deleted
   * @description resizes the template details container
   */
  deleteGroup(waveType) {
    this.waveData.groups = this.waveData.groups.filter((Type) => {
      return waveType.id !== Type.id;
    });
  }

  /**
   *
   * @param waveType of template which is being deleted and template
   * @description deletes template of group
   */
  deleteTemplate(waveType, template) {
    waveType.templates = waveType.templates.filter((temp) => {
      return template.id !== temp.id;
    });
  }

  /**
   *
   * @param template and status - nely changed status
   * @description changes  status of template
   */
  changeStatus(template, status) {
    template.status = status;
  }

  /**
   *
   * @param template- template to getcllas for status should be passed
   * @description get class to apply color to status column depending on status
   */
  getStatusClass(template) {
    let className;
    if (template.status === 'Working on it') {
      className = 'status-yellow';
    }
    if (template.status === 'Done') {
      className = 'status-green';
    }

    if (template.status === 'Stuck') {
      className = 'status-red';
    }

    if (template.status === '') {
      className = '';
    }

    if (template.showStatus) {
      className += ' show-status';
    }

    return className;
  }

  /**
   *
   * @param template - template for which status list has to be shown
   * @description shows status list to change status of passed template
   */
  showStatuses($event, template) {
    template.showStatus = !template.showStatus;
    $event.stopPropagation();
  }
}
