import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-hub",
  templateUrl: "./hub.component.html",
  styleUrls: ["./hub.component.scss"],
})
export class HubComponent implements OnInit {
  templateSelected = false;
  waveSelected = false;
  hubSelected = false;

  constructor() {}

  ngOnInit() {}
}
