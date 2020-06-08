import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main-left-navbar",
  templateUrl: "./main-left-navbar.component.html",
  styleUrls: ["./main-left-navbar.component.scss"],
})
export class MainLeftNavbarComponent implements OnInit {
  hubSelected = false;
  templateSelected = false;
  workflowSelected = false;

  constructor() {}

  ngOnInit() {}

  hubIsSelected() {
    return {
      opacity: this.hubSelected ? 1 : 0.3,
    };
  }

  templateIsSelected() {
    return {
      opacity: this.templateSelected ? 1 : 0.3,
    };
  }

  workflowIsSelected() {
    return {
      opacity: this.workflowSelected ? 1 : 0.3,
    };
  }

  setHubActiveColor() {
    return {
      color: this.hubSelected ? "#fff" : "#023d98",
    };
  }

  setTemplateActiveColor() {
    return {
      color: this.templateSelected ? "#fff" : "#023d98",
    };
  }

  setWorkflowActiveColor() {
    return {
      color: this.workflowSelected ? "#fff" : "#023d98",
    };
  }

  addHubActiveInd() {
    return {
      borderRight: this.hubSelected ? "3px solid white" : "none",
    };
  }

  addTemplateActiveInd() {
    return {
      borderRight: this.templateSelected ? "3px solid white" : "none",
    };
  }

  addWorkflowActiveInd() {
    return {
      borderRight: this.workflowSelected ? "3px solid white" : "none",
    };
  }
}
