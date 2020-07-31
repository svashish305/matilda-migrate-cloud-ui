import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { DataService } from 'src/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { StatusCodes } from 'src/app/utils/enums/enums';
import { Utilities } from 'src/app/utils/helpers/utilities';
import { Item, Group } from 'src/app/utils/models/data.model';
import * as uuid from 'uuid';

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
  @Output() updateGroupInfo: EventEmitter<any> = new EventEmitter();

  edit;
  searchKey;
  showBackdrop;
  @ViewChild('waveList', { static: false }) waveList;
  @ViewChildren('loadedGroup') loadedStages: QueryList<any>;

  rawwaves: any[] = [];
  waves: any[] = [];
  accounts: any[] = [];
  accountCollapseState: Map<any, boolean> = new Map();
  selectedAccount: any;

  accountProvider: any;
  accountName: string;
  accountClientID: any;
  accountRegion: any;

  rightSidebarToggleState: boolean = false;
  selectedTemplateInSidebar: any;

  workflowTypes: SelectInterface[] = [
    { value: 'trigger', viewValue: 'Trigger' },
    { value: 'time', viewValue: 'Time' }
  ];

  selectedWorkflowType: any;

  primaryColor: ThemePalette = 'primary';

  drag = true;
  groupCollapseList: boolean[] = [];
  areAllCollapsed = false;
  isMobile = false;

  statusCodes = StatusCodes;
  templateAvatarUrl: any = '';

  constructor(
    private dataService: DataService,
    private deviceService: DeviceDetectorService,
    private _utilities: Utilities,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.selectedWorkflowType = this.workflowTypes[0].value;

    this.isMobile = this.deviceService.isMobile();
  }

  getWorkflowType() {
    this.waveData.type = this.selectedWorkflowType;
    return this.selectedWorkflowType;
  }

  optionClicked(wfType: any) {
    this.updateGroupInfo.emit({ payload: this.waveData, message: 'Template Updated Successfully', type: 'success' });
  }

  drop(event: CdkDragDrop<string[]>) {
    let template: any = event.container.data[event.previousIndex];

    if (!template) {
      template = event.previousContainer.data[event.previousIndex];
    }

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
   
    this.updateGroupInfo.emit({ payload: this.waveData, message: 'Template Updated Successfully', type: 'success' });
  }
  
  
  dropGroup(event: CdkDragDrop<string[]>) {
    let group: any = event.container.data[event.previousIndex];

    moveItemInArray(
      this.waveData.groups,
      event.previousIndex,
      event.currentIndex
    );

    this.waveData.groups = [...this.waveData.groups];

    if (event.currentIndex === 0) {
      group.order = (0 + this.waveData.groups[1].order) / 2;
    } else if (event.currentIndex === this.waveData.groups.length - 1) {
      group.order =
        100 +
        this.waveData.groups[this.waveData.groups.length - 2].order;
    } else {
      group.order =
        (this.waveData.groups[event.currentIndex - 1].order +
          this.waveData.groups[event.currentIndex + 1].order) /
        2;
    }

    this.updateGroupInfo.emit({ payload: this.waveData, message: 'Group Updated Successfully', type: 'success' });
  }

  getConnectedList() {
    return this.waveData.groups.map((x) => `${x.id}`);
  }

  loadTemplate(template: Item) {
    this.router.navigate([
      `workflows/${this.waveData.id}/templates/${template.id}`,
    ]);
  }

  addTemplate(task: Item, group: Group) {
    this.rowClicked.emit({ task: task, group: group });
  }

  deleteTemplate(group: Group, templateId: any) {
    this.waveData.groups.forEach((_group) => {
      if (_group.id === group.id) {
        _group.items = _group.items.filter(_item => _item.id !== templateId);
        this.updateGroupInfo.emit({ payload: this.waveData, message: 'Template Deleted Successfully', type: 'error' });
      }
    });
  }

  addGroup() {
    let group = new Group();
    group.id = uuid.v4();
    group.name = 'Untitled Group' + '_' + group.id;
    group.order = this.waveData.groups.length >= 1 ? this.waveData.groups[this.waveData.groups.length - 1].order + 100 : 100;

    this.waveData.groups.push(group);
    this.waveData.groups = [...this.waveData.groups];

    if(this.areAllCollapsed) {
      this.groupCollapseList[this.waveData.groups.length - 1] = true;
    }

    setTimeout(() =>{ 
      this.focusNewGroup();
    }, 0);

    this.updateGroupInfo.emit({ payload: this.waveData, message: 'Group Added Successfully', type: 'success' });

  }

  deleteGroup(group: Group) {
    this.waveData.groups = this.waveData.groups.filter(_group => _group.id !== group.id);
    this.updateGroupInfo.emit({ payload: this.waveData, message: 'Group Deleted Successfully', type: 'error' });
  }

  onFocusTitle() {
  }

  updateGroupTitle(group: Group) {
    this.waveData.groups.filter(_group => {
      if (_group.id === group.id) {
        _group.name = group.name;
      }
    });
    this.updateGroupInfo.emit({ payload: this.waveData, message: 'Group Updated Successfully', type: 'success' });
  }

  focusNewGroup() {
    this.loadedStages.toArray()[this.loadedStages.length - 1].nativeElement.scrollIntoView({ behavior: "smooth" });
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
    this.areAllCollapsed = checked;
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

  onResizeEnd(event) {
    this.appyResize(event);
  }

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

  getRandomColor() {
    return '#' + Math.random().toString(16).substr(-6);
  }

 

  templateSettings(waveType, templateId, event) {
    event.stopPropagation();
  }

  inputFocusOut(event, waveType) {
    setTimeout(() => {
      waveType.showAdd = false;
      waveType.newTemplate = '';
    }, 200);
  }

  openGroupLevelActions(waveType) {
    waveType.openActions = !waveType.openActions;
    this.waveData.groups.forEach((type) => {
      if (type.id !== waveType.id) {
        type.openActions = false;
      }
    });
  }


  changeStatus(template, status) {
    template.status = status;
  }

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

  showStatuses($event, template) {
    template.showStatus = !template.showStatus;
    $event.stopPropagation();
  }
  getWaveName(waveName){
    let initialLetter;
    let letterArray = [];
    let stringArr = waveName.split(/(?<=^\S+)\s/);
    stringArr.forEach(it => {
      initialLetter = it.substring(1, 0);
      letterArray.push(initialLetter);
    });
    let wName = letterArray[0] + ' '+ letterArray[1];
    return wName;
    
  }
}
