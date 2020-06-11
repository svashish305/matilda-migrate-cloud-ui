import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-top-header",
  templateUrl: "./top-header.component.html",
  styleUrls: ["./top-header.component.scss"],
})
export class TopHeaderComponent implements OnInit {
  unreadNotifications = false;

  constructor() {}

  ngOnInit() {
    this.unreadNotifications = true;
  }
}
