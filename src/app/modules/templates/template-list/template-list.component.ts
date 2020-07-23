import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  TemplateRef,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ThemePalette } from '@angular/material/core';
import { DataService } from 'src/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { StatusCodes } from 'src/app/enums/enums';
import { Item, Group } from 'src/app/models/data.model';

interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
})
export class TemplateListComponent implements OnInit, OnChanges {
  @Input() templateData: any;
  @Output() rowClicked: EventEmitter<any> = new EventEmitter();

  searchKey;
  stages: any[] = [];
  tasks: any[] = [];
  groupCollapseList: boolean[];
  drag = true;

  workflowTypes: SelectInterface[] = [
    { value: 'time', viewValue: 'Time' },
    { value: 'trigger', viewValue: 'Trigger' },
  ];

  selectedWorkflowType: any;
  isMobile = false;
  primaryColor: ThemePalette = 'primary';

  showService = false;
  showAction = false;

  statusCodes = StatusCodes;

  constructor(
    private dataService: DataService,
    private deviceService: DeviceDetectorService,
    public dialog: MatDialog
  ) {
    this.groupCollapseList = [];
  }

  ngOnInit() {
    this.selectedWorkflowType = this.workflowTypes[0].value;

    this.isMobile = this.deviceService.isMobile();
  }

  ngOnChanges() {
    if (this.templateData && this.templateData.Types) {
      this.tasks.forEach((waveType) => {
        waveType.theme = this.getRandomColor();
      });
    }
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

  optionClicked(wfType) {
    this.templateData.type = wfType;
    this.dataService
      .updateTemplate(this.templateData.id, this.templateData)
      .subscribe((newTemplate: any) => {
        console.log('new template type ', newTemplate.type);
      });
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

  openDialog(template: TemplateRef<any>) {
    const dialogRef = this.dialog.open(template, {
      width: '54.444444%',
      height: '74.89%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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
    let task: any = event.container.data[event.previousIndex];
    console.log('order before drag ', task.order);
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
    console.log('order after drag ', task.order);
  }

  /**
   *
   * @description reorders groups
   */
  mainDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.templateData.groups,
      event.previousIndex,
      event.currentIndex
    );
  }

  /**
   *
   * @param task - for which the details has to be shown
   * @description emits event to open task details
   */
  loadTask(task: Item, group: Group) {
    this.rowClicked.emit({task: task, group: group});
  }

  /**
   *
   * @param templateType - for which new template has to be added
   * @description Adds new template to group
   */
  addTask(templateType) {
    const id = Math.random().toString(6);

    templateType.items.push({
      id: id,
      name: 'Untitiled Task',
      status: '',
      startDate: '',
      endDate: '',
    });
    templateType.newTemplate = '';
  }

  deleteTask(templateType, taskId) {
    templateType.items = templateType.items.filter(
      (item) => item.id !== taskId
    );
  }

  taskSettings(templateType, taskId, event) {
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
    return this.templateData.groups.map((x) => `${x.id}`);
  }

  /**
   *
   * @description reorders the dragged group
   */
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
  }

  /**
   *
   * @param waveType - for which actions has to be opened
   * @description shows group level actions
   */
  openGroupLevelActions(templateType) {
    templateType.openActions = !templateType.openActions;
    this.templateData.groups.forEach((type) => {
      if (type.id !== templateType.id) {
        type.openActions = false;
      }
    });
  }

  /**
   *
   * @param templateType - which is being deleted
   * @description resizes the template details container
   */
  deleteGroup(templateType) {
    this.tasks = this.tasks.filter((Type) => {
      return templateType.id !== Type.id;
    });
  }

  /**
   *
   * @param templateType of template which is being deleted and template
   * @description deletes template of group
   */
  deleteTemplate(templateType, template) {
    templateType.items = templateType.items.filter((temp) => {
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
  onFocusTitle() {
  }

  updateGroupTitle() {  
    // Group title API update
  }
}
