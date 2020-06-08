import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TemplatesRoutingModule } from "./templates-routing.module";
import { TemplatesComponent } from "./templates.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AvatarModule } from "ngx-avatar";
import { MaterialModule } from "../material.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ResizableModule } from "angular-resizable-element";
import { SearchPipeModule } from "../searchpipe.module";
import { TemplateModule } from "../template.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [TemplatesComponent],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    MaterialModule,
    DragDropModule,
    ResizableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AvatarModule,
    SearchPipeModule,
    TemplateModule,
  ],
  exports: [TemplatesComponent],
})
export class TemplatesModule {}
