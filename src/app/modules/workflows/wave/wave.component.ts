import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { DataService } from 'src/services/data.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as uuid from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { Group, Workflow, Item } from 'src/app/utils/models/data.model';
import { WorkflowService } from '../services/workflow.service';
import { Utilities } from 'src/app/utils/helpers/utilities';


interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-wave',
  templateUrl: './wave.component.html',
  styleUrls: ['./wave.component.scss'],
})
export class WaveComponent implements OnInit, AfterViewInit {
  @Input() waveData: Workflow;
  @Output() updateWorkflow = new EventEmitter();
  @Output() onTagsUpdate = new EventEmitter();
  @Output() rowClicked: EventEmitter<any> = new EventEmitter();
  edit;
  showBackdrop;
  @ViewChild('waveList', { static: false }) waveList;

  favourite = false;
  waves: any[] = [];
  accounts: any[] = [];
  titleState: string = 'idle';
  oldTitle: string;
  newTitle: string;
  descriptionState: string = 'idle';
  oldDescription: string;
  newDescription: string;

  rightSidebarToggleState: boolean = false;
  selectedTemplateInSidebar: any;

  accountCollapseState: Map<any, boolean> = new Map();

  showAccountOptions = false;
  showTagOptions = false;

  isTagsFormValid: boolean;

  waveState = 'start';

  items: SelectInterface[] = [
    { value: 'New Item', viewValue: 'New Item' },
    { value: 'p-1', viewValue: 'Pizza' },
    { value: 'p-2', viewValue: 'Tacos' },
  ];

  waveId: any;
  currWave: any;
  currWaveTags: any[];

  searchKey;
  imgHovered = false;
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  waveImgHover = false;
  waveAvatarUrl: any;

  constructor(
    private dataService: DataService,
    private _workflowService: WorkflowService,
    private deviceService: DeviceDetectorService,
    private _utilities: Utilities,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAccounts();

    this.route.params.subscribe((params: any) => {
      this.waveId = params.id;
    });
  
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();
  }

  ngAfterViewInit() {
    this.appyResize();
  }


  /**
   *
   * @description gets list of accounts and calls first stage details
   */
  getAccounts() {
    this.dataService.getAccounts().subscribe((data: any[]) => {
      this.accounts = data;
    });
  }

  changeAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.waveData.image = event.target.result;
        this.updateWorkflow.emit({ payload: this.waveData, message: 'Workflow Icon Updated Successfully', type: 'success' });
      };
    }
  }

  removeAvatar() {
    this.waveData.image = null;
    this.updateWorkflow.emit({ payload: this.waveData, message: 'Workflow Icon Deleted Successfully', type: 'error' });
  }

  onCheck(event) {
    event.stopPropagation();
  }

  updateTags(event: any) {
    this.isTagsFormValid = !event.valid;
    this.waveData.tags = event.tags;
  }

  saveTags() {
    this.onTagsUpdate.emit({ tags: this.waveData.tags, message: 'Tags Updated Successfully', type: 'success' });
  }

  addGroup() {
    let group = new Group();
    group.id = uuid.v4();
    group.name = 'Untitled Group' + '_' + group.id;
    group.order = this.waveData.groups.length >= 1 ? this.waveData.groups[this.waveData.groups.length - 1].order + 100 : 100;

    this.waveData.groups.push(group);
    this.waveData.groups = [...this.waveData.groups];

    // setTimeout(() =>{
    //   this.templateList.focusNewGroup();
    // },0);


    this.updateWorkflow.emit({ payload: this.waveData, message: 'Group Added Successfully', type: 'success' });
  }

  toggleRightSidebar(template: any) {
    this.rightSidebarToggleState = !this.rightSidebarToggleState;
    this.selectedTemplateInSidebar = template;
  }

  toggleHeight(accountId) {
    let height;
    if (this.accountCollapseState[accountId]) {
      height = '13.313em';
    }
    return { height };
  }

  toggleCollapse(accountId) {
    this.accountCollapseState[accountId] = !this.accountCollapseState[
      accountId
    ];
  }

  isCollapsed(accountId) {
    this.accountCollapseState[accountId] = false;
  }

  onResizeEnd(event) {
    this.appyResize(event);
  }

  appyResize(event?) {
    const wrapperWidth = document.getElementById('wave-content-id').offsetWidth;
    const templateHolder = document.getElementById('resizable-holder');
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

  openDetails(edit) {
    this.edit = edit;
    if (!edit) {
      this.showBackdrop = false;
      // this.waveData.data.waveTypes.forEach((waveType) => {
      //   waveType.templates.forEach((template) => {
      //     template.selected = false;
      //   });
      // });
    }
    setTimeout(() => {
      this.appyResize();
    }, 0);
  }

  openTaskDetails(payload: any) {
    let task: Item = payload.task;
    let group: Group = payload.group;
    if (!task) {
      let _task = new Item();
      _task.id = this._utilities.generateId();
      _task.name = 'Untitled Template' + '_' + _task.id;
      _task.groupId = group.id;
      _task.order = group.items.length >= 1 ? group.items[group.items.length - 1].order + 100 : 100;

      this.waveData.groups.forEach((_group: Group) => {
        if (_group.id === group.id) {
          _group.items.push(_task);
        }
      });

      this.updateWorkflow.emit({ payload: this.waveData, message: 'Template Added Successfully', type: 'success' });
    }

  }

  updateGroupInfo(payload: Workflow) {
    this.updateWorkflow.emit(payload);
  }

  onFocusTitle() {
    this.titleState = 'editing';
  }

  updateTitle() {
    this.titleState = 'idle';
    if (this.newTitle !== this.oldTitle) {
      // update title
      const newTemplate = {
        title: this.newTitle,
        ...this.waveData,
      };
    }

    this.updateWorkflow.emit({ payload: this.waveData, message: 'Workflow Updated Successfully', type: 'success' });
  }

  onFocusDescription() {
    this.descriptionState = 'editing';
  }

  updateDescription() {
    this.descriptionState = 'idle';
    if (this.newDescription !== this.oldDescription) {
      // update description
      const newTemplate = {
        description: this.newDescription,
        ...this.waveData,
      };
    }

    this.updateWorkflow.emit({ payload: this.waveData, message: 'Workflow Updated Successfully', type: 'success' });
  }

  /**
   *
   * @description generates new color for groups
   */
  getRandomColor() {
    return '#' + Math.random().toString(16).substr(-6);
  }

  rowClick(template) {
    template.selected = true;
    this.rowClicked.emit(true);
  }

  inputFocusOut(event, waveType) {
    setTimeout(() => {
      waveType.showAdd = false;
      waveType.newTemplate = '';
    }, 200);
  }

  groupNameEnter(waveType) {
    // this.waveData.data.waveTypes.forEach((wave) => (wave.edit = false));
    waveType.edit = true;
    waveType.drag = true;
  }

  openGroupLevelActions(waveType) {
    waveType.openActions = !waveType.openActions;
    // this.waveData.data.waveTypes.forEach((type) => {
    //   if (type.id !== waveType.id) {
    //     type.openActions = false;
    //   }
    // });
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
}
