import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WorkflowsRoutingModule } from "./workflows-routing.module";
import { WorkflowsComponent } from "./workflows.component";
import { MaterialModule } from "../material.module";
import { AvatarModule } from "ngx-avatar";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ResizableModule } from "angular-resizable-element";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchPipeModule } from "../searchpipe.module";
import { HttpClientModule } from "@angular/common/http";
import { WorkflowModule } from "../workflow.module";

@NgModule({
  declarations: [WorkflowsComponent],
  imports: [
    CommonModule,
    WorkflowsRoutingModule,
    MaterialModule,
    MaterialModule,
    DragDropModule,
    ResizableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AvatarModule,
    SearchPipeModule,
    WorkflowModule,
  ],
  exports: [WorkflowsComponent],
})
export class WorkflowsModule {}
