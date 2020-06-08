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

@NgModule({
  declarations: [TemplateComponent, TemplateListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AvatarModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SearchPipeModule,
    DragDropModule,
    ResizableModule,
    NgbModule,
    AddTaskModalContentModule,
  ],
  exports: [TemplateComponent, TemplateListComponent],
  providers: [],
  bootstrap: [],
})
export class TemplateModule {}
