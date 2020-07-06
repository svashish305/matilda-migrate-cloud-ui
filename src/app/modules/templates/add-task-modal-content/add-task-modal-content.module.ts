import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddTaskModalContentRoutingModule } from "./add-task-modal-content-routing.module";
import { AddTaskModalContentComponent } from "./add-task-modal-content.component";
import { MaterialModule } from "../../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { EditTaskTemplateComponent } from '../edit-task-template/edit-task-template.component';

@NgModule({
  declarations: [AddTaskModalContentComponent,EditTaskTemplateComponent],
  imports: [
    CommonModule,
    AddTaskModalContentRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports: [AddTaskModalContentComponent],
})
export class AddTaskModalContentModule {}
