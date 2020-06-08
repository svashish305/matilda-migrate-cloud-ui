import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddTaskModalContentRoutingModule } from "./add-task-modal-content-routing.module";
import { AddTaskModalContentComponent } from "./add-task-modal-content.component";
import { MaterialModule } from "../../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddTaskModalContentComponent],
  imports: [
    CommonModule,
    AddTaskModalContentRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AddTaskModalContentComponent],
})
export class AddTaskModalContentModule {}
