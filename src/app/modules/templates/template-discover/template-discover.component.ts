import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/services/data.service';

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
  contentSelectList: boolean[] = [];
  allSelected = false;
  MAXN = 10000000;
  importedTasks: any[] = [];

  constructor(private location: Location, private dataService: DataService) {
    for (let i = 0; i < this.MAXN; i++) {
      this.sourceSelectList.push(false);
      this.contentSelectList.push(false);
    }
  }

  ngOnInit() {
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
    });
    this.accountClicked = true;
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
    }
    this.allSelected = !this.allSelected;
  }

  selectAll(sourceIndex, taskIndex) {
    let currentSources = this.selectedApp.IP.find(
      (ip) => ip.address === this.selectedIPAddress
    ).sources;
    let currentTasks = currentSources[sourceIndex].tasks;
    let task = currentTasks[taskIndex];
    let currentContents = task.contents;
    for (let i = 0; i < currentContents.length; i++) {
      this.contentSelectList[sourceIndex + '_' + taskIndex + '_' + i] = !this
        .contentSelectList[sourceIndex + '_' + taskIndex + '_' + i];
    }
  }

  selectContentUnderTask(sourceIndex, taskIndex, contentIndex) {
    this.contentSelectList[
      sourceIndex + '_' + taskIndex + '_' + contentIndex
    ] = !this.contentSelectList[
      sourceIndex + '_' + taskIndex + '_' + contentIndex
    ];
    console.log(
      'content status ',
      this.contentSelectList[sourceIndex + '_' + taskIndex + '_' + contentIndex]
    );
  }
}
