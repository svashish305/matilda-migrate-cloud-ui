import { NgModule } from "@angular/core";

import { HubModule } from "./hub/hub.module";
import { TemplatesModule } from "./templates/templates.module";
import { WorkflowsModule } from "./workflows/workflows.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HubModule,
    TemplatesModule,
    WorkflowsModule,
  ],
  providers: [],
  bootstrap: [],
})
export class SharedModule {}
