import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item, Group, Destination, Source } from 'src/app/models/data.model';
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
  sources: Source[] = [];
  destinations: Destination[] = [];
  sourceCollapseList: boolean[] = [];
  groupCollapseList: boolean[] = [];
  sourceSelectList: boolean[] = [];
  groupSelectList: boolean[] = [];
  itemSelectList: boolean[] = [];
  MAXN = 10000000;
  showSidebar = false;

  templateId: any;
  currTemplate: any;
  curSourceGroupLength: any[] = [];

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    for (let i = 0; i < this.MAXN; i++) {
      this.sourceSelectList.push(false);
      this.groupSelectList.push(false);
      this.itemSelectList.push(false);
      this.curSourceGroupLength.push(0);
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
      this.sources = this.selectedApp.IP[0].sources;
    });
    this.accountClicked = true;
  }

  selectAll(sourceIndex, groupIndex) {
    let currentSources = this.selectedApp.IP.find(
      (ip) => ip.address === this.selectedIPAddress
    ).sources;
    let currentGroups = currentSources[sourceIndex].groups;
    let group = currentGroups[groupIndex];
    let currentItems = group.items;
    for (let i = 0; i < currentItems.length; i++) {
      this.itemSelectList[sourceIndex + '_' + groupIndex + '_' + i] = true;
    }
  }

  unselectAll(sourceIndex, groupIndex) {
    let currentSources = this.selectedApp.IP.find(
      (ip) => ip.address === this.selectedIPAddress
    ).sources;
    let currentGroups = currentSources[sourceIndex].groups;
    let group = currentGroups[groupIndex];
    let currentItems = group.items;
    for (let i = 0; i < currentItems.length; i++) {
      this.itemSelectList[sourceIndex + '_' + groupIndex + '_' + i] = false;
    }
  }

  getCheckboxState(event, src, id) {
    console.log('event checked, src and id ', event.checked, src, id);
    switch (src) {
      case 'source':
        if (event.checked) {
          this.sourceSelectList[id] = !this.sourceSelectList[id];
          let source = this.sources[id];
          for (let i = 0; i < source.groups.length; i++) {
            this.selectAll(id, i);
            this.groupSelectList[id + '_' + i] = true;
          }

          this.showSidebar = true;
          this.destinations.push(source);
        } else {
          let source = this.sources[id];
          for (let i = 0; i < source.groups.length; i++) {
            this.unselectAll(id, i);
            this.groupSelectList[id + '_' + i] = false;
          }
          this.destinations = this.destinations.filter(
            (d) => JSON.stringify(d) !== JSON.stringify(source)
          );
        }
        console.log('destinations ', this.destinations);
        break;
      case 'group':
        var sourceIndex = id.split('_')[0];
        var groupIndex = id.split('_')[1];
        var destination = new Destination();
        destination.appName = this.selectedApp.name;
        destination.ipAddress = this.selectedIPAddress;
        destination.name = this.sources[sourceIndex].name;
        destination.desc = this.sources[sourceIndex].desc;
        destination.id = this.sources[sourceIndex].id;
        destination.groups.push(this.sources[sourceIndex].groups[groupIndex]);
        if (event.checked) {
          this.selectAll(sourceIndex, groupIndex);
          this.showSidebar = true;
          if (this.destinations.find((d) => d.id === destination.id)) {
            // console.log('same source!');
            let prevIndex = this.destinations.findIndex(
              (d) => d.id === destination.id
            );
            this.destinations[prevIndex].groups.push(
              this.sources[sourceIndex].groups[groupIndex]
            );
          } else {
            // console.log('different source');
            this.destinations.push(destination);
          }
        } else {
          this.unselectAll(sourceIndex, groupIndex);
          if (this.destinations.find((d) => d.id === destination.id)) {
            // console.log('same source!');
            let prevIndex = this.destinations.findIndex(
              (d) => d.id === destination.id
            );
            this.destinations[prevIndex].groups = this.destinations[
              prevIndex
            ].groups.filter(
              (g) =>
                JSON.stringify(g) !==
                JSON.stringify(this.sources[sourceIndex].groups[groupIndex])
            );
          } else {
            // console.log('different source');
            this.destinations = this.destinations.filter(
              (d) => JSON.stringify(d) !== JSON.stringify(destination)
            );
          }

          if (
            this.destinations.length == 1 &&
            this.destinations[0].groups.length == 0
          ) {
            this.destinations = [];
          }
        }
        console.log('destinations ', this.destinations);
        break;
      case 'item':
        var sourceIndex = id.split('_')[0];
        var groupIndex = id.split('_')[1];
        var itemIndex = id.split('_')[2];
        var destination = new Destination();
        destination.appName = this.selectedApp.name;
        destination.ipAddress = this.selectedIPAddress;
        destination.name = this.sources[sourceIndex].name;
        destination.desc = this.sources[sourceIndex].desc;
        destination.id = this.sources[sourceIndex].id;
        let emptyGroup = Object.assign(
          {},
          this.sources[sourceIndex].groups[groupIndex]
        );
        emptyGroup.items = [];
        if (this.destinations.find((d) => d.id === destination.id)) {
          // source already there
          let prevSrcIndex = this.destinations.findIndex(
            (d) => d.id === destination.id
          );
          this.destinations[prevSrcIndex].groups.push(
            this.sources[sourceIndex].groups[groupIndex]
          );
        } else {
          // source not there
        }
        // if (destination.groups.find((g) => g.id == emptyGroup.id)) {
        //   console.log('group id exists');
        //   let prevGrpIndex = destination.groups.findIndex(
        //     (g) => g.id == emptyGroup.id
        //   );
        //   destination.groups[prevGrpIndex].items.push(
        //     this.sources[sourceIndex].groups[groupIndex].items[itemIndex]
        //   );
        // } else {
        //   console.log('group id doesnt exists');
        //   emptyGroup.items.push(
        //     this.sources[sourceIndex].groups[groupIndex].items[itemIndex]
        //   );
        //   destination.groups.push(emptyGroup);
        // }
        console.log('here destination is ', destination);
        if (event.checked) {
          this.itemSelectList[
            sourceIndex + '_' + groupIndex + '_' + itemIndex
          ] = true;
          this.showSidebar = true;

          if (!destination.groups.includes(emptyGroup)) {
            destination.groups.push(emptyGroup);
          }
          this.destinations.push(destination);
        } else {
          this.itemSelectList[
            sourceIndex + '_' + groupIndex + '_' + itemIndex
          ] = false;
          if (this.groupSelectList[sourceIndex + '_' + groupIndex]) {
            this.groupSelectList[sourceIndex + '_' + groupIndex] = false;
          }
          if (this.sourceSelectList[sourceIndex]) {
            this.sourceSelectList[sourceIndex] = false;
          }

          if (!destination.groups.includes(emptyGroup)) {
            destination.groups.push(emptyGroup);
          }
          console.log('unchecked ', destination);
        }
        console.log('destinations ', this.destinations);
        break;
      default:
        this.showSidebar = false;
        break;
    }
  }

  getIP() {
    return this.selectedIPAddress;
  }

  changeIP(ipAddress) {
    this.isIPSelected = true;
    this.sources = this.selectedApp.IP.find(
      (ip) => ip.address === ipAddress
    ).sources;
  }

  deleteInSidebar(destination) {
    this.destinations = this.destinations.filter(
      (d) => JSON.stringify(d) !== JSON.stringify(destination)
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
    // for (let i = 0; i < this.importContents.length; i++) {
    //   let taskId = uuid.v4();
    //   let taskName = this.importContents[i].name;
    //   let newTask = {
    //     id: taskId,
    //     ...new Item(),
    //   };
    //   newTask['name'] = taskName;
    //   newGroup.items.push(newTask);
    // }
    // originalGroups.push(newGroup);
    let modifiedTemplate = { groups: originalGroups, ...this.currTemplate };
    // console.log('new template ', modifiedTemplate);

    // this.dataService
    //   .updateTemplate(this.templateId, modifiedTemplate)
    //   .subscribe((newTemplate: any) => {
    //     this.currTemplate = newTemplate;
    //   });
    // this.router.navigate([`/templates/${this.templateId}`]);
  }
}
