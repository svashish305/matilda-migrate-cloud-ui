import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HubModule } from "./hub/hub.module";
import { TemplatesModule } from "./templates/templates.module";
import { WorkflowsModule } from "./workflows/workflows.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HubModule,
    TemplatesModule,
    WorkflowsModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [],
})
export class SharedModule {}
