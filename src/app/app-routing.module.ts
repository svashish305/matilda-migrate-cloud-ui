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
          breadcrumb: "hub",
        },
      },
      {
        path: "templates",
        loadChildren: () =>
          import("./modules/templates/templates.module").then(
            (m) => m.TemplatesModule
          ),
        data: {
          breadcrumb: "templates",
        },
      },
      {
        path: "workflows",
        loadChildren: () =>
          import("./modules/workflows/workflows.module").then(
            (m) => m.WorkflowsModule
          ),
        data: {
          breadcrumb: "workflows",
        },
      },
      {
        path: "test",
        loadChildren: () =>
          import("./modules/test/test.module").then((m) => m.TestModule),
        data: {
          breadcrumb: "test",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
