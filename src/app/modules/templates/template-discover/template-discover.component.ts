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
    this.accountClicked = true;
  }
}
