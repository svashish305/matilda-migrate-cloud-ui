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

  constructor(private location: Location, private dataService: DataService) {}

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

  getIP() {}

  changeIP(ipAddress) {
    this.isIPSelected = true;
    this.selectedIPSources = this.selectedApp.IP.find(
      (ip) => ip.address === ipAddress
    ).sources;
  }

  onCheck(event, source) {
    console.log('selected source ', source);
  }
}
