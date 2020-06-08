import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./modules/main-left-navbar/main-left-navbar.module").then(
        (m) => m.MainLeftNavbarModule
      ),
  },
  {
    path: "hub",
    loadChildren: () =>
      import("./modules/hub/hub.module").then((m) => m.HubModule),
  },
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
    path: "test",
    loadChildren: () =>
      import("./modules/test/test.module").then((m) => m.TestModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
