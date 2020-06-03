import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "templates",
    loadChildren: () =>
      import("./modules/templates/templates.module").then(
        (m) => m.TemplatesModule
      ),
  },
  {
    path: "workflows",
    loadChildren: () =>
      import("./modules/workflows/workflows.module").then(
        (m) => m.WorkflowsModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("./modules/hub/hub.module").then((m) => m.HubModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
