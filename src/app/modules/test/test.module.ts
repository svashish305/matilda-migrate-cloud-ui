import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TestRoutingModule } from "./test-routing.module";
import { TestComponent } from "./test.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AvatarModule } from "ngx-avatar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { SearchPipeModule } from "../searchpipe.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ResizableModule } from "angular-resizable-element";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

const avatarColors = ["#5fb8f1", "#012b7a"];

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
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
  ],
})
export class TestModule {}
