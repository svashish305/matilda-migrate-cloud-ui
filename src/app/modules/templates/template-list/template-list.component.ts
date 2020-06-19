import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  TemplateRef,
} from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { ThemePalette } from "@angular/material/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataService } from "src/services/data.service";
import { MatDialog } from "@angular/material/dialog";
import { DeviceDetectorService } from "ngx-device-detector";

interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-template-list",
  templateUrl: "./template-list.component.html",
  styleUrls: ["./template-list.component.scss"],
})
export class TemplateListComponent implements OnInit, OnChanges {
  @Input() templateData: any;
  @Output() rowClicked: EventEmitter<any> = new EventEmitter();

  searchKey;
  stages: any[] = [];
  tasks: any[] = [];
  taskCollapseState: Map<any, boolean> = new Map();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  plugins: SelectInterface[] = [
    { value: "p-0", viewValue: "AWS" },
    { value: "p-1", viewValue: "Pizza" },
    { value: "p-2", viewValue: "Tacos" },
  ];
  services: SelectInterface[] = [
    { value: "s-0", viewValue: "RDS" },
    { value: "s-1", viewValue: "Pizza" },
    { value: "s-2", viewValue: "Tacos" },
  ];
  actions: SelectInterface[] = [
    { value: "create-0", viewValue: "Create" },
    { value: "update-1", viewValue: "Update" },
    { value: "delete-2", viewValue: "Delete" },
  ];
  accounts: SelectInterface[] = [
    { value: "aws-acc-0", viewValue: "AWS Account 1" },
    { value: "aws-acc-1", viewValue: "AWS Account 2" },
    { value: "aws-acc-2", viewValue: "AWS Account 3" },
  ];
  types: SelectInterface[] = [
    { value: "type-0", viewValue: "T2 Micro" },
    { value: "type-1", viewValue: "Type 2" },
    { value: "type-2", viewValue: "Type 3" },
  ];

  workflowTypes: SelectInterface[] = [
    { value: "time", viewValue: "Time" },
    { value: "trigger", viewValue: "Trigger" },
  ];

  selectedWorkflowType: any;
  isMobile = false;
  primaryColor: ThemePalette = "primary";

  constructor(
    private dataService: DataService,
    private deviceService: DeviceDetectorService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // console.log('templateData ', this.templateData);
    this.selectedWorkflowType = this.workflowTypes[0].value;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ["", Validators.required],
    });

    this.isMobile = this.deviceService.isMobile();

    this.getStages();
    this.getTasks();
  }

  ngOnChanges() {
    if (this.templateData && this.templateData.Types) {
      this.tasks.forEach((waveType) => {
        waveType.theme = this.getRandomColor();
      });
    }
  }

  getStages() {
    this.dataService.getStages().subscribe((data: any[]) => {
      this.stages = data;
    });
  }

  getTasks() {
    this.dataService.getTasks().subscribe((data: any[]) => {
      this.tasks = data;
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
    // new implementation
    // if (!this.searchKey || this.searchKey === "") {
    //   // this.templates = this.rawtemplates;
    //   return true;
    // }
    // this.templateData.groups = this.templateData.groups.filter((x) => {
    //   return x.name.toLowerCase().includes(this.searchKey.toLowerCase());
    // });
  }

  onCheck(event) {
    event.stopPropagation();
  }

  collapseAll(checked: boolean) {
    if (checked) {
      this.templateData.groups.forEach((templateType: any) => {
        templateType.collapsed = true;
      });
    } else {
      this.templateData.groups.forEach((templateType: any) => {
        templateType.collapsed = false;
      });
    }
  }

  getWorkflowType() {
    return this.selectedWorkflowType;
  }

  toggleHeight(taskId) {
    let height;
    if (this.taskCollapseState[taskId]) {
      height = "12.375em";
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
      width: "54.444444%",
      height: "74.89%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  alignStageOption(collapseState: boolean) {
    if (this.isMobile) {
      if (collapseState) {
        return {
          left: "-4em",
          top: "0.75em",
        };
      } else {
        return {
          left: "22px",
        };
      }
    } else {
      if (collapseState) {
        return {
          left: "4.9em",
          top: "0.25em",
        };
      } else {
        return {
          left: "29.75em",
        };
      }
    }
  }

  toggleTemplateHeight(collapsed) {
    let height;
    if (this.isMobile) {
      if (collapsed) {
        height = "0";
      } else {
        height = "5.563em";
      }
    } else {
      if (collapsed) {
        height = "1em";
      } else {
        height = "5.563em";
      }
    }
    return { height };
  }

  /**
   *
   * @description generates new color for groups
   */
  getRandomColor() {
    return "#" + Math.random().toString(16).substr(-6);
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
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  /**
   *
   * @param task - for which the details has to be shown
   * @description emits event to open task details
   */
  rowClick(task) {
    this.templateData.groups.forEach((templateType) => {
      templateType.items.forEach((task) => {
        task.selected = false;
      });
    });
    task.selected = true;
    this.rowClicked.emit(task);
    console.log("row clicked");
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
      name: "Untitiled Task",
      status: "",
      startDate: "",
      endDate: "",
    });
    templateType.newTemplate = "";
  }

  deleteTask(templateType, taskId) {
    templateType.items = templateType.items.filter(
      (item) => item.id !== taskId
    );
  }

  /**
   *
   * @description clears entered template name and hides add button
   */
  inputFocusOut(event, waveType) {
    setTimeout(() => {
      waveType.showAdd = false;
      waveType.newTemplate = "";
    }, 200);
  }

  /**
   *
   * @param templateType for which name has to be edited
   * @description make group name editable on hover
   */
  groupNameEnter(templateType) {
    this.templateData.groups.forEach((template) => (template.edit = false));
    templateType.edit = true;
    templateType.drag = true;
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
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
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
    if (template.status === "Working on it") {
      className = "status-yellow";
    }
    if (template.status === "Done") {
      className = "status-green";
    }

    if (template.status === "Stuck") {
      className = "status-red";
    }

    if (template.status === "") {
      className = "";
    }

    if (template.showStatus) {
      className += " show-status";
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
