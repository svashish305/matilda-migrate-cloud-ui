import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item, Group } from 'src/app/models/data.model';
import * as uuid from 'uuid';

@Component({
  selector: 'app-template-discover',
  templateUrl: './template-discover.component.html',
  styleUrls: ['./template-discover.component.scss'],
})
export class TemplateDiscoverComponent implements OnInit {
  imgHovered = false;
  searchKey;
  accountClicked = false;
  apps: any[] = [];
  selectedApp: any;
  selectedIPAddress: any;
  isIPSelected = false;
  selectedIPSources: any;
  sourceCollapseList: boolean[] = [];
  taskCollapseList: boolean[] = [];
  sourceSelectList: boolean[] = [];
  taskSelectList: boolean[] = [];
  contentSelectList: boolean[] = [];
  MAXN = 10000000;
  importContents: any[] = [];
  showSidebar = false;

  templateId: any;
  currTemplate: any;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    for (let i = 0; i < this.MAXN; i++) {
      this.sourceSelectList.push(false);
      this.taskSelectList.push(false);
      this.contentSelectList.push(false);
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.templateId = params.templateId;
    });

    this.dataService.getTemplate(this.templateId).subscribe((template: any) => {
      this.currTemplate = template;
    });

    this.getApps();
  }

  getApps() {
    this.dataService.getApps().subscribe((res: any) => {
      this.apps = res;
    });
  }

  goBack() {
    this.location.back();
  }

  showAppDetails(appId) {
    this.dataService.getApp(appId).subscribe((res: any) => {
      this.selectedApp = res;
      this.selectedIPAddress = this.selectedApp.IP[0].address;
      this.selectedIPSources = this.selectedApp.IP[0].sources;
    });
    this.accountClicked = true;
  }

  getCheckboxState(event, src, id) {
    let contentToImport;
    if (src === 'content') {
      let sourceIndex = id.split('_')[0];
      let taskIndex = id.split('_')[1];
      let contentIndex = id.split('_')[2];
      contentToImport = this.selectedIPSources[sourceIndex].tasks[taskIndex]
        .contents[contentIndex];
    }
    if (event.checked) {
      if (src === 'content') {
        if (!this.importContents.includes(contentToImport)) {
          this.importContents.push(contentToImport);
        }
      }
      this.showSidebar = true;
    } else {
      this.importContents = this.importContents.filter(
        (c) => JSON.stringify(c) !== JSON.stringify(contentToImport)
      );
    }
  }

  getIP() {
    return this.selectedIPAddress;
  }

  changeIP(ipAddress) {
    this.isIPSelected = true;
    this.selectedIPSources = this.selectedApp.IP.find(
      (ip) => ip.address === ipAddress
    ).sources;
  }

  importSourceTasks(sourceIndex, source) {
    this.sourceSelectList[sourceIndex] = !this.sourceSelectList[sourceIndex];
    for (let i = 0; i < source.tasks.length; i++) {
      this.selectAll(sourceIndex, i);
      this.taskSelectList[sourceIndex + '_' + i] = !this.taskSelectList[
        sourceIndex + '_' + i
      ];
    }
  }

  selectAll(sourceIndex, taskIndex) {
    let currentSources = this.selectedApp.IP.find(
      (ip) => ip.address === this.selectedIPAddress
    ).sources;
    let currentTasks = currentSources[sourceIndex].tasks;
    let task = currentTasks[taskIndex];
    let currentContents = task.contents;
    for (let i = 0; i < currentContents.length; i++) {
      if (!this.taskSelectList[sourceIndex + '_' + taskIndex]) {
        this.contentSelectList[sourceIndex + '_' + taskIndex + '_' + i] = true;
      } else {
        this.contentSelectList[sourceIndex + '_' + taskIndex + '_' + i] = false;
      }
    }
  }

  contentClicked(sourceIndex, taskIndex, contentIndex) {
    if (
      this.contentSelectList[sourceIndex + '_' + taskIndex + '_' + contentIndex]
    ) {
      this.taskSelectList[sourceIndex + '_' + taskIndex] = false;
    }
  }

  deleteSourceInSidebar(source) {
    this.selectedIPSources = this.selectedIPSources.filter(
      (s) => JSON.stringify(s) !== JSON.stringify(source)
    );
  }

  import() {
    let originalGroups: any = this.currTemplate.groups;
    let groupId = uuid.v4();
    let newGroup = {
      id: groupId,
      ...new Group(),
    };
    newGroup['name'] = this.selectedApp.name + ' : ' + this.selectedIPAddress;
    for (let i = 0; i < this.importContents.length; i++) {
      let taskId = uuid.v4();
      let taskName = this.importContents[i].name;
      let newTask = {
        id: taskId,
        ...new Item(),
      };
      newTask['name'] = taskName;
      newGroup.items.push(newTask);
    }
    originalGroups.push(newGroup);
    let modifiedTemplate = { groups: originalGroups, ...this.currTemplate };
    // console.log('new template ', modifiedTemplate);

    this.dataService
      .updateTemplate(this.templateId, modifiedTemplate)
      .subscribe((newTemplate: any) => {
        this.currTemplate = newTemplate;
      });
    this.router.navigate([`/templates/${this.templateId}`]);
  }
}
