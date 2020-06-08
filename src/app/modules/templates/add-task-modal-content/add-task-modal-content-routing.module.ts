import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddTaskModalContentComponent } from "./add-task-modal-content.component";
import { MaterialModule } from "../../material.module";

const routes: Routes = [{ path: "", component: AddTaskModalContentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), MaterialModule],
  exports: [RouterModule],
})
export class AddTaskModalContentRoutingModule {}
