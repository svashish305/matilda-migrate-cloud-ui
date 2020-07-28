import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, Group, Destination, Source } from 'src/app/models/data.model';
import * as uuid from 'uuid';
import { DeviceDetectorService } from 'ngx-device-detector';

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
  destinations: Destination[] = [];
  sourceCollapseList: boolean[] = [];
  groupCollapseList: boolean[] = [];
  groupSelectList: boolean[] = [];
  itemSelectList: boolean[] = [];
  MAXN = 10000000;
  showSidebar = false;
  isMobile = false;
  templateId: any;
  currTemplate: any;
  itemCountInGroup: any[] = [];
  checkedIDs: checkedID[] = [];

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private deviceService: DeviceDetectorService
  ) {
    for (let i = 0; i < this.MAXN; i++) {
      this.groupSelectList.push(false);
      this.itemSelectList.push(false);
      this.itemCountInGroup.push(0);
    }
  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();

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

        let selectedIPIndex = this.selectedApp.IP.findIndex(ip => ip.address == ipAddress);
        let curSources = this.selectedApp.IP[selectedIPIndex].sources;
        let selectedSource = curSources.find((s) => s.id == sourceId);
        let selectedGrpIndex = selectedSource.groups.findIndex((g) => g.id == groupId);
        let markedItems = selectedSource.groups[selectedGrpIndex].items;
        this.itemCountInGroup[groupId] = 0;
        markedItems.forEach(item => {
          let id = sourceId + '_' + groupId + '_' + item.id;
          this.getCheckboxState(event, 'item', id, ipAddress);
        });
        // console.log('destinations at grp level ', this.destinations);
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
          let markChecked: checkedID = { ipAddress, sourceId, groupId, itemId };
          if (!this.checkedIDs.find(cID => JSON.stringify(cID) == JSON.stringify(markChecked))) {    // taking care of duplicates
            this.checkedIDs.push(markChecked);
          }
        } else {
          // unchecked
          this.itemSelectList[sourceId + '_' + groupId + '_' + itemId] = false;
          if (this.groupSelectList[sourceId + '_' + groupId]) {
            this.groupSelectList[sourceId + '_' + groupId] = false;
          }
          this.itemCountInGroup[groupId]--;
          if(this.itemCountInGroup[groupId] < 0) {
            this.itemCountInGroup[groupId] = 0;
          }
          let markUncheckedID: checkedID = { ipAddress, sourceId, groupId, itemId };
          this.checkedIDs = this.checkedIDs.filter(cID => JSON.stringify(cID) != JSON.stringify(markUncheckedID));
        }
        this.destinations = this.pushToDestinations(this.checkedIDs);
        if (this.destinations.length == 0) {
          this.itemCountInGroup[groupId] = 0;
          this.showSidebar = false;
        }
        // console.log('destinations at item level ', this.destinations);
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

  selectAllIfChildsTrue(ipAddress, sourceId, groupId): boolean {
    let selectedIPIndex = this.selectedApp.IP.findIndex(ip => ip.address == ipAddress);
    let curSources = this.selectedApp.IP[selectedIPIndex].sources;
    let selectedSource = curSources.find((s) => s.id == sourceId);
    let selectedGrpIndex = selectedSource.groups.findIndex((g) => g.id == groupId);
    let markedItems = selectedSource.groups[selectedGrpIndex].items;
    for (let i = 0; i < markedItems.length; i++) {
      if (!this.itemSelectList[sourceId + '_' + groupId + '_' + markedItems[i].id]) {
        return false;
      }
    }
    return true;
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

    this.dataService
      .updateTemplate(this.templateId, modifiedTemplate)
      .subscribe((newTemplate: any) => {
        this.currTemplate = newTemplate;
      });
    this.router.navigate([`/templates/${this.templateId}`]);
  }
}
