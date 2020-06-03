import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AvatarModule } from "ngx-avatar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { ResizableModule } from "angular-resizable-element";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { WaveComponent } from "./workflows/wave/wave.component";
import { WaveListComponent } from "./workflows/wave-list/wave-list.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SearchPipeModule } from "./searchpipe.module";
import { TemplateModule } from "./template.module";

@NgModule({
  declarations: [WaveComponent, WaveListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AvatarModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    DragDropModule,
    ResizableModule,
    SearchPipeModule,
    TemplateModule,
    NgbModule,
  ],
  exports: [WaveComponent, WaveListComponent],
  providers: [],
  bootstrap: [],
})
export class WorkflowModule {}
