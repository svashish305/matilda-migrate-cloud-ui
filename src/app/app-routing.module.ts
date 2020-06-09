import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./modules/home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      // {
      //   path: "",
      //   loadChildren: () =>
      //     import("./modules/home/home.module").then((m) => m.HomeModule),
      //   data: {
      //     breadcrumbItem: { key: "home", labelName: "Home" },
      //     title: "Home",
      //   },
      // },
      {
        path: "hub",
        loadChildren: () =>
          import("./modules/hub/hub.module").then((m) => m.HubModule),
        data: {
          breadcrumbItem: { key: "hub", labelName: "Hub" },
          title: "Hub",
        },
      },
      {
        path: "templates",
        loadChildren: () =>
          import("./modules/templates/templates.module").then(
            (m) => m.TemplatesModule
          ),
        data: {
          breadcrumbItem: { key: "templates", labelName: "Templates" },
          title: "Templates",
        },
      },
      {
        path: "workflows",
        loadChildren: () =>
          import("./modules/workflows/workflows.module").then(
            (m) => m.WorkflowsModule
          ),
        data: {
          breadcrumbItem: { key: "workflows", labelName: "Workflows" },
          title: "Workflows",
        },
      },
      {
        path: "test",
        loadChildren: () =>
          import("./modules/test/test.module").then((m) => m.TestModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
