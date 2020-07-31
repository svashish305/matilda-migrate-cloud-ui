import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ThemePalette } from '@angular/material/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Template, Item, Group } from 'src/app/utils/models/data.model';
import { StatusCodes } from 'src/app/utils/enums/enums';
import * as uuid from 'uuid';

interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
})
export class TemplateListComponent implements OnInit {
  @Input() templateData: Template;
  @Output() rowClicked: EventEmitter<any> = new EventEmitter();
  @Output() updateGroupInfo: EventEmitter<any> = new EventEmitter();

  @ViewChildren('loadedStage') loadedStages: QueryList<any>;

  private currentTemplate: Template;
  public searchKey: string;
  public groupCollapseList: boolean[] = [];
  drag = true;
  areAllCollapsed = false;
  workflowTypes: SelectInterface[] = [
    { value: 'trigger', viewValue: 'Trigger' },
    { value: 'time', viewValue: 'Time' }
  ]; //{ value: 'time', viewValue: 'Time' }

  selectedWorkflowType: any;
  isMobile = false;
  primaryColor: ThemePalette = 'primary';

  showService = false;
  showAction = false;

  statusCodes = StatusCodes;
  taskAvatarUrl: any = '';

  constructor(
    private deviceService: DeviceDetectorService,
  ) { }

  ngOnInit() {
    this.selectedWorkflowType = this.templateData.type ? this.templateData.type : this.workflowTypes[0].value;
    this.isMobile = this.deviceService.isMobile();
  }

  loadTask(task: Item, group: Group) {
    this.rowClicked.emit({ task: task, group: group });
  }

  deleteTask(group: Group, task: Item) {
    this.templateData.groups.forEach((_group) => {
      if (_group.id === group.id) {
        _group.items = _group.items.filter(_item => _item.id !== task.id);
        this.updateGroupInfo.emit({ payload: this.templateData, message: 'Task Deleted Successfully', type: 'error' });
      }
    });
  }

  addGroup() {
    let group = new Group();
    group.id = uuid.v4();
    group.name = 'Untitled Group' + '_' + group.id;
    group.order = this.templateData.groups.length >= 1 ? this.templateData.groups[this.templateData.groups.length - 1].order + 100 : 100;
    this.templateData.groups.push(group);
    this.templateData.groups = [...this.templateData.groups];

    if(this.areAllCollapsed) {
      this.groupCollapseList[this.templateData.groups.length - 1] = true;
    }

    this.focusNewGroup();
  }

  deleteGroup(group: Group) {
    this.templateData.groups = this.templateData.groups.filter(_group => _group.id !== group.id);
    this.updateGroupInfo.emit({ payload: this.templateData, message: 'Group Deleted Successfully', type: 'error' });
  }

  dropTask(event: CdkDragDrop<string[]>) {

    const targetGroupId = event.container.id;

    let task: any = event.container.data[event.previousIndex];

    if (!task) {
      task = event.previousContainer.data[event.previousIndex];
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
          task.order =
            0 + event.container.data[event.currentIndex + 1]['order'] / 2;
        } else {
          task.order = 100;
        }
      } else {
        task.order = 100;
      }
    } else if (event.currentIndex === event.container.data.length - 1) {
      task.order =
        100 + event.container.data[event.container.data.length - 2]['order'];
    } else {
      task.order =
        (event.container.data[event.currentIndex - 1]['order'] +
          event.container.data[event.currentIndex + 1]['order']) /
        2;
    }
    
    task.groupId = targetGroupId;
   
    this.templateData.groups.forEach(_group => {
      if(_group.id === targetGroupId) {
        _group.items.forEach(_task => {
          _task.groupId = targetGroupId;
        });
      }
    });

    this.templateData.groups = [...this.templateData.groups];

    this.updateGroupInfo.emit({ payload: this.templateData, message: 'Task Updated Successfully', type: 'success' });

  }

  dropGroup(event: CdkDragDrop<string[]>) {
    let group: any = event.container.data[event.previousIndex];

    moveItemInArray(
      this.templateData.groups,
      event.previousIndex,
      event.currentIndex
    );

    this.templateData.groups = [...this.templateData.groups];

    if (event.currentIndex === 0) {
      group.order = (0 + this.templateData.groups[1].order) / 2;
    } else if (event.currentIndex === this.templateData.groups.length - 1) {
      group.order =
        100 +
        this.templateData.groups[this.templateData.groups.length - 2].order;
    } else {
      group.order =
        (this.templateData.groups[event.currentIndex - 1].order +
          this.templateData.groups[event.currentIndex + 1].order) /
        2;
    }

    this.updateGroupInfo.emit({ payload: this.templateData, message: 'Group Updated Successfully', type: 'success' });
  }

  getConnectedList() {
    return this.templateData.groups.map((x) => `${x.id}`);
  }

  taskSettings(templateType, taskId, event) {
    event.stopPropagation();
  }

  openGroupLevelActions(templateType) {
    templateType.openActions = !templateType.openActions;
    // this.templateData.groups.forEach((type) => {
    //   if (type.id !== templateType.id) {
    //     type.openActions = false;
    //   }
    // });
  }

  updateGroupTitle(group: Group) {
    this.currentTemplate = Object.assign({}, this.templateData);
    this.currentTemplate.groups.filter(_group => {
      if (_group.id === group.id) {
        _group.name = group.name;
      }
    });

    this.updateGroupInfo.emit({ payload: this.currentTemplate, message: 'Group Updated Successfully', type: 'success' });
  }

  changeStatus(template, status) {
    // template.status = status;
  }

  focusNewGroup() {
    this.loadedStages.toArray()[this.loadedStages.length - 1].nativeElement.scrollIntoView({ behavior: "smooth" });
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
  onFocusTitle() {
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

  onCheck(event, columnName) {
    event.stopPropagation();
    if (columnName === 'service') {
      this.showService = !this.showService;
    }
    if (columnName === 'action') {
      this.showAction = !this.showAction;
    }
  }

  getWorkflowType() {
    this.templateData.type = this.selectedWorkflowType;
    return this.selectedWorkflowType;
  }

  optionClicked(wfType: any) {
    this.updateGroupInfo.emit({ payload: this.templateData, message: 'Template Updated Successfully', type: 'success' });
  }

  toggleTemplateHeight(collapsed) {
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
      for (let i = 0; i < this.templateData.groups.length; i++) {
        this.groupCollapseList[i] = true;
      }
    } else {
      for (let i = 0; i < this.templateData.groups.length; i++) {
        this.groupCollapseList[i] = false;
      }
    }
  }

}
