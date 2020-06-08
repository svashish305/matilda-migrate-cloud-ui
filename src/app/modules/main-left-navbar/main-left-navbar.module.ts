import { NgModule } from "@angular/core";

import { MainLeftNavbarComponent } from "./main-left-navbar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material.module";
import { TemplatesModule } from "../templates/templates.module";
import { WorkflowsModule } from "../workflows/workflows.module";
import { HubModule } from "../hub/hub.module";

@NgModule({
  declarations: [MainLeftNavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    // HubModule,
    // TemplatesModule,
    // WorkflowsModule,
  ],
  exports: [MainLeftNavbarComponent],
  providers: [],
  bootstrap: [],
})
export class MainLeftNavbarModule {}
