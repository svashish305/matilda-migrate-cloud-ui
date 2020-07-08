import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  EventEmitter,
  Output,
} from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { ResizeEvent } from "angular-resizable-element";
import { DataService } from "src/services/data.service";
import { FormControl } from "@angular/forms";
import { DeviceDetectorService } from "ngx-device-detector";
import * as uuid from "uuid";
import { ActivatedRoute } from "@angular/router";
import { GroupedObservable } from "rxjs";
import { Group } from "src/app/models/data.models";

interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-wave",
  templateUrl: "./wave.component.html",
  styleUrls: ["./wave.component.scss"],
})
export class WaveComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() waveData: any;
  @Output() rowClicked: EventEmitter<any> = new EventEmitter();
  edit;
  showBackdrop;
  @ViewChild("waveList", { static: false }) waveList;

  favourite = false;
  waves: any[] = [];
  accounts: any[] = [];
  titleState: string = "idle";
  oldTitle: string;
  newTitle: string;
  descriptionState: string = "idle";
  oldDescription: string;
  newDescription: string;

  rightSidebarToggleState: boolean = false;
  selectedTemplateInSidebar: any;

  accountCollapseState: Map<any, boolean> = new Map();

  showAccountOptions = false;
  showTagOptions = false;

  waveState = "start";

  items: SelectInterface[] = [
    { value: "New Item", viewValue: "New Item" },
    { value: "p-1", viewValue: "Pizza" },
    { value: "p-2", viewValue: "Tacos" },
  ];

  waveId: any;
  currWave: any;

  searchKey;
  imgHovered = false;
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  waveImgHover = false;
  waveAvatarUrl: any;

  constructor(
    private dataService: DataService,
    private deviceService: DeviceDetectorService,
    private route: ActivatedRoute
  ) {}

  ngOnChanges() {
    // if (this.waveData && this.waveData.data.waveTypes) {
    //   this.waveData.data.waveTypes.forEach((waveType) => {
    //     waveType.theme = this.getRandomColor();
    //   });
    // }
  }

  ngOnInit() {
    this.getAccounts();
    this.getWaves();

    this.route.params.subscribe((params: any) => {
      this.waveId = params.id;
    });
    +this.dataService.getWave(this.waveId).subscribe((currentWorkflow: any) => {
      this.currWave = currentWorkflow;
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
   * @description gets list of Waves and calls first wave details
   */
  getWaves() {
    this.dataService.getWaves().subscribe((data: any[]) => {
      this.waves = data;
    });
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
        this.waveAvatarUrl = event.target.result;
      };

      this.uploadFile(event.target.files[0]);
    }
  }

  uploadFile(file) {
    this.dataService.upload(file).subscribe(
      (res: any) => {
        console.log("file uploaded as", res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCheck(event) {
    event.stopPropagation();
  }

  addGroup() {
    const id = uuid.v4();
    let newGroup = {
      id,
      ...new Group(),
    };
    this.currWave.groups.push(newGroup);
    this.waveData.groups.push(newGroup);
    console.log("modified wave ", this.currWave);
  }

  toggleRightSidebar(template: any) {
    this.rightSidebarToggleState = !this.rightSidebarToggleState;
    this.selectedTemplateInSidebar = template;
  }

  toggleHeight(accountId) {
    let height;
    if (this.accountCollapseState[accountId]) {
      height = "13.313em";
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
    const templateHolder = document.getElementById("resizable-holder");
    const contentHolder = document.getElementById("wave-main-content");
    let width;
    if (templateHolder) {
      const resizerWidth = templateHolder.offsetWidth;
      width = event ? resizerWidth - event.edges.left : 430;
      templateHolder.style.width = width + "px";
    } else {
      width = 0;
    }
    // if (wrapperWidth > 750 + width) {
    //   if (contentHolder) {
    //     contentHolder.style.width = wrapperWidth - width + 40 + "px";
    //   }
    // } else {
    //   if (contentHolder) {
    //     contentHolder.style.width = "750px";
    //   }
    // }
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

  onFocusTitle() {
    this.titleState = "editing";
  }

  updateTitle() {
    this.titleState = "idle";
    if (this.newTitle !== this.oldTitle) {
      // update title
      const newTemplate = {
        title: this.newTitle,
        ...this.waveData,
      };
      // this.dataService
      //   .updateTemplate(newTemplate)
      //   .subscribe((res: any) => console.log(res));
    }
  }

  onFocusDescription() {
    this.descriptionState = "editing";
  }

  updateDescription() {
    this.descriptionState = "idle";
    if (this.newDescription !== this.oldDescription) {
      // update description
      const newTemplate = {
        description: this.newDescription,
        ...this.waveData,
      };
      // this.dataService
      //   .updateTemplate(newTemplate)
      //   .subscribe((res: any) => console.log(res));
    }
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
