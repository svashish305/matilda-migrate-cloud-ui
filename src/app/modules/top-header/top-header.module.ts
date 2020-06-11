import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TopHeaderRoutingModule } from "./top-header-routing.module";
import { TopHeaderComponent } from "./top-header.component";
import { MaterialModule } from "../material.module";
import { AvatarModule } from "ngx-avatar";

@NgModule({
  declarations: [TopHeaderComponent],
  imports: [CommonModule, TopHeaderRoutingModule, MaterialModule, AvatarModule],
  exports: [TopHeaderComponent],
})
export class TopHeaderModule {}
