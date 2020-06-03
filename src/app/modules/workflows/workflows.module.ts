import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WorkflowsRoutingModule } from "./workflows-routing.module";
import { WorkflowsComponent } from "./workflows.component";
import { MainLeftNavbarModule } from "src/app/modules/main-left-navbar/main-left-navbar.module";
import { WaveListComponent } from "./wave-list/wave-list.component";
import { WaveComponent } from "./wave/wave.component";
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
    MainLeftNavbarModule,
    HttpClientModule,
    AvatarModule,
    SearchPipeModule,
    WorkflowModule,
  ],
})
export class WorkflowsModule {}
