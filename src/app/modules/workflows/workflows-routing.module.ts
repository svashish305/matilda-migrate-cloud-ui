import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { WorkflowsComponent } from "./workflows.component";
import { TemplatesComponent } from "../templates/templates.component";
import { TemplateComponent } from "../templates/template/template.component";

const routes: Routes = [
  { path: "", component: WorkflowsComponent },
  {
    path: ":workflowId",
    component: WorkflowsComponent,
  },
  {
    path: ":workflowId/templates/:templateId",
    component: TemplatesComponent,
    data: {
      breadcrumb: "Templates",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowsRoutingModule {}
