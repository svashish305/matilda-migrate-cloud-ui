import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { DataService } from 'src/services/data.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as uuid from 'uuid';
import { Group, Template, Item } from 'src/app/models/data.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';


interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() templateData: Template;
  @Output() updateTemplate = new EventEmitter();
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
  selectedTask: Item;
  showTaskOptions = false;

  templateImgHover = false;
  templateAvatarUrl: any;

  taskImgHover = false;

  public currentTemplate: Template;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private deviceService: DeviceDetectorService,
    private location: Location,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.templateId = params.id;
    });

    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();

    this.getTemplates();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.templateData);
    console.log(changes);
  }

  ngAfterViewInit() {
    this.appyResize();
  }

  getTemplates() {
    this.dataService.getTemplates().subscribe((data: any[]) => {
      this.templatesToImport = data.filter((d) => d.id !== this.templateId);
    });
  }

  changeAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.templateData.image = event.target.result;
        this.updateTemplate.emit(this.templateData);
      };
    }
  }


  changeTaskAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.selectedTask.image = event.target.result;
      };
      console.log(this.selectedTask);

      this.templateData.groups.forEach((_group: Group) => {
        if (_group.id === this.selectedTask.groupId) {
          _group.items.forEach((_item: Item) => {
            if(_item.id === this.selectedTask.id) {
              _item.image = this.selectedTask.image;
              console.log(_item);
            }
          });
        }
      });

      this.updateTemplate.emit(this.templateData);

    }
  }

  setBadgeBgColor(stageState = "Defined") {
    let backgroundColor = "#99a1a9";
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
    this.currTemplate.tags = event;
    this.dataService
      .updateTemplate(this.templateId, this.currTemplate)
      .subscribe((newTemplate: any) => {
        console.log('updated template ', newTemplate);
        this.templateData = newTemplate;
        this.currTemplate = newTemplate;
      });
  }

  addStage() {

    let group = new Group();
    group.id = uuid.v4();
    group.name = 'Untitled Group' + '_' + group.id;
    group.order = this.templateData.groups.length >= 1 ? this.templateData.groups[this.templateData.groups.length - 1].order + 100 : 100;

    this.templateData.groups.push(group);
    this.templateData.groups = [...this.templateData.groups];

    console.log(this.templateData);

    this.updateTemplate.emit(this.templateData);

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
    // if (!edit) {
    //   this.showBackdrop = false;
    //   this.templateData.waveTypes.forEach((waveType) => {
    //     waveType.templates.forEach((template) => {
    //       template.selected = false;
    //     });
    //   });
    // }
    setTimeout(() => {
      this.appyResize();
    }, 0);
  }

  openTaskDetails(payload: any) {
    
    let task: Item = payload.task;
    let group: Group = payload.group;

    if (task) {

      this.selectedTask = task;
      this.templateData.groups.forEach((_group: Group) => {
        if (_group.id === this.selectedTask.groupId) {
          _group.items.forEach((_item: Item) => {
            if (_item.id === this.selectedTask.id) {
              _item = this.selectedTask;
            }
          });
        }
      });

    } else {

      let _task = new Item();
      _task.id = uuid.v4();
      _task.name = 'Untitled Task' + '_' + _task.id;
      _task.groupId = group.id;
      _task.order = group.items.length >= 1 ? group.items[group.items.length - 1].order + 100 : 100;

      this.selectedTask = _task;

      // this.templateData.groups.forEach((_group: Group) => {
      //   if (_group.id === this.selectedTask.groupId) {
      //     _group.items.push(this.selectedTask);
      //   }
      // });
      this.currTemplate = Object.assign({},this.templateData);
      this.currTemplate.groups.forEach((_group: Group) => {
        if (_group.id === this.selectedTask.groupId) {
          _group.items.push(this.selectedTask);
        }
      });

      this.openSnackBar('Please Wait.. While we are waiting for the server to respond', 'info')
      this.updateTemplate.emit(this.currTemplate);
    }
   

    this.showTaskOptions = true;
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

  onSaveConfig(payload: any) {

  }

  onClose(event: any) {
    this.showTaskOptions = !event;
  }
  onSaveTemplateFormat(formatPaylod: any) {
    this.openSnackBar('Task Template Updated Successful', 'success');
  }
  openSnackBar(message: string, snackType: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, snackType: snackType, snackBar: this.snackBar },
      panelClass: [snackType]
    });
  }
  updateTaskTitle(taskName) {
    //  API Task Name Update  
    // this.dataService.updateTaskName(taskName).subscribe(res=>{
    //   if(res){        
    //   }
    // })
  }
  uniqueTaskTitle(taskName) {
    let groupList: Group[] = this.templateData.groups;
    let filteredGroupList = groupList.filter(it => {
      return it.id === this.selectedTask.groupId;
    })
    let groupItems = filteredGroupList[0].items;
    let keyExists;
    for (let key of groupItems) {
      if (key.name.toLowerCase() === taskName.toLowerCase()) {
        keyExists = { isEventTaskUnique: true };
        break;
      }
      else {
        keyExists = null;
      }
    }
    return keyExists;
    // API Logic
    // this.dataService.taskTitileValid(taskName).subscribe(res=>{
    //   if(res == true){
    //     this.isEventTaskUnique = true 
    //   }
    //   else{
    //     this.isEventTaskUnique =  false
    //   }
    // })  
  }
  updateTaskDescription(taskDescription) {
    //  API Task Descripiton Update  
    // this.dataService.updateTaskDescription(taskDescription).subscribe(res=>{
    //   if(res){        
    //   }
    // })
  }
}
