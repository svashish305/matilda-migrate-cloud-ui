import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Item, Group, Destination, Source } from 'src/app/models/data.model';
import * as uuid from 'uuid';

export interface checkedID {
  ipAddress: any;
  sourceId: any;
  groupId: any;
  itemId: any;
}

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
  // destinations: Destination[] = [];
  destinations: any[] = [];
  sourceCollapseList: boolean[] = [];
  groupCollapseList: boolean[] = [];
  groupSelectList: boolean[] = [];
  itemSelectList: boolean[] = [];
  MAXN = 10000000;
  showSidebar = false;

  templateId: any;
  currTemplate: any;
  itemCountInGroup: any[] = [];
  checkedIDs: checkedID[] = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    for (let i = 0; i < this.MAXN; i++) {
      this.groupSelectList.push(false);
      this.itemSelectList.push(false);
      this.itemCountInGroup.push(0);
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

  getCheckboxState(event, src, id, ipAddress) {
    switch (src) {
      case 'group':
        var sourceId = id.split('_')[0];
        var groupId = id.split('_')[1];
        var destination = new Destination();
        destination.appName = this.selectedApp.name;
        destination.ipAddress = ipAddress;
        var selectedIPIndex = this.selectedApp.IP.findIndex(ip => ip.address == ipAddress);
        var curSources = this.selectedApp.IP[selectedIPIndex].sources;
        var selectedSource = curSources.find((s) => s.id == sourceId);
        destination.name = selectedSource.name;
        destination.desc = selectedSource.desc;
        destination.id = selectedSource.id;
        var selectedGroup = selectedSource.groups.find((g) => g.id == groupId);
        this.itemCountInGroup[groupId] = selectedGroup.items.length;
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
          this.itemCountInGroup[groupId] = 0;
          this.unselectAll(sourceId, groupId);
          if (this.destinations.find((d) => d.id === destination.id)) {
            // console.log('same source!');
            let prevIndex = this.destinations.findIndex(
              (d) => d.id == destination.id
            );
            this.destinations[prevIndex].groups = this.destinations[
              prevIndex
            ].groups.filter(
              (g) => JSON.stringify(g) !== JSON.stringify(selectedGroup)
            );
            if (!this.destinations[prevIndex].groups.length) {
              this.destinations = this.destinations.filter(
                (d) => d.id != this.destinations[prevIndex].id
              );
            }
          } else {
            // console.log('different source');
            this.destinations = this.destinations.filter(
              (d) => JSON.stringify(d) !== JSON.stringify(destination)
            );
          }
        }
        console.log('destinations ', this.destinations);
        break;
      case 'item':
        var sourceId = id.split('_')[0];
        var groupId = id.split('_')[1];
        var itemId = id.split('_')[2];

        if (event.checked) {
          // checked
          this.itemSelectList[sourceId + '_' + groupId + '_' + itemId] = true;
          this.showSidebar = true;
          this.itemCountInGroup[groupId]++;
          this.checkedIDs.push({ ipAddress, sourceId, groupId, itemId });
        } else {
          // unchecked
          this.itemSelectList[sourceId + '_' + groupId + '_' + itemId] = false;
          if (this.groupSelectList[sourceId + '_' + groupId]) {
            this.groupSelectList[sourceId + '_' + groupId] = false;
          }
          this.itemCountInGroup[groupId]--;

          let markUncheckedID: checkedID = { ipAddress, sourceId, groupId, itemId };
          this.checkedIDs = this.checkedIDs.filter(cID => JSON.stringify(cID) != JSON.stringify(markUncheckedID));
        }
        this.destinations = this.pushToDestinations(this.checkedIDs);
        if (this.destinations.length == 0) {
          this.showSidebar = false;
        }
        // console.log('destinations ', this.destinations);
        break;
      default:
        this.showSidebar = false;
        break;
    }
  }

  groupBy(array, key) {
    return array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  pushToDestinations(checkedIDs: checkedID[]) {
    // console.log('checked final list ', checkedIDs);
    let groupByIP = this.groupBy(checkedIDs, 'ipAddress');
    let dests: any[] = [];
    let destinationsLen = 0;
    for (let [key, value] of Object.entries(groupByIP)) {
      // here key is IP
      let valuesOfIP = value;
      let sourceIDsOfIP = this.groupBy(valuesOfIP, 'sourceId');
      let noOfCards = Object.keys(sourceIDsOfIP).length;
      destinationsLen += noOfCards;
      let curIP = this.selectedApp.IP.find(ip => ip.address == key);
      let curIPIndex = this.selectedApp.IP.findIndex(ip => ip.address == key);
      let sourcesOfIP = this.selectedApp.IP[curIPIndex].sources;
      let srcs: Destination[] = [];
      for (let [key, value] of Object.entries(sourceIDsOfIP)) {
        // here key is sourceId
        let valuesOfSrc = value;
        let groupIDsOfSrc = this.groupBy(valuesOfSrc, 'groupId');
        let curSrc = sourcesOfIP.find(s => s.id == key);
        let newSource = Object.assign({}, curSrc);
        let src: Destination = new Destination();
        src.appName = this.selectedApp.name;
        src.ipAddress = curIP.address;
        src.id = key;
        src.name = newSource.name;
        src.desc = newSource.desc;
        for (let [key, value] of Object.entries(groupIDsOfSrc)) {
          // here key is groupId
          let valuesOfGrp = value;
          let itemIDsOfGrp = this.groupBy(valuesOfGrp, 'itemId');
          let curGrp = newSource.groups.find(g => g.id == key);
          let itemsOfGrp = curGrp.items;
          let newGroup = Object.assign({}, curGrp);
          newGroup.items = [];
          for (let [key, value] of Object.entries(itemIDsOfGrp)) {
            // here key is itemId
            let curItem = itemsOfGrp.find(i => i.id == key);
            newGroup.items.push(curItem);
          }
          if (src.groups.length <= curSrc.groups.length) {
            src.groups.push(newGroup);
          }
        }
        if (srcs.length <= noOfCards) {
          srcs.push(src);
        }
      }
      dests.push(srcs);
    }
    dests = [].concat.apply([], dests);
    // console.log('dests ', dests);
    return dests;
  }

  isSourceChecked(sourceId): boolean {
    let curSource = this.sources.find((s) => s.id == sourceId);
    if (
      this.destinations.find((d) => d.id == curSource.id && d.groups.length > 0)
    ) {
      return true;
    } else {
      return false;
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
    // console.log('destinations to import ', this.destinations);
    let allGroups: any[] = [];
    this.destinations.forEach((d: any) => {
      allGroups.push(...d.groups);
    });
    allGroups.forEach((g) => {
      g.name =
        this.selectedApp.name + ' : ' + this.selectedIPAddress + ' : ' + g.name;
      g.id = uuid.v4();
      g.items.forEach((i) => {
        i.id = uuid.v4();
      });
    });
    let modifiedTemplate = this.currTemplate;
    allGroups.forEach((g) => {
      modifiedTemplate.groups.push(g);
    });

    //   this.dataService
    //     .updateTemplate(this.templateId, modifiedTemplate)
    //     .subscribe((newTemplate: any) => {
    //       this.currTemplate = newTemplate;
    //     });
    //   this.router.navigate([`/templates/${this.templateId}`]);
  }
}
