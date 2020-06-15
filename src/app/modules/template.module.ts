import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TemplateComponent } from "./templates/template/template.component";
import { TemplateListComponent } from "./templates/template-list/template-list.component";
import { AvatarModule } from "ngx-avatar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { ResizableModule } from "angular-resizable-element";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SearchPipeModule } from "./searchpipe.module";
import { AddTaskModalContentModule } from "./templates/add-task-modal-content/add-task-modal-content.module";
import { EditTagModule } from "./templates/edit-tag/edit-tag.module";
import {
  DeviceDetectorService,
  DeviceDetectorModule,
} from "ngx-device-detector";

const avatarColors = ["#5fb8f1", "#012b7a"];

@NgModule({
  declarations: [TemplateComponent, TemplateListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AvatarModule.forRoot({
      colors: avatarColors,
    }),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SearchPipeModule,
    DragDropModule,
    ResizableModule,
    NgbModule,
    AddTaskModalContentModule,
    EditTagModule,
    DeviceDetectorModule.forRoot(),
  ],
  exports: [TemplateComponent, TemplateListComponent],
  providers: [],
  bootstrap: [],
})
export class TemplateModule {}
