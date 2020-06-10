import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { DataService } from "src/services/data.service";
import { ThemePalette } from "@angular/material/core";

interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styleUrls: ["./template.component.scss"],
})
export class TemplateComponent implements OnInit, AfterViewInit {
  @Input() templateData: any;
  edit;
  showBackdrop;
  @ViewChild("templateList", { static: false }) templateList;

  searchKey;
  stages: any[] = [];
  titleState = "idle";
  oldTitle: string;
  newTitle: string;
  descriptionState = "idle";
  oldDescription: string;
  newDescription: string;

  showImportOptions = false;
  importStatus = false;
  showTagOptions = false;

  workflowTypes: SelectInterface[] = [
    { value: "w-0", viewValue: "Time" },
    { value: "w-1", viewValue: "Date" },
  ];

  selectedWorkflowType: any;
  primaryColor: ThemePalette = "primary";

  unreadNotifications = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // console.log('templateData ', this.templateData);

    // this.oldTitle = this.templateData.name;
    // this.newTitle = this.oldTitle;
    // this.oldDescription = this.templateData.data.description;
    // this.newDescription = this.oldDescription;
    this.selectedWorkflowType = this.workflowTypes[0].value;
    this.unreadNotifications = true;
    this.getStages();
  }

  ngAfterViewInit() {
    this.appyResize();
  }

  /**
   *
   * @description gets list of stages and calls first stage details
   */
  getStages() {
    this.dataService.getStages().subscribe((data: any[]) => {
      this.stages = data;
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
  }

  collapseAllStages() {
    // console.log("stages ", this.stages);
    this.stages.forEach((stage: any) => {
      const modifiedStage = { collapsed: true, ...stage };
      this.dataService
        .updateStage(modifiedStage)
        .subscribe((res) => console.log(res));
      stage.collapsed = true;
    });
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
      this.templateData.waveTypes.forEach((waveType) => {
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
    console.log(this.templateList);
    const id = Math.random().toString(6);
    this.templateData.waveTypes.unshift({
      id: id,
      name: "New group",
      theme: this.templateList.getRandomColor(),
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
        ...this.templateData,
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
        ...this.templateData,
      };
      // this.dataService
      //   .updateTemplate(newTemplate)
      //   .subscribe((res: any) => console.log(res));
    }
  }
}
