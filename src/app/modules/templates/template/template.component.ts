import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { DataService } from "src/services/data.service";

interface WorkflowType {
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
  titleState: string = "idle";
  oldTitle: string;
  newTitle: string;
  descriptionState: string = "idle";
  oldDescription: string;
  newDescription: string;

  showImportOptions: boolean = false;
  importStatus: boolean = false;

  workflowTypes: WorkflowType[] = [
    { value: "w-0", viewValue: "Time" },
    { value: "w-1", viewValue: "Status" },
  ];

  selectedWorkflowType: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // console.log('templateData ', this.templateData);

    // this.oldTitle = this.templateData.name;
    // this.newTitle = this.oldTitle;
    // this.oldDescription = this.templateData.data.description;
    // this.newDescription = this.oldDescription;
    this.selectedWorkflowType = this.workflowTypes[0].value;
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

  setBadgeBgColor(stageState = "undefined") {
    let backgroundColor = "#FA0B10";
    switch (stageState) {
      case "Undefined":
        backgroundColor = "#FA0B10";
        break;
      case "Configured":
        backgroundColor = "#D0CA00";
        break;
      case "Ready":
        backgroundColor = "#006BD8";
        break;
      case "Finished":
        backgroundColor = "#00BB00";
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
