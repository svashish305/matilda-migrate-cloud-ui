import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WorkflowsRoutingModule } from "./workflows-routing.module";
import { WorkflowsComponent } from "./workflows.component";
import { MainLeftNavbarModule } from "src/app/modules/main-left-navbar/main-left-navbar.module";

@NgModule({
  declarations: [WorkflowsComponent],
  imports: [CommonModule, WorkflowsRoutingModule, MainLeftNavbarModule],
})
export class WorkflowsModule {}
