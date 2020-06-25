import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./modules/home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "hub",
        loadChildren: () =>
          import("./modules/hub/hub.module").then((m) => m.HubModule),
        data: {
          breadcrumb: "Hub",
        },
      },
      {
        path: "templates",
        loadChildren: () =>
          import("./modules/templates/templates.module").then(
            (m) => m.TemplatesModule
          ),
        data: {
          breadcrumb: "Templates",
        },
      },
      {
        path: "workflows",
        loadChildren: () =>
          import("./modules/workflows/workflows.module").then(
            (m) => m.WorkflowsModule
          ),
        data: {
          breadcrumb: "Workflows",
        },
      },
      {
        path: "test",
        loadChildren: () =>
          import("./modules/test/test.module").then((m) => m.TestModule),
        data: {
          breadcrumb: "Test",
        },
      },
    ],
  },
  {
    path: "top-header",
    loadChildren: () =>
      import("./modules/top-header/top-header.module").then(
        (m) => m.TopHeaderModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
