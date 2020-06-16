import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { DataService } from "src/services/data.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ThemePalette } from "@angular/material/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { DeviceDetectorService } from "ngx-device-detector";

interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-wave-list",
  templateUrl: "./wave-list.component.html",
  styleUrls: ["./wave-list.component.scss"],
})
export class WaveListComponent implements OnInit {
  @Input() waveData: any = {};
  @Output() rowClicked: EventEmitter<any> = new EventEmitter();

  edit;
  searchKey;
  showBackdrop;
  @ViewChild("waveList", { static: false }) waveList;

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
    { value: "AWS", viewValue: "AWS" },
    { value: "p-1", viewValue: "Pizza" },
    { value: "p-2", viewValue: "Tacos" },
  ];

  workflowTypes: SelectInterface[] = [
    { value: "time", viewValue: "Time" },
    { value: "trigger", viewValue: "Trigger" },
  ];

  selectedWorkflowType: any;

  primaryColor: ThemePalette = "primary";

  isMobile = false;

  constructor(
    private dataService: DataService,
    private deviceService: DeviceDetectorService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log("wavedata ", this.waveData);

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
    return this.selectedWorkflowType;
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

  collapseAll(checked: boolean) {
    if (checked) {
      this.waveData.data.waveTypes.forEach((waveType: any) => {
        waveType.collapsed = true;
      });
    } else {
      this.waveData.data.waveTypes.forEach((waveType: any) => {
        waveType.collapsed = false;
      });
    }
  }

  /**
   *
   * @description searches the wavelist using the search key
   */

  search(e) {
    if (!this.searchKey) {
      this.waves = this.rawwaves;
      return true;
    }
    this.waves = this.rawwaves.filter((x) => {
      return x.name.toLowerCase().search(this.searchKey.toLowerCase()) !== -1;
    });
  }

  onCheck(event) {
    event.stopPropagation();
  }

  toggleHeight(accountId) {
    let height;
    if (this.accountCollapseState[accountId]) {
      height = "18.125em";
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

  openDialog(template: TemplateRef<any>) {
    const dialogRef = this.dialog.open(template, {
      width: "36.1111111%",
      height: "66.3333333%",
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
        width: "36.1111111%",
        height: "66.3333333%",
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
    this.dataService.updateAccount(updatedAccount).subscribe((res: any) => {
      console.log("updated account details ", updatedAccount);
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
    const wrapperWidth = document.getElementById("wave-content-id").offsetWidth;
    const templateHolder = document.getElementById("template-holder");
    const contentHolder = document.getElementById("wave-main-content");
    let width;
    if (templateHolder) {
      const resizerWidth = templateHolder.offsetWidth;
      width = event ? resizerWidth - event.edges.left : 430;
      templateHolder.style.width = width + "px";
    } else {
      width = 0;
    }
    if (wrapperWidth > 750 + width) {
      if (contentHolder) {
        contentHolder.style.width = wrapperWidth - width + 40 + "px";
      }
    } else {
      if (contentHolder) {
        contentHolder.style.width = "750px";
      }
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
      this.waveData.data.waveTypes.forEach((waveType) => {
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
    this.waveData.data.waveTypes.unshift({
      id: id,
      name: "New group",
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
    moveItemInArray(
      this.waveData.data.waveTypes,
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
    this.waveData.data.waveTypes.forEach((waveType) => {
      waveType.templates.forEach((t) => {
        t.selected = false;
      });
    });
    template.selected = true;
    this.rowClicked.emit(true);
    console.log("row clicked");
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
      status: "",
      startDate: "",
      endDate: "",
    });
    waveType.newTemplate = "";
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
   * @param waveType for which name has to be edited
   * @description make group name editable on hover
   */
  groupNameEnter(waveType) {
    this.waveData.data.waveTypes.forEach((wave) => (wave.edit = false));
    waveType.edit = true;
    waveType.drag = true;
  }

  /**
   *
   * @description passes the ids of groups to angular material to make them reorderable
   */
  getConnectedList() {
    return this.waveData.data.waveTypes.map((x) => `${x.id}`);
  }

  /**
   *
   * @description reorders the dragged group
   */
  dropGroup(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.waveData.data.waveTypes,
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
    this.waveData.data.waveTypes.forEach((type) => {
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
    this.waveData.data.waveTypes = this.waveData.data.waveTypes.filter(
      (Type) => {
        return waveType.id !== Type.id;
      }
    );
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
