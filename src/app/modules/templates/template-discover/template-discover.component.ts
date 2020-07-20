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
  itemsToAdd: any[] = [];

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

  selectAll(sourceId, groupId) {
    let currentSources = this.selectedApp.IP.find(
      (ip) => ip.address === this.selectedIPAddress
    ).sources;
    let currentSource = currentSources.find((s) => s.id == sourceId);
    let currentGroups = currentSource.groups;
    let group = currentGroups.find((g) => g.id == groupId);
    let currentItems = group.items;
    for (let i = 0; i < currentItems.length; i++) {
      this.itemSelectList[
        sourceId + '_' + groupId + '_' + currentItems[i].id
      ] = true;
    }
  }

  unselectAll(sourceId, groupId) {
    let currentSources = this.selectedApp.IP.find(
      (ip) => ip.address === this.selectedIPAddress
    ).sources;
    let currentSource = currentSources.find((s) => s.id == sourceId);
    let currentGroups = currentSource.groups;
    let group = currentGroups.find((g) => g.id == groupId);
    let currentItems = group.items;
    for (let i = 0; i < currentItems.length; i++) {
      this.itemSelectList[
        sourceId + '_' + groupId + '_' + currentItems[i].id
      ] = false;
    }
  }

  getCheckboxState(event, src, id) {
    console.log('event checked, src and id ', event.checked, src, id);
    switch (src) {
      case 'source':
        // just indicates if any nested checkboxes are selected
        console.log('destinations ', this.destinations);
        break;
      case 'group':
        var sourceId = id.split('_')[0];
        var groupId = id.split('_')[1];
        var destination = new Destination();
        destination.appName = this.selectedApp.name;
        destination.ipAddress = this.selectedIPAddress;
        var selectedSource = this.sources.find((s) => s.id == sourceId);
        destination.name = selectedSource.name;
        destination.desc = selectedSource.desc;
        destination.id = selectedSource.id;
        var selectedGroup = selectedSource.groups.find((g) => g.id == groupId);
        this.curSourceGroupLength[groupId] = selectedGroup.items.length;
        destination.groups.push(selectedGroup);
        if (event.checked) {
          this.selectAll(sourceId, groupId);
          this.showSidebar = true;
          if (this.destinations.find((d) => d.id === destination.id)) {
            // console.log('same source!');
            let prevIndex = this.destinations.findIndex(
              (d) => d.id === destination.id
            );
            this.destinations[prevIndex].groups.push(selectedGroup);
          } else {
            // console.log('different source');
            this.destinations.push(destination);
          }
        } else {
          this.unselectAll(sourceId, groupId);
          if (this.destinations.find((d) => d.id === destination.id)) {
            // console.log('same source!');
            let prevIndex = this.destinations.findIndex(
              (d) => d.id === destination.id
            );
            this.destinations[prevIndex].groups = this.destinations[
              prevIndex
            ].groups.filter(
              (g) => JSON.stringify(g) !== JSON.stringify(selectedGroup)
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
        var sourceId = id.split('_')[0];
        var groupId = id.split('_')[1];
        var itemId = id.split('_')[2];
        var destination = new Destination();
        destination.appName = this.selectedApp.name;
        destination.ipAddress = this.selectedIPAddress;
        var selectedSource = this.sources.find((s) => s.id == sourceId);
        destination.name = selectedSource.name;
        destination.desc = selectedSource.desc;
        destination.id = selectedSource.id;
        var selectedGroup = selectedSource.groups.find((g) => g.id == groupId);
        var selectedItem = selectedGroup.items.find((i) => i.id == itemId);
        if (event.checked) {
          this.itemSelectList[sourceId + '_' + groupId + '_' + itemId] = true;
          this.showSidebar = true;
          this.curSourceGroupLength[groupId]++;
          if (destination.groups.length == 0) {
            var newGroup = new Group();
            newGroup.id = selectedGroup.id;
            newGroup.name = selectedGroup.name;
            newGroup.items.push(selectedItem);
            destination.groups.push(newGroup);
          } else {
            if (this.destinations.find((d) => d.id === destination.id)) {
              console.log('adding in same source');
              let prevSrcIndex = this.destinations.findIndex(
                (d) => d.id === destination.id
              );
              let prevGroups = this.destinations[prevSrcIndex].groups;
              if (prevGroups.find((g) => g.id === selectedGroup.id)) {
                console.log('same source same group');
                let prevGrpIndex = prevGroups.findIndex(
                  (g) => g.id == selectedGroup.id
                );
                destination.groups[prevGrpIndex].items.push(selectedItem);
              } else {
                console.log('group id doesnt exists');
                // emptyGroup.items.push(
                //   selectedItem
                // );
                // destination.groups.push(emptyGroup);
              }
            } else {
              // source not there
            }
          }

          this.destinations.push(destination);
        } else {
          this.itemSelectList[sourceId + '_' + groupId + '_' + itemId] = false;
          if (this.groupSelectList[sourceId + '_' + groupId]) {
            this.groupSelectList[sourceId + '_' + groupId] = false;
          }
          if (this.sourceSelectList[sourceId]) {
            this.sourceSelectList[sourceId] = false;
          }
          this.curSourceGroupLength[groupId]--;
          // if (!destination.groups.includes(emptyGroup)) {
          //   destination.groups.push(emptyGroup);
          // }
          // console.log('unchecked ', destination);
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
