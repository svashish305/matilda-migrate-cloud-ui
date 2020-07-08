import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { DataService } from 'src/services/data.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as uuid from 'uuid';
import { Group } from 'src/app/models/data.model';

interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit, AfterViewInit {
  @Input() templateData: any;
  searchKey;
  edit;
  showBackdrop;
  @ViewChild('templateList', { static: false }) templateList;

  favourite = false;
  templateId: any;
  currTemplate: any;
  currTemplateTags: any[];
  templatesToImport: any[] = [];
  selectedTemplatesToImport: any[] = [];
  stages: any[] = [];
  titleState = 'idle';
  oldTitle: string;
  newTitle: string;
  descriptionState = 'idle';
  oldDescription: string;
  newDescription: string;

  isMobile = false;
  isTablet = false;
  isDesktop = false;

  imgHovered = false;
  showImportOptions = false;
  importStatus = false;
  showTagOptions = false;
  selectedTask: any;
  showTaskOptions = false;

  templateImgHover = false;
  templateAvatarUrl: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private deviceService: DeviceDetectorService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.templateId = params.id;
    });

    this.dataService
      .getTemplate(this.templateId)
      .subscribe((currentTemplate: any) => {
        this.currTemplate = currentTemplate;
        this.currTemplateTags = currentTemplate.tags;
      });

    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();

    this.getStages();

    this.getTemplates();
  }

  ngAfterViewInit() {
    this.appyResize();
  }

  getTemplates() {
    this.dataService.getTemplates().subscribe((data: any[]) => {
      this.templatesToImport = data.filter((d) => d.id !== this.templateId);
    });
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

  changeAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.templateAvatarUrl = event.target.result;
      };

      this.uploadFile(event.target.files[0]);
    }
  }

  uploadFile(file) {
    this.dataService.upload(file).subscribe(
      (res: any) => {
        console.log('file uploaded as', res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setBadgeBgColor(stageState = 'Defined') {
    let backgroundColor = '#99a1a9';
    switch (stageState) {
      case 'Defined':
        backgroundColor = '#99a1a9';
        break;
      case 'Configured':
        backgroundColor = '#012b7a';
        break;
      case 'In Progress':
        backgroundColor = '#006bd4';
        break;
      case 'Success':
        backgroundColor = '#0ba73d';
        break;
      case 'Failed':
        backgroundColor = '#d91b1b';
        break;
      case 'Paused':
        backgroundColor = '#fc9528';
        break;
      default:
        break;
    }
    return { backgroundColor };
  }

  goBack() {
    this.location.back();
  }

  updateTags(event: any) {
    this.currTemplateTags = event;
    console.log('tags ', this.currTemplateTags);
    let updatedTemplate = { tags: this.currTemplateTags, ...this.currTemplate };
    this.dataService
      .updateTemplate(this.templateId, updatedTemplate)
      .subscribe((newTemplate: any) => {
        console.log('updated template ', newTemplate);
        this.templateData = newTemplate;
        this.currTemplate = newTemplate;
      });
  }

  addStage() {
    const id = uuid.v4();
    let newStage = { id, ...new Group() };

    this.currTemplate.groups.push(newStage);
    this.templateData = this.currTemplate;
    console.log(newStage);
  }

  onCheck(event, template) {
    event.stopPropagation();
    if (!this.selectedTemplatesToImport.includes(template)) {
      this.selectedTemplatesToImport.push(template);
    }
  }

  importTemplates() {
    let newStagesAndTasks = [];
    this.selectedTemplatesToImport.forEach((selectedTemplate: any) => {
      if (selectedTemplate.groups && selectedTemplate.groups.length) {
        selectedTemplate.groups.forEach((group) => {
          newStagesAndTasks.push(group);
        });
      }
    });
    // console.log('new stuff to copy ', newStagesAndTasks);
    newStagesAndTasks.forEach((newStageTask: any) => {
      this.currTemplate.groups.push(newStageTask);
    });
    // console.log('updated ', this.currTemplate);
    this.templateData = this.currTemplate;
    this.selectedTemplatesToImport = [];
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

  openTaskDetails(task) {
    if (task) {
      this.selectedTask = task;
    } else {
      this.selectedTask = {
        id: 123,
        name: 'Untitled Task',
        description: 'Task Description',
        order: 100,
        pluginName: 'AWS',
        pluginId: 1,
        serviceId: '1',
        actionId: '1',
        serviceName: 'vm',
        actionName: 'Create',
        status: 'Configured',
        progress: 10,
        keyVault: {
          id: 1,
          name: 'AWS',
        },
        input:
          '{"select_account":"1","stackname":"fgjdgfhg","instance_name":"ghh","keyname":"gghgh","instance":"hhkvh","zone":"hgjh","vpc":"hg","subnet":"ghg","security":"ghgjhhgh","security_allowed":"hgj","ami":"hg"}',
        output: null,
        startDate: '6/1/2020',
        endDate: '12/11/2020',
        duration: null,
        dependencies: [
          {
            groupId: 1234,
            taskId: 345345,
            mode: 'before',
          },
        ],
        notification: '{"type":"email/hook","id":"1","payload":"emailid/url"}',
      };
    }
    this.showTaskOptions = true;
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
      name: 'New group',
      theme: this.templateList.getRandomColor(),
      edit: true,
      templates: [],
    });
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
        ...this.templateData,
      };
      // this.dataService
      //   .updateTemplate(newTemplate)
      //   .subscribe((res: any) => console.log(res));
    }
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
        ...this.templateData,
      };
      // this.dataService
      //   .updateTemplate(newTemplate)
      //   .subscribe((res: any) => console.log(res));
    }
  }

  onSaveConfig(payload: any) {}

  onClose(event: any) {
    this.showTaskOptions = !event;
  }
  onSaveTemplateFormat(formatPaylod: any) {}
}
