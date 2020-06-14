import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HubRoutingModule } from "./hub-routing.module";
import { HubComponent } from "./hub.component";
import { MaterialModule } from "../material.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AvatarModule } from "ngx-avatar";
import { SearchPipeModule } from "../searchpipe.module";

const avatarColors = ["#5fb8f1", "#012b7a"];

@NgModule({
  declarations: [HubComponent],
  imports: [
    CommonModule,
    HubRoutingModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule.forRoot({
      colors: avatarColors,
    }),
    SearchPipeModule,
  ],
  exports: [HubComponent],
})
export class HubModule {}
