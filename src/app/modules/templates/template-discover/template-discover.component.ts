import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-template-discover',
  templateUrl: './template-discover.component.html',
  styleUrls: ['./template-discover.component.scss'],
})
export class TemplateDiscoverComponent implements OnInit {
  imgHovered = false;
  searchKey;
  accountClicked = false;

  constructor(private location: Location) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  accountDetails() {
    this.accountClicked = true;
  }
}
