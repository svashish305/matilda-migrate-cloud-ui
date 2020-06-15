import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-left-navbar",
  templateUrl: "./main-left-navbar.component.html",
  styleUrls: ["./main-left-navbar.component.scss"],
})
export class MainLeftNavbarComponent implements OnInit {
  isCollapsed = true;

  hubSelected = false;
  templateSelected = false;
  workflowSelected = false;

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.router.url.includes("hub")) {
      this.hubSelected = true;
    } else if (this.router.url.includes("templates")) {
      this.templateSelected = true;
    } else if (this.router.url.includes("workflows")) {
      this.workflowSelected = true;
    }
  }

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
      color: this.hubSelected ? "#fff" : "#012b7a",
    };
  }

  setTemplateActiveColor() {
    return {
      color: this.templateSelected ? "#fff" : "#012b7a",
    };
  }

  setWorkflowActiveColor() {
    return {
      color: this.workflowSelected ? "#fff" : "#012b7a",
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
