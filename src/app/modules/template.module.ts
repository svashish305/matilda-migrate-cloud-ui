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

@NgModule({
  declarations: [TemplateComponent, TemplateListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AvatarModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ResizableModule,
    NgbModule,
  ],
  exports: [TemplateComponent, TemplateListComponent],
  providers: [],
  bootstrap: [],
})
export class TemplateModule {}
