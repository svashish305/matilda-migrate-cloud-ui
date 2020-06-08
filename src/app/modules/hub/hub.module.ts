import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HubRoutingModule } from "./hub-routing.module";
import { HubComponent } from "./hub.component";
import { MaterialModule } from "../material.module";

@NgModule({
  declarations: [HubComponent],
  imports: [CommonModule, HubRoutingModule, MaterialModule],
  exports: [HubComponent],
})
export class HubModule {}
