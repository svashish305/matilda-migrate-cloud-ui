import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EditTagRoutingModule } from "./edit-tag-routing.module";
import { EditTagComponent } from "./edit-tag.component";
import { MaterialModule } from "../../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [EditTagComponent],
  imports: [
    CommonModule,
    EditTagRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [EditTagComponent],
})
export class EditTagModule {}
