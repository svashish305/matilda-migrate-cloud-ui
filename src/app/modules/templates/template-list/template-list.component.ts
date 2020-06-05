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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/services/data.service';
import { MatDialog } from '@angular/material/dialog';

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

  tasks: any[] = [];
  taskCollapseState: Map<any, boolean> = new Map();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  plugins: SelectInterface[] = [
    { value: 'p-0', viewValue: 'AWS' },
    { value: 'p-1', viewValue: 'Pizza' },
    { value: 'p-2', viewValue: 'Tacos' },
  ];
  services: SelectInterface[] = [
    { value: 's-0', viewValue: 'RDS' },
    { value: 's-1', viewValue: 'Pizza' },
    { value: 's-2', viewValue: 'Tacos' },
  ];
  actions: SelectInterface[] = [
    { value: 'create-0', viewValue: 'Create' },
    { value: 'update-1', viewValue: 'Update' },
    { value: 'delete-2', viewValue: 'Delete' },
  ];
  accounts: SelectInterface[] = [
    { value: 'aws-acc-0', viewValue: 'AWS Account 1' },
    { value: 'aws-acc-1', viewValue: 'AWS Account 2' },
    { value: 'aws-acc-2', viewValue: 'AWS Account 3' },
  ];
  types: SelectInterface[] = [
    { value: 'type-0', viewValue: 'T2 Micro' },
    { value: 'type-1', viewValue: 'Type 2' },
    { value: 'type-2', viewValue: 'Type 3' },
  ];

  constructor(
    private dataService: DataService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // console.log('templateData ', this.templateData);

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });

    this.getTasks();
  }

  ngOnChanges() {
    if (this.templateData && this.templateData.waveTypes) {
      this.templateData.waveTypes.forEach((waveType) => {
        waveType.theme = this.getRandomColor();
      });
    }
  }

  getTasks() {
    this.dataService.getTasks().subscribe((data: any[]) => {
      this.tasks = data;
    });
  }

  setBadgeBgColor(stageState = 'undefined') {
    let backgroundColor = '#FA0B10';
    switch (stageState) {
      case 'Undefined':
        backgroundColor = '#FA0B10';
        break;
      case 'Configured':
        backgroundColor = '#D0CA00';
        break;
      case 'Ready':
        backgroundColor = '#006BD8';
        break;
      case 'Finished':
        backgroundColor = '#00BB00';
        break;
      default:
        break;
    }
    return { backgroundColor };
  }

  toggleHeight(taskId) {
    let height;
    if (this.taskCollapseState[taskId]) {
      height = '12.375em';
    }
    return { height };
  }

  toggleCollapse(taskId) {
    this.taskCollapseState[taskId] = !this.taskCollapseState[taskId];
  }

  isCollapsed(taskId) {
    this.taskCollapseState[taskId] = false;
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
  }

  /**
   *
   * @description reorders groups
   */
  mainDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.templateData.waveTypes,
      event.previousIndex,
      event.currentIndex
    );
  }

  /**
   *
   * @param templateObj - for which the details has to be shown
   * @description emits event to open template details
   */
  rowClick(templateObj) {
    this.templateData.waveTypes.forEach((waveType) => {
      waveType.templates.forEach((template) => {
        template.selected = false;
      });
    });
    templateObj.selected = true;
    this.rowClicked.emit(true);
    console.log('row clicked');
  }

  /**
   *
   * @param waveType - for which new template has to be added
   * @description Adds new template to group
   */
  addTemplate(waveType) {
    const id = Math.random().toString(6);

    waveType.templates.push({
      id: id,
      name: waveType.newTemplate,
      status: '',
      startDate: '',
      endDate: '',
    });
    waveType.newTemplate = '';
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
   * @param waveType for which name has to be edited
   * @description make group name editable on hover
   */
  groupNameEnter(waveType) {
    this.templateData.waveTypes.forEach((wave) => (wave.edit = false));
    waveType.edit = true;
    waveType.drag = true;
  }

  /**
   *
   * @description passes the ids of groups to angular material to make them reorderable
   */
  getConnectedList() {
    return this.templateData.waveTypes.map((x) => `${x.id}`);
  }

  /**
   *
   * @description reorders the dragged group
   */
  dropGroup(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.templateData.waveTypes,
      event.previousIndex,
      event.currentIndex
    );
  }

  /**
   *
   * @param waveType - for which actions has to be opened
   * @description shows group level actions
   */
  openGroupLevelActions(waveType) {
    waveType.openActions = !waveType.openActions;
    this.templateData.waveType.forEach((type) => {
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
    this.templateData.waveTypes = this.templateData.waveTypes.filter((Type) => {
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