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
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as uuid from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Template, Item, Group } from 'src/app/utils/models/data.model';
import { DomSanitizer } from '@angular/platform-browser';
import { TemplateService } from '../services/template.service';
import { SnackbarComponent } from '../../material/snackbar/snackbar.component';


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
  @Output() cloneTemplates = new EventEmitter();
  @Output() onTagsUpdate = new EventEmitter();

  public isTagsFormValid: boolean;
  public selectedTabIndex: number = 1;

  searchKey;
  edit;
  showBackdrop;

  favourite = false;
  templateId: any;
  currTemplate: Template;
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
  taskAvatarUrl: any;

  taskImgHover = false;

  public currentTemplate: Template;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private deviceService: DeviceDetectorService,
    private location: Location,
    public snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private _templateService: TemplateService
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
  }

  ngAfterViewInit() {
    this.appyResize();
  }

  getTemplates() {
    this._templateService.getAllTemplates()
      .subscribe((data: any[]) => {
        this.templatesToImport = data.filter((d) => d.id !== this.templateId);
      });

    // this.dataService.getTemplates().subscribe((data: any[]) => {
    //   this.templatesToImport = data.filter((d) => d.id !== this.templateId);
    // });
  }

  changeAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.templateData.image = event.target.result;
        this.updateTemplate.emit({ payload: this.templateData, message: 'Template Icon Updated Successfully', type: 'success' });
      };
    }
  }

  removeAvatar() {
    this.templateData.image = null;
    this.updateTemplate.emit({ payload: this.templateData, message: 'Template Icon Deleted Successfully', type: 'error' });
  }
  

  changeTaskAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.selectedTask.image = event.target.result;

        this.templateData.groups.forEach((_group: Group) => {
          if (_group.id === this.selectedTask.groupId) {
            _group.items.forEach((_item: Item) => {
              if (_item.id === this.selectedTask.id) {
                _item.image = this.selectedTask.image;
              }
            });
          }
        });
        this.updateTemplate.emit({ payload: this.templateData, message: 'Task Icon Updated Successfully', type: 'success' });
      };

    }
  }

  removeTaskAvatar(currentTask: Item) {
    this.templateData.groups.forEach(_group => {
      if (_group.id === currentTask.groupId) {
        _group.items.forEach(_item => {
          _item.image = null;
        });
      }
    });
    this.updateTemplate.emit({ payload: this.templateData, message: 'Task Icon Deleted Successfully', type: 'error' });
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

  goToDiscover() {
    this.router.navigate(['./discover'], { relativeTo: this.route });
  }

  updateTags(event: any) {
    this.isTagsFormValid = !event.valid;
    this.templateData.tags = event.tags;
  }

  saveTags() {
    this.onTagsUpdate.emit({ tags: this.templateData.tags, message: 'Tags Updated Successfully', type: 'success' });
  }

  onCheck(event, template) {
    //event.stopPropagation();
    if (!this.selectedTemplatesToImport.includes(template)) {
      this.selectedTemplatesToImport.push(template);
    }
  }

  importTemplates() {
   
    const selectedTemplates = this.selectedTemplatesToImport.map((_template: Template) => _template.id);

    this.selectedTemplatesToImport = []; 

    this.cloneTemplates.emit({source: selectedTemplates, destination: this.templateData.id,  message: 'Template(s) Imported Successfully', type: 'success'});
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

      this.showTaskOptions = true;

    } else {
      let _task = new Item();
      _task.id = uuid.v4();
      _task.name = 'Untitled Task' + '_' + _task.id;
      _task.groupId = group.id;
      _task.order = group.items.length >= 1 ? group.items[group.items.length - 1].order + 100 : 100;

      this.selectedTask = _task;

      this.templateData.groups.forEach((_group: Group) => {
        if (_group.id === this.selectedTask.groupId) {
          _group.items.push(this.selectedTask);
        }
      });
      // this.currTemplate = Object.assign({}, this.templateData);
      // this.currTemplate.groups.forEach((_group: Group) => {
      //   if (_group.id === this.selectedTask.groupId) {
      //     _group.items.push(this.selectedTask);
      //   }
      // });

      //this.openSnackBar('Please Wait.. While we are waiting for the server to respond', 'info');
      this.updateTemplate.emit({ payload: this.templateData, message: 'Task Added Successfully', type: 'success' });
    }
  }

  sanitizeUrl(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
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
    }
    this.updateTemplate.emit({ payload: this.templateData, message: 'Template Updated Successfully', type: 'success' });
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
    }

    this.updateTemplate.emit({ payload: this.templateData, message: 'Template Updated Successfully', type: 'success' });
  }

  onSaveConfig(task: Item) {
    this.templateData.groups.forEach(_group => {
      if(_group.id = task.groupId) {
        _group.items.forEach(_task => {
          if(_task.id === task.id) {
            _task.input = task.input;
            _task.itemFields = task.itemFields;
          }
        });
      }
    });

    this.templateData.groups = [...this.templateData.groups];
    this.updateTemplate.emit({ payload: this.templateData, message: 'Task Configuration Updated Successfully', type: 'success' });
  }

  onSaveGeneralConfig(task: Item) {
    this.templateData.groups.forEach(_group => {
      if(_group.id === task.groupId) {
        _group.items.forEach(_task => {
          if(_task.id === task.id) {
            _task.pluginId = task.pluginId;
            _task.pluginName = task.pluginName;
            _task.serviceId = task.serviceId;
            _task.serviceName = task.serviceName;
            _task.actionId = task.actionId;
            _task.actionName = task.actionName;
            _task.input = task.input;
            _task.itemFields = task.itemFields;
            console.log(_task);
          }
        });
      }
    });
    this.updateTemplate.emit({ payload: this.templateData, message: 'Task Updated Successfully', type: 'success' });
  }

  updateGroupInfo(payload: Template) {
    this.updateTemplate.emit(payload);
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

  updateTaskTitle(task: Item) {
    this.updateTemplate.emit({ payload: this.templateData, message: 'Task Updated Successfully', type: 'success' });
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
  updateTaskDescription(task: Item) {
    this.updateTemplate.emit({ payload: this.templateData, message: 'Task Updated Successfully', type: 'success' });
  }
  getTemplateName(templateName){
    let initialLetter;
    let letterArray = [];
    let stringArr = templateName.split(/(?<=^\S+)\s/);
    stringArr.forEach(it => {
      initialLetter = it.substring(1, 0);
      letterArray.push(initialLetter);
    });
    let tempName = letterArray[0] + ' '+ letterArray[1];
    return tempName;
    
  }
}
