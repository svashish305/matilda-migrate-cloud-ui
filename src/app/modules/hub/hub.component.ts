import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-hub",
  templateUrl: "./hub.component.html",
  styleUrls: ["./hub.component.scss"],
})
export class HubComponent implements OnInit {
  searchKey;
  isTemplateFavouritesCollapsed: true;
  isWorkflowFavouritesCollapsed: false;

  constructor() {}

  ngOnInit() {}

  /**
   *
   * @description searches the wavelist using the search key
   */

  search(e) {
    // if (!this.searchKey) {
    //   this.templates = this.rawtemplates;
    //   return true;
    // }
    // this.templates = this.rawtemplates.filter((x) => {
    //   return x.name.toLowerCase().search(this.searchKey.toLowerCase()) !== -1;
    // });
  }
}
